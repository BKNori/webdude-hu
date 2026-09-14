"use client";
import React, { useEffect, useRef } from "react";

export default function ShaderBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const cv = canvasRef.current;
    if (!cv) return;
    const gl = cv.getContext("webgl") || cv.getContext("experimental-webgl");
    if (!gl) {
      cv.style.display = "none";
      return;
    }

    function rsz() {
      cv.width = window.innerWidth;
      cv.height = window.innerHeight;
      gl.viewport(0, 0, cv.width, cv.height);
    }

    rsz();
    window.addEventListener("resize", rsz);

    return () => window.removeEventListener("resize", rsz);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
    />
  );
}
