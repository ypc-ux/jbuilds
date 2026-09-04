"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface DitheredLogoProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  /** Pixel size of the dither cells. Higher = chunkier. */
  cellSize?: number;
  /** Animate the dither threshold for a subtle shimmer. */
  animate?: boolean;
}

// 8x8 Bayer ordered-dither matrix, normalized to 0..1.
const BAYER_8X8 = [
  0, 32, 8, 40, 2, 34, 10, 42,
  48, 16, 56, 24, 50, 18, 58, 26,
  12, 44, 4, 36, 14, 46, 6, 38,
  60, 28, 52, 20, 62, 30, 54, 22,
  3, 35, 11, 43, 1, 33, 9, 41,
  51, 19, 59, 27, 49, 17, 57, 25,
  15, 47, 7, 39, 13, 45, 5, 37,
  63, 31, 55, 23, 61, 29, 53, 21,
].map((v) => v / 64);

export function DitheredLogo({
  src,
  alt,
  width,
  height,
  className,
  cellSize = 4,
  animate = true,
}: DitheredLogoProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    canvas.width = width;
    canvas.height = height;

    let rafId = 0;
    let cancelled = false;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = src;

    img.onload = () => {
      if (cancelled) return;

      const cols = Math.ceil(width / cellSize);
      const rows = Math.ceil(height / cellSize);

      const sample = document.createElement("canvas");
      sample.width = cols;
      sample.height = rows;
      const sctx = sample.getContext("2d");
      if (!sctx) return;
      sctx.drawImage(img, 0, 0, cols, rows);
      const { data } = sctx.getImageData(0, 0, cols, rows);

      const draw = (offset: number) => {
        ctx.clearRect(0, 0, width, height);
        for (let y = 0; y < rows; y++) {
          for (let x = 0; x < cols; x++) {
            const i = (y * cols + x) * 4;
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            const a = data[i + 3];
            if (a < 16) continue;

            const brightness = (r + g + b) / 3 / 255;
            const threshold =
              BAYER_8X8[(y % 8) * 8 + (x % 8)] +
              (animate ? offset : 0);

            if (brightness > threshold % 1) {
              ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
              ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
            }
          }
        }
      };

      if (!animate) {
        draw(0);
        return;
      }

      const start = performance.now();
      const loop = (now: number) => {
        if (cancelled) return;
        const t = (now - start) / 1000;
        draw((Math.sin(t * 0.6) + 1) / 8);
        rafId = requestAnimationFrame(loop);
      };
      rafId = requestAnimationFrame(loop);
    };

    return () => {
      cancelled = true;
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [src, width, height, cellSize, animate]);

  return (
    <canvas
      ref={canvasRef}
      role="img"
      aria-label={alt}
      className={cn("[image-rendering:pixelated]", className)}
      style={{ width, height }}
    />
  );
}
