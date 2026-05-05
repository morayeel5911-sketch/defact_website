"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface PreloaderProps {
  onComplete?: () => void;
}

// Vertex Shader — displacement based on noise + time
const vertexShaderSource = `
  attribute vec2 a_position;
  attribute vec2 a_texCoord;
  varying vec2 v_texCoord;
  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
    v_texCoord = a_texCoord;
  }
`;

// Fragment Shader — chromatic aberration + noise displacement on text
const fragmentShaderSource = `
  precision highp float;
  varying vec2 v_texCoord;
  uniform float u_time;
  uniform float u_progress;
  uniform vec2 u_resolution;
  uniform float u_intensity;

  // Simplex-like noise
  vec3 mod289(vec3 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
             -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
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

  // FBM for organic displacement
  float fbm(vec2 p) {
    float sum = 0.0;
    float amp = 1.0;
    float freq = 1.0;
    for(int i = 0; i < 5; i++) {
      sum += snoise(p * freq) * amp;
      freq *= 2.0;
      amp *= 0.5;
    }
    return sum;
  }

  // Signed distance to line segment
  float sdLine(vec2 p, vec2 a, vec2 b) {
    vec2 pa = p - a, ba = b - a;
    float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
    return length(pa - ba * h);
  }

  // Distance to a box
  float sdBox(vec2 p, vec2 b) {
    vec2 d = abs(p) - b;
    return length(max(d, 0.0)) + min(max(d.x, d.y), 0.0);
  }

  // SDF for letter 'D'
  float sdD(vec2 p, float scl) {
    p /= scl;
    float outer = abs(length(p - vec2(0.0, 0.0)) - 0.9);
    float inner = abs(length(p - vec2(0.08, 0.0)) - 0.55);
    float arc = max(-inner, outer);
    float stem = sdLine(p, vec2(-0.88, -0.9), vec2(-0.88, 0.9));
    return min(stem, arc);
  }

  float sdE(vec2 p, float scl) {
    p /= scl;
    float stem = sdLine(p, vec2(-0.75, 0.0), vec2(-0.75, -0.9));
    float top = sdLine(p, vec2(-0.75, 0.9), vec2(0.75, 0.9));
    float mid = sdLine(p, vec2(-0.75, 0.0), vec2(0.5, 0.0));
    float bot = sdLine(p, vec2(-0.75, -0.9), vec2(0.75, -0.9));
    return min(min(stem, top), min(mid, bot));
  }

  float sdF(vec2 p, float scl) {
    p /= scl;
    float stem = sdLine(p, vec2(-0.75, -0.9), vec2(-0.75, 0.9));
    float top = sdLine(p, vec2(-0.75, 0.9), vec2(0.75, 0.9));
    float mid = sdLine(p, vec2(-0.75, 0.0), vec2(0.5, 0.0));
    return min(min(stem, top), mid);
  }

  float sdA(vec2 p, float scl) {
    p /= scl;
    p.x = abs(p.x);
    float left = length(p - vec2(-0.45, 0.0));
    float right = length(p - vec2(0.45, 0.0));
    float apex = length(p - vec2(0.0, 0.85));
    float cross = sdLine(p, vec2(-0.35, 0.0), vec2(0.35, 0.0));
    float outer = min(min(left, right), apex) - 0.08;
    float d = min(outer, cross);
    return d;
  }

  float sdC(vec2 p, float scl) {
    p /= scl;
    float outer = abs(length(p - vec2(0.0, 0.0)) - 0.9);
    float inner = abs(length(p - vec2(0.05, 0.0)) - 0.55);
    float arc = max(-inner, outer);
    // Cutout for C opening
    arc = max(arc, -(p.x - 0.1));
    return arc;
  }

  float sdT(vec2 p, float scl) {
    p /= scl;
    float stem = sdLine(p, vec2(0.0, -0.9), vec2(0.0, 0.9));
    float cross = sdLine(p, vec2(-0.75, 0.9), vec2(0.75, 0.9));
    return min(stem, cross);
  }

  float letterSDF(vec2 p, int idx, float scl) {
    if (idx == 0) return sdD(p - vec2(-1.5, 0.0), scl); // D
    if (idx == 1) return sdE(p - vec2(-0.55, 0.0), scl); // E
    if (idx == 2) return sdF(p - vec2(0.35, 0.0), scl);  // F
    if (idx == 3) return sdA(p - vec2(1.15, 0.0), scl); // A
    if (idx == 4) return sdC(p - vec2(1.95, 0.0), scl);  // C
    if (idx == 5) return sdT(p - vec2(2.75, 0.0), scl);  // T
    return 10.0;
  }

  void main() {
    vec2 uv = v_texCoord;
    vec2 aspect = vec2(u_resolution.x / u_resolution.y, 1.0);
    vec2 p = (uv - 0.5) * aspect * 3.5;

    float time = u_time * 0.4;
    float progress = u_progress;

    // Chromatic aberration amount based on progress and noise
    float chaos = fbm(p * 1.5 + time * 0.3);
    float aberration = (0.015 + chaos * 0.02) * (1.0 - progress);

    // Displace the sampling point for glitch effect
    float disp = fbm(p * 3.0 + vec2(time, time * 0.7));
    float dispStrength = (0.08 + 0.12 * (1.0 - progress));

    // Scanline displacement
    float scanline = sin(p.y * 40.0 + time * 5.0) * 0.02 * (1.0 - progress);
    float scanline2 = sin(p.y * 80.0 - time * 3.0) * 0.01 * (1.0 - progress);

    vec2 pR = p + vec2(aberration + disp * dispStrength + scanline, 0.0);
    vec2 pG = p + vec2(scanline2 * 0.5, scanline * 0.5);
    vec2 pB = p - vec2(aberration - disp * dispStrength * 0.5, 0.0);

    // Letter scale
    float letterScl = 0.9;

    // Sample SDF for RGB channels with displacement
    float r = 10.0, g = 10.0, b = 10.0;
    for (int i = 0; i < 6; i++) {
      r = min(r, letterSDF(pR, i, letterScl));
      g = min(g, letterSDF(pG, i, letterScl));
      b = min(b, letterSDF(pB, i, letterScl));
    }

    float pixel = 1.0 / max(u_resolution.x, u_resolution.y);

    float edgeR = smoothstep(0.12, 0.08, r);
    float edgeG = smoothstep(0.12, 0.08, g);
    float edgeB = smoothstep(0.12, 0.08, b);

    // Color: white/chrome with subtle warm tint
    vec3 colR = vec3(1.0, 0.95, 0.95) * edgeR;
    vec3 colG = vec3(0.97, 0.98, 0.97) * edgeG;
    vec3 colB = vec3(0.95, 0.95, 1.0) * edgeB;

    vec3 finalColor = vec3(colR.r, colG.g, colB.b);

    // Grid lines background
    float grid = 0.0;
    grid += smoothstep(0.004, 0.0, abs(fract(p.x * 4.0 + 0.5) - 0.5));
    grid += smoothstep(0.004, 0.0, abs(fract(p.y * 4.0 + 0.5) - 0.5));
    grid *= 0.03;

    // Scanlines
    float scan = abs(sin(p.y * 60.0 + time * 2.0)) * 0.015;

    vec3 bg = vec3(0.02, 0.02, 0.02) + grid + scan;

    // Merge with background
    float alpha = max(max(edgeR, edgeG), edgeB);
    finalColor = mix(bg, finalColor, alpha);

    // Fade to white/out as progress completes
    vec3 voidColor = vec3(0.02, 0.02, 0.02);
    vec3 endColor = mix(voidColor, finalColor, 1.0 - smoothstep(0.85, 1.0, progress));

    // Grain
    float grain = (fract(sin(dot(uv * time, vec2(12.9898, 78.233))) * 43758.5453) - 0.5) * 0.015;
    endColor += grain;

    gl_FragColor = vec4(endColor, 1.0);
  }
`;

function createWebGLProgram(gl: WebGLRenderingContext): WebGLProgram | null {
  const compile = (type: number, source: string) => {
    const shader = gl.createShader(type)!;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error("Shader compile error:", gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      return null;
    }
    return shader;
  };

  const vs = compile(gl.VERTEX_SHADER, vertexShaderSource);
  const fs = compile(gl.FRAGMENT_SHADER, fragmentShaderSource);
  if (!vs || !fs) return null;

  const program = gl.createProgram()!;
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error("Program link error:", gl.getProgramInfoLog(program));
    return null;
  }
  return program;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const glRef = useRef<WebGLRenderingContext | null>(null);
  const programRef = useRef<WebGLProgram | null>(null);
  const rafRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState(0);
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  const phases = [
    "[INITIALIZING SYSTEM]",
    "[LOADING ASSETS...]",
    "[COMPILING SHADERS...]",
    "[ESTABLISHING CONNECTION...]",
    "[READY]",
  ];

  // WebGL init
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", { antialias: true, alpha: false });
    if (!gl) return;
    glRef.current = gl;

    const program = createWebGLProgram(gl);
    if (!program) return;
    programRef.current = program;
    gl.useProgram(program);

    // Fullscreen quad
    const positions = new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]);
    const texCoords = new Float32Array([0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1]);

    const posBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const texBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, texBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, texCoords, gl.STATIC_DRAW);
    const aTex = gl.getAttribLocation(program, "a_texCoord");
    gl.enableVertexAttribArray(aTex);
    gl.vertexAttribPointer(aTex, 2, gl.FLOAT, false, 0, 0);

    // Track timeouts for cleanup
    const pendingTimers: ReturnType<typeof setTimeout>[] = [];

    // Uniforms
    const uTime = gl.getUniformLocation(program, "u_time");
    const uProgress = gl.getUniformLocation(program, "u_progress");
    const uRes = gl.getUniformLocation(program, "u_resolution");
    const uIntensity = gl.getUniformLocation(program, "u_intensity");

    startTimeRef.current = performance.now();

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener("resize", resize);

    const render = () => {
      const elapsed = (performance.now() - startTimeRef.current) / 1000;
      const duration = 3.2; // 3.2 seconds total
      const p = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);

      setProgress(Math.floor(eased * 100));
      setPhase(Math.min(Math.floor(p * phases.length), phases.length - 1));

      gl.uniform1f(uTime, elapsed);
      gl.uniform1f(uProgress, eased);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uIntensity, 1.0);

      gl.drawArrays(gl.TRIANGLES, 0, 6);

      if (p < 1) {
        rafRef.current = requestAnimationFrame(render);
      } else {
        // Fade out phase — track timers for cleanup
        const t1 = setTimeout(() => {
          setFadeOut(true);
          const t2 = setTimeout(() => {
            setVisible(false);
            onComplete?.();
          }, 700);
          pendingTimers.push(t2);
        }, 200);
        pendingTimers.push(t1);
      }
    };

    rafRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafRef.current);
      pendingTimers.forEach((t) => clearTimeout(t));
      window.removeEventListener("resize", resize);
      gl.deleteBuffer(posBuffer);
      gl.deleteBuffer(texBuffer);
      gl.deleteProgram(program);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-between transition-opacity duration-700 ${fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"}`}
      style={{ background: "#050505" }}
    >
      {/* WebGL Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ display: "block" }}
      />

      {/* UI Overlay */}
      <div className="relative z-10 flex flex-col items-center w-full h-full pt-8 justify-between pb-8 pointer-events-none">
        {/* Top progress bar */}
        <div className="w-full h-[2px] px-8">
          <div className="w-full h-full bg-[rgba(255,255,255,0.06)]">
            <div
              className="h-full bg-[#39FF14] transition-none"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Center status */}
        <div className="flex flex-col items-center gap-6">
          <div className="font-dm-mono text-micro tracking-mono text-[#9A9A9A]">
            {phases[phase]}
            <span className="inline-block w-[6px] h-[1em] bg-[#39FF14] ml-1 animate-pulse" />
          </div>
          <div className="font-dm-mono text-micro tracking-mono text-[#9A9A9A]/50">
            [{String(progress).padStart(2, "0")}%]
          </div>
        </div>

        {/* Bottom status */}
        <div className="w-full flex justify-between px-8">
          <span className="font-dm-mono text-micro tracking-mono text-[#9A9A9A]/30">
            [V.0.9.4-BETA]
          </span>
          <span className="font-dm-mono text-micro tracking-mono text-[#9A9A9A]/30">
            [COLOGNE, DE]
          </span>
        </div>
      </div>
    </div>
  );
}
