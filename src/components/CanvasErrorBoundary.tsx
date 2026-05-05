"use client";

import React, { Component, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  errorMessage: string;
}

export default class CanvasErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, errorMessage: "" };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, errorMessage: error.message || "Unknown error" };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.warn("[CanvasErrorBoundary] Canvas crashed:", error.message, errorInfo.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#F0F0F0",
            border: "1px solid #D5D5D5",
            fontFamily: "'DM Mono', monospace",
            gap: "12px",
          }}
        >
          {/* Minimal vault-style indicator */}
          <div
            style={{
              width: "32px",
              height: "32px",
              border: "1px solid #9A9A9A",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span style={{ color: "#9A9A9A", fontSize: "14px", lineHeight: 1 }}>!</span>
          </div>

          <p
            style={{
              margin: 0,
              color: "#0D0D0D",
              fontSize: "0.7rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            WebGL not available
          </p>

          <p
            style={{
              margin: 0,
              color: "#9A9A9A",
              fontSize: "0.65rem",
              letterSpacing: "0.08em",
              maxWidth: "320px",
              textAlign: "center",
              lineHeight: 1.5,
            }}
          >
            Your browser or device may not support WebGL.
            <br />
            Try a different browser or enable hardware acceleration.
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}
