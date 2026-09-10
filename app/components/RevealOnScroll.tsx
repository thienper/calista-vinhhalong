"use client";

import React, { useEffect, useRef, useState } from "react";

interface RevealOnScrollProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  yOffset?: number;
}

export default function RevealOnScroll({
  children,
  className = "",
  delay = 0,
  yOffset = 32,
}: RevealOnScrollProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // If reduced motion is preferred, reveal immediately
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsVisible(true);
      return;
    }

    // If element is already in viewport on mount (e.g. top of page)
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        transform: isVisible ? "translate3d(0, 0, 0)" : `translate3d(0, ${yOffset}px, 0)`,
        opacity: isVisible ? 1 : 0,
        transitionDelay: `${delay}ms`,
      }}
      className={`w-full transform-gpu transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[transform,opacity] ${className}`}
    >
      {children}
    </div>
  );
}
