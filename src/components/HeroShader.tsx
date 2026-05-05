"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const vertexShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  varying vec2 vUv;
  varying float vElevation;
  
  //
  // GLSL noise functions
  //
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }
  
  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                       -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
                            + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
                            dot(x12.zw,x12.zw)), 0.0);
    m = m*m;
    m = m*m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
    vec3 g;
    g.x = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }
  
  void main() {
    vUv = uv;
    
    vec3 pos = position;
    
    // Multi-octave noise displacement
    float noise1 = snoise(pos.xy * 2.0 + uTime * 0.3);
    float noise2 = snoise(pos.xy * 4.0 - uTime * 0.2) * 0.5;
    float noise3 = snoise(pos.xy * 8.0 + uTime * 0.5) * 0.25;
    
    float totalNoise = noise1 + noise2 + noise3;
    
    // Mouse influence — ripples near cursor
    float dist = distance(uv, uMouse);
    float mouseInfluence = smoothstep(0.5, 0.0, dist) * 0.3;
    totalNoise += mouseInfluence * sin(uTime * 2.0);
    
    pos.z += totalNoise * 0.15;
    vElevation = totalNoise;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform vec2 uResolution;
  varying vec2 vUv;
  varying float vElevation;
  
  void main() {
    // Base color — near-black
    vec3 baseColor = vec3(0.02, 0.02, 0.02);
    
    // Metallic green accent based on elevation
    vec3 slimeAccent = vec3(0.22, 1.0, 0.08); // #39FF14
    float accentStrength = smoothstep(-0.3, 0.5, vElevation);
    vec3 color = mix(baseColor, slimeAccent * 0.15, accentStrength * 0.4);
    
    // Scanline effect
    float scanline = sin(vUv.y * uResolution.y * 0.7 + uTime * 3.0) * 0.5 + 0.5;
    scanline = pow(scanline, 3.0) * 0.03;
    color += vec3(scanline);
    
    // Subtle grain
    float grain = fract(sin(dot(vUv * uTime, vec2(12.9898, 78.233))) * 43758.5453);
    color += grain * 0.015;
    
    // Vignette
    float vignette = 1.0 - smoothstep(0.3, 0.9, length(vUv - 0.5));
    color *= 0.7 + vignette * 0.3;
    
    // Mouse cursor glow
    float cursorDist = distance(vUv, uMouse);
    float cursorGlow = smoothstep(0.3, 0.0, cursorDist) * 0.08;
    color += slimeAccent * cursorGlow;
    
    gl_FragColor = vec4(color, 1.0);
  }
`;

function ShaderPlane({ mousePos }: { mousePos: { x: number; y: number } }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    uResolution: { value: new THREE.Vector2(1920, 1080) },
  }), []);
  
  useFrame((state) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial;
      material.uniforms.uTime.value = state.clock.elapsedTime;
      
      // Smooth mouse following
      const targetX = mousePos.x;
      const targetY = 1.0 - mousePos.y; // Flip Y for WebGL
      material.uniforms.uMouse.value.x += (targetX - material.uniforms.uMouse.value.x) * 0.05;
      material.uniforms.uMouse.value.y += (targetY - material.uniforms.uMouse.value.y) * 0.05;
    }
  });
  
  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[3, 3, 128, 128]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

export function HeroShaderContent({ mousePos }: { mousePos: { x: number; y: number } }) {
  return (
    <div className="absolute inset-0 z-5 opacity-60">
      <Canvas
        camera={{ position: [0, 0, 1.5], fov: 75 }}
        gl={{ antialias: false, alpha: true }}
        dpr={[1, 1.5]}
      >
        <ShaderPlane mousePos={mousePos} />
      </Canvas>
    </div>
  );
}

export default function HeroShader({ mousePos }: { mousePos: { x: number; y: number } }) {
  return <HeroShaderContent mousePos={mousePos} />;
}
