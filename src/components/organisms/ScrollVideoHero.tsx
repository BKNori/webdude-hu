"use client";

import { useRef, useEffect, useState } from "react";

interface ScrollVideoHeroProps {
  videoSrc: string;
  scrollHeight?: number;
  children?: React.ReactNode;
}

export default function ScrollVideoHero({
  videoSrc,
  scrollHeight = 200,
  children,
}: ScrollVideoHeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      setIsVideoLoaded(true);
      video.play().catch((error) => {
        console.error("Video autoplay failed:", error);
      });
    };

    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.load();

    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, [videoSrc]);

  return (
    <div
      ref={containerRef}
      className="relative w-full"
      style={{ height: `${scrollHeight}vh` }}
    >
      {/* Sticky container */}
      <div className="sticky top-0 h-screen overflow-hidden">
        <video
          ref={videoRef}
          src={videoSrc}
          muted
          playsInline
          autoPlay
          loop
          preload="auto"
          disablePictureInPicture
          className="absolute inset-0 w-full h-full object-cover"
          style={{ pointerEvents: "none" }}
        />

        {/* Loading overlay */}
        {!isVideoLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-bg-surface">
            <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-slate-900/40 pointer-events-none" />

        {/* Content overlay */}
        {children && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {children}
          </div>
        )}
      </div>
    </div>
  );
}
