"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { ArrowUpRight, ArrowLeft, ArrowRight } from "lucide-react";

interface Itinerary {
  id: string;
  title: string;
  image: string;
  desc: string;
  highlights: string[];
}

const itineraries: Itinerary[] = [
  {
    id: "speedboat",
    title: "SPEEDBOAT",
    image: "/image/Home%20-%20s2%20-%20Speedboat.jpg",
    desc: "Chuyến hải trình tốc độ cao vượt sóng khám phá các hòn đảo hoang sơ và kỳ vĩ nhất của Vịnh Hạ Long trong thời gian linh hoạt.",
    highlights: ["Vịnh Hạ Long", "Hòn Trống Mái", "Làng Chài Cửa Vạn", "Bãi tắm Ba Trái Đào"],
  },
  {
    id: "2n1d",
    title: "2 NGÀY 1 ĐÊM",
    image: "/image/Home%20-%20s2%20-%202%20ng%C3%A0y%201%20%C4%91%C3%AAm.jpg",
    desc: "Calista Cruise là du thuyền sang trọng phục vụ các chuyến tham quan nghỉ đêm trên Vịnh Hạ Long, kết hợp hoàn hảo giữa hệ thống phòng nghỉ rộng rãi có ban công riêng, ẩm thực được chăm chút kỹ lưỡng, các tiện nghi hiện đại cùng dịch vụ chu đáo xuyên suốt hành trình.",
    highlights: ["Vịnh Hạ Long", "Hang Sửng Sốt", "Hang Luồn", "Đảo TITOP"],
  },
  {
    id: "3n2d",
    title: "3 NGÀY 2 ĐÊM",
    image: "/image/Home%20-%20s2%20-%203%20ng%C3%A0y%202%20%C4%91%C3%AAm.jpg",
    desc: "Dành cho du khách muốn có nhiều thời gian hơn để khám phá Vịnh Hạ Long và Vịnh Bái Tử Long, đồng thời tận hưởng trọn vẹn các dịch vụ và khoảng thời gian nghỉ dưỡng trên tàu.",
    highlights: [
      "Vịnh Hạ Long",
      "Hang Sửng Sốt",
      "Hang Luồn",
      "Đảo TITOP",
      "Vịnh Bái Tử Long",
      "Thiên Cảnh Sơn",
    ],
  },
];

export default function Section2Itinerary() {
  // virtualCenter: the logical center item index (infinite integer)
  // Initially 1 (corresponding to 2 NGÀY 1 ĐÊM)
  const [virtualCenter, setVirtualCenter] = useState(1);
  // displayCenter: drives the real-time CSS GPU transform positioning
  const [displayCenter, setDisplayCenter] = useState(1);
  const [isBusy, setIsBusy] = useState(false);
  const [screenWidth, setScreenWidth] = useState(1920);

  // Synchronize screen width for pixel-perfect responsive calculation
  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Compute position, scale, opacity and z-index strictly on GPU
  const getCardStyle = useCallback(
    (diff: number) => {
      let baseW = 720;
      let baseH = 580;
      let gap = 28;

      if (screenWidth < 640) {
        baseW = Math.min(screenWidth - 40, 360);
        baseH = 480;
        gap = 16;
      } else if (screenWidth < 1024) {
        baseW = 580;
        baseH = 520;
        gap = 20;
      }

      const absDiff = Math.abs(diff);
      let scale = 1;
      let opacity = 1;
      let zIndex = 20;
      let filter = "brightness(100%)";

      if (absDiff === 0) {
        scale = 1;
        opacity = 1;
        zIndex = 20;
        filter = "brightness(100%)";
      } else if (absDiff === 1) {
        scale = 0.86;
        opacity = 0.65;
        zIndex = 10;
        filter = "brightness(78%)";
      } else if (absDiff === 2) {
        scale = 0.75;
        opacity = 0.35;
        zIndex = 5;
        filter = "brightness(60%)";
      } else if (absDiff === 3) {
        scale = 0.66;
        opacity = 0.15;
        zIndex = 2;
        filter = "brightness(45%)";
      } else {
        scale = 0.58;
        opacity = 0;
        zIndex = 1;
        filter = "brightness(35%)";
      }

      // Exact pixel placement
      let x = 0;
      if (diff !== 0) {
        const sign = diff > 0 ? 1 : -1;
        const step1 = baseW / 2 + gap + (baseW * 0.86) / 2;
        if (absDiff === 1) {
          x = sign * step1;
        } else if (absDiff === 2) {
          const step2 = step1 + (baseW * 0.86) / 2 + gap + (baseW * 0.75) / 2;
          x = sign * step2;
        } else if (absDiff === 3) {
          const step3 =
            step1 +
            (baseW * 0.86) / 2 +
            gap +
            baseW * 0.75 +
            gap +
            (baseW * 0.66) / 2;
          x = sign * step3;
        } else {
          const step4 =
            step1 +
            (baseW * 0.86) / 2 +
            gap +
            baseW * 0.75 +
            gap +
            baseW * 0.66 +
            gap +
            (baseW * 0.58) / 2;
          x = sign * step4;
        }
      }

      return { x, scale, opacity, zIndex, filter, baseW, baseH };
    },
    [screenWidth]
  );

  // Navigate forward (Next)
  const handleNext = useCallback(() => {
    if (isBusy) return;
    setIsBusy(true);
    const target = displayCenter + 1;
    setDisplayCenter(target);

    // After smooth 550ms GPU slide finishes:
    // Update virtualCenter to target and automatically purge nodes that moved out of buffer
    setTimeout(() => {
      setVirtualCenter(target);
      setIsBusy(false);
    }, 550);
  }, [displayCenter, isBusy]);

  // Navigate backward (Prev)
  const handlePrev = useCallback(() => {
    if (isBusy) return;
    setIsBusy(true);
    const target = displayCenter - 1;
    setDisplayCenter(target);

    setTimeout(() => {
      setVirtualCenter(target);
      setIsBusy(false);
    }, 550);
  }, [displayCenter, isBusy]);

  // Touch Swipe Gesture Handling for Mobile
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

    // Horizontal swipe threshold (> 35px and dominant over vertical)
    if (Math.abs(deltaX) > 35 && Math.abs(deltaX) > Math.abs(deltaY) * 1.1) {
      if (deltaX < 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
  };

  // VIRTUAL WINDOW / CACHE RECYCLING MECHANISM:
  // Dynamically generate 4 buffer items on left, 1 center, and 4 buffer items on right
  // (Total 9-10 items strictly bounded in DOM at all times)
  // When scrolling past, items outside this window are automatically unmounted & garbage collected.
  const visibleCards = useMemo(() => {
    const minCenter = Math.min(virtualCenter, displayCenter);
    const maxCenter = Math.max(virtualCenter, displayCenter);
    const startIdx = minCenter - 4;
    const endIdx = maxCenter + 4;

    const cards = [];
    for (let vIdx = startIdx; vIdx <= endIdx; vIdx++) {
      const dataIdx = ((vIdx % 3) + 3) % 3;
      cards.push({
        vIdx,
        item: itineraries[dataIdx],
      });
    }
    return cards;
  }, [virtualCenter, displayCenter]);

  // Normalized active index (0, 1, or 2) for titles & progress indicator
  const activeNormalizedIdx = ((displayCenter % 3) + 3) % 3;
  const prevNormalizedIdx = (((displayCenter - 1) % 3) + 3) % 3;
  const nextNormalizedIdx = (((displayCenter + 1) % 3) + 3) % 3;

  return (
    <section
      id="hai-trinh"
      className="w-full bg-white py-16 sm:py-24 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 select-text">
        {/* Header */}
        <div className="mb-10 text-left select-text">
          <span className="text-[16px] font-semibold tracking-[0.25em] text-slate-800 uppercase mb-2 block select-text">
            LỰA CHỌN
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-[48px] leading-tight font-normal heading-gradient select-text">
            HẢI TRÌNH DU THUYỀN VỊNH HẠ LONG
          </h2>
        </div>
      </div>

      {/* 
        Virtual Stage: Absolute GPU-Composited Placement 
        - Touch-enabled swipe gesture for mobile
        - Pre-generates 4 items on left and 4 items on right
        - Pure transform: translate3d(...) scale(...) for 60fps/120fps hardware acceleration
        - Zero flexbox reflow / layout thrashing
      */}
      <div
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="w-full relative h-[540px] sm:h-[600px] lg:h-[640px] overflow-hidden touch-pan-y"
      >
        {visibleCards.map(({ vIdx, item }) => {
          const diff = vIdx - displayCenter;
          const { x, scale, opacity, zIndex, filter, baseW, baseH } =
            getCardStyle(diff);
          const isCenter = diff === 0;

          return (
            <div
              key={vIdx}
              onClick={() => {
                if (diff === 1) handleNext();
                else if (diff === -1) handlePrev();
                else if (diff > 1) handleNext();
                else if (diff < -1) handlePrev();
              }}
              style={{
                width: `${baseW}px`,
                height: `${baseH}px`,
                left: "50%",
                top: "50%",
                transform: `translate3d(calc(-50% + ${x}px), -50%, 0) scale(${scale})`,
                opacity,
                zIndex,
                filter,
                transition:
                  "transform 550ms cubic-bezier(0.22, 1, 0.36, 1), opacity 550ms ease, filter 550ms ease",
              }}
              className={`absolute rounded-xs overflow-hidden shrink-0 will-change-transform ${
                isCenter
                  ? "shadow-2xl cursor-default select-text"
                  : "cursor-pointer select-none"
              }`}
            >
              {/* Background Image with Depth Gradient */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 pointer-events-none"
                style={{ backgroundImage: `url('${item.image}')` }}
              >
                {/* Secondary atmospheric overlay for side cards */}
                <div
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    isCenter
                      ? "bg-gradient-to-t from-black/85 via-black/35 to-transparent"
                      : "bg-slate-950/35 bg-gradient-to-t from-black/90 via-black/45 to-transparent"
                  }`}
                />
              </div>

              {/* Card Content */}
              <div
                className={`absolute inset-0 p-6 sm:p-10 lg:p-12 flex flex-col justify-end text-white z-10 ${
                  isCenter ? "select-text" : "select-none"
                }`}
              >
                <h3
                  className={`font-serif-luxury font-normal leading-tight mb-3 transition-all duration-500 ${
                    isCenter
                      ? "text-2xl sm:text-3xl lg:text-[36px] drop-shadow-md select-text"
                      : "text-xl sm:text-2xl text-white/95"
                  }`}
                >
                  {item.title}
                </h3>

                <p
                  className={`text-white/90 text-sm sm:text-[16px] leading-relaxed max-w-xl mb-5 font-light transition-all duration-500 ${
                    isCenter ? "line-clamp-4" : "line-clamp-3"
                  }`}
                >
                  {item.desc}
                </p>

                <div className="mb-6">
                  <p className="text-white font-semibold text-sm sm:text-[16px] mb-2">
                    Điểm nổi bật trong hành trình:
                  </p>
                  <ul className="space-y-1.5 text-sm sm:text-[16px] text-white/90 font-light">
                    {(isCenter
                      ? item.highlights
                      : item.highlights.slice(0, 3)
                    ).map((point, pIdx) => (
                      <li key={pIdx} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-white inline-block shrink-0"></span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom Actions: Both Center and Side have CHI TIẾT underline; Center features luxury blue pill button */}
                <div className="flex items-center justify-between pt-2">
                  <a
                    href="#form-uu-dai"
                    onClick={(e) => {
                      if (!isCenter) {
                        e.preventDefault();
                        if (diff > 0) handleNext();
                        else handlePrev();
                      }
                    }}
                    className="text-white text-xs sm:text-sm font-medium tracking-wider uppercase underline underline-offset-4 hover:text-[#dfa968] transition-colors"
                  >
                    CHI TIẾT
                  </a>

                  {/* Luxury Pill Action Button (Exclusive to Center Card as in Home - s2.png) */}
                  <div
                    className={`transition-all duration-500 ease-out transform ${
                      isCenter
                        ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
                        : "opacity-0 translate-y-2 scale-90 pointer-events-none"
                    }`}
                  >
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        const el = document.getElementById("form-uu-dai");
                        if (el) el.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="bg-[#133e70] hover:bg-[#0e2c50] text-white px-6 py-2.5 rounded-full flex items-center gap-2 text-xs uppercase tracking-wider font-medium transition-all shadow-md cursor-pointer hover:shadow-lg"
                    >
                      <span>CHI TIẾT</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Navigation Track */}
      <div className="max-w-4xl mx-auto mt-6 px-4 flex items-center justify-between text-xs sm:text-[13px] font-semibold text-[#163b65]">
        {/* Left Title Link */}
        <button
          onClick={handlePrev}
          className="uppercase tracking-wider hover:text-[#dfa968] transition-colors cursor-pointer text-left w-36 truncate"
        >
          {itineraries[prevNormalizedIdx].title}
        </button>

        {/* Interactive Navigation Track */}
        <div className="flex-1 max-w-md mx-6 flex items-center gap-3">
          <button
            onClick={handlePrev}
            aria-label="Previous Itinerary"
            className="p-1 hover:text-[#dfa968] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          {/* Track Line with Sliding Thumb Indicator */}
          <div className="relative flex-1 h-[2px] bg-slate-300">
            <div
              className="absolute top-1/2 -translate-y-1/2 h-[4px] bg-[#163b65] rounded-full transition-all duration-500 ease-out"
              style={{
                width: "33.33%",
                left: `${activeNormalizedIdx * 33.33}%`,
              }}
            />
          </div>

          <button
            onClick={handleNext}
            aria-label="Next Itinerary"
            className="p-1 hover:text-[#dfa968] transition-colors cursor-pointer"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Right Title Link */}
        <button
          onClick={handleNext}
          className="uppercase tracking-wider hover:text-[#dfa968] transition-colors cursor-pointer text-right w-36 truncate"
        >
          {itineraries[nextNormalizedIdx].title}
        </button>
      </div>
    </section>
  );
}

