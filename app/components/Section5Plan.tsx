"use client";

import React, { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface PlanCard {
  id: number;
  line1: string;
  line2: string;
  title: string;
  image: string;
}

const planCards: PlanCard[] = [
  {
    id: 0,
    line1: "LÊN KẾ HOẠCH",
    line2: "CHO CHUYẾN ĐI",
    title: "LÊN KẾ HOẠCH CHO CHUYẾN ĐI",
    image:
      "/image/Home%20-%20s5%20-%20%E1%BA%A3nh%201%20(L%C3%AAn%20k%E1%BA%BF%20ho%E1%BA%A1ch%20cho%20chuy%E1%BA%BFn%20%C4%91i).jpg",
  },
  {
    id: 1,
    line1: "KHÁM PHÁ",
    line2: "DANH THẮNG KỲ VĨ",
    title: "KHÁM PHÁ DANH THẮNG KỲ VĨ",
    image: "/image/Home%20-%20s5%20-%20%E1%BA%A3nh%202.jpg",
  },
  {
    id: 2,
    line1: "THÁM HIỂM",
    line2: "HỆ THỐNG HANG ĐỘNG",
    title: "THÁM HIỂM HỆ THỐNG HANG ĐỘNG",
    image: "/image/Home%20-%20s5%20-%20%E1%BA%A3nh%203.jpg",
  },
  {
    id: 3,
    line1: "CHUẨN BỊ",
    line2: "TRƯỚC CHUYẾN ĐI",
    title: "CHUẨN BỊ TRƯỚC CHUYẾN ĐI",
    image: "/image/Home%20-%20s5%20-%20%E1%BA%A3nh%204.jpg",
  },
];

export default function Section5Plan() {
  const [activeId, setActiveId] = useState(0);

  const handlePrev = () => {
    setActiveId((prev) => (prev > 0 ? prev - 1 : planCards.length - 1));
  };

  const handleNext = () => {
    setActiveId((prev) => (prev < planCards.length - 1 ? prev + 1 : 0));
  };

  // Touch gesture handling for mobile swipe
  const touchStartRef = React.useRef<{ x: number; y: number } | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    };
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartRef.current) return;
    const deltaX = e.changedTouches[0].clientX - touchStartRef.current.x;
    const deltaY = e.changedTouches[0].clientY - touchStartRef.current.y;
    touchStartRef.current = null;

    if (Math.abs(deltaX) > 35 && Math.abs(deltaX) > Math.abs(deltaY) * 1.1) {
      if (deltaX < 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
  };

  return (
    <section className="w-full bg-white py-16 sm:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Header Centered */}
        <div className="text-center max-w-4xl mx-auto mb-14">
          <span className="text-[16px] font-semibold tracking-[0.25em] text-slate-800 uppercase mb-2 block">
            LÊN KẾ HOẠCH
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-[48px] leading-tight font-normal heading-gradient">
            CHO CHUYẾN DU LỊCH VỊNH HẠ LONG
          </h2>
        </div>

        {/* 4 Cards Showcase Layout with Touch Swipe & Responsive Display */}
        <div
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="relative w-full h-[420px] md:h-[480px] lg:h-[540px] flex flex-col md:flex-row gap-4 items-stretch shrink-0 overflow-hidden touch-pan-y"
        >
          {planCards.map((card) => {
            const isActive = activeId === card.id;
            return (
              <div
                key={card.id}
                onClick={() => setActiveId(card.id)}
                className={`relative rounded-xs overflow-hidden cursor-pointer transform-gpu will-change-[flex] transition-[flex,opacity] duration-500 ease-out group ${
                  isActive
                    ? "flex-[3.8] shadow-2xl h-[420px] md:h-auto w-full md:w-auto"
                    : "hidden md:block md:flex-1 opacity-85 hover:opacity-100"
                }`}
              >
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Dark gradient overlay for active card */}
                <div
                  className={`absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent transition-opacity duration-300 ${
                    isActive ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                  }`}
                />

                {/* Inactive hover overlay */}
                {!isActive && (
                  <div className="absolute inset-0 bg-black/25 group-hover:bg-black/10 transition-colors duration-300" />
                )}

                {/* Animated Text & Button Content (Delayed fade + slide up to prevent squishing) */}
                <div
                  className={`absolute inset-0 p-6 sm:p-10 flex flex-col justify-end text-white z-10 transition-all duration-400 ease-out ${
                    isActive
                      ? "opacity-100 translate-y-0 delay-200"
                      : "opacity-0 translate-y-6 delay-0 pointer-events-none"
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 max-w-full">
                    {/* Two-line title with no-wrap to prevent awkward line breaks */}
                    <div
                      className={`transition-all duration-400 ease-out ${
                        isActive
                          ? "opacity-100 translate-y-0 delay-200"
                          : "opacity-0 translate-y-4 delay-0"
                      }`}
                    >
                      <h3 className="font-serif-luxury text-2xl sm:text-3xl lg:text-[36px] uppercase tracking-wider leading-[1.18] drop-shadow-md">
                        <span className="block whitespace-nowrap">{card.line1}</span>
                        <span className="block whitespace-nowrap">{card.line2}</span>
                      </h3>
                    </div>

                    {/* Staggered Button that glides up cleanly */}
                    <div
                      className={`transition-all duration-400 ease-out ${
                        isActive
                          ? "opacity-100 translate-y-0 delay-300"
                          : "opacity-0 translate-y-4 delay-0"
                      }`}
                    >
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          const el = document.getElementById("form-uu-dai");
                          if (el) el.scrollIntoView({ behavior: "smooth" });
                        }}
                        className="bg-[#123e71] hover:bg-[#0c2b50] text-white px-7 py-3 rounded-xs text-xs uppercase tracking-wider font-semibold transition-all shadow-xl hover:shadow-2xl cursor-pointer whitespace-nowrap"
                      >
                        CHI TIẾT
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Navigation Track */}
        <div className="max-w-4xl mx-auto mt-8 sm:mt-12 px-2 sm:px-4 flex items-center justify-between text-xs sm:text-[13px] font-semibold text-[#163b65]">
          <button
            onClick={handlePrev}
            className="uppercase tracking-wider hover:text-[#dfa968] transition-colors cursor-pointer text-left w-24 sm:w-auto truncate"
          >
            {planCards[(activeId - 1 + planCards.length) % planCards.length].title}
          </button>

          <div className="flex-1 max-w-md mx-3 sm:mx-6 flex items-center gap-3">
            <button
              onClick={handlePrev}
              aria-label="Previous Plan"
              className="p-1 hover:text-[#dfa968] transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>

            <div className="relative flex-1 h-[2px] bg-slate-300">
              <div
                className="absolute top-1/2 -translate-y-1/2 h-[4px] bg-[#163b65] rounded-full transition-all duration-300"
                style={{
                  width: "25%",
                  left: `${activeId * 25}%`,
                }}
              />
            </div>

            <button
              onClick={handleNext}
              aria-label="Next Plan"
              className="p-1 hover:text-[#dfa968] transition-colors cursor-pointer"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={handleNext}
            className="uppercase tracking-wider hover:text-[#dfa968] transition-colors cursor-pointer text-right w-24 sm:w-auto truncate"
          >
            {planCards[(activeId + 1) % planCards.length].title}
          </button>
        </div>
      </div>
    </section>
  );
}
