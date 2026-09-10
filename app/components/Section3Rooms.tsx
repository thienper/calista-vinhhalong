"use client";

import React, { useState, useEffect, useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface Room {
  id: string;
  name: string;
  image: string;
  desc: string;
  features: string[];
}

const rooms: Room[] = [
  {
    id: "calista-ocean",
    name: "CALISTA OCEAN",
    image: "/image/Home%20-%20s3%20-%20hình%20background.jpg",
    desc: "Căn phòng ngắm trọn đại dương bao la với cửa kính panorama chạm trần, mang đến sự thư thái tuyệt đối.",
    features: ["Ban công riêng biệt", "Bồn tắm hướng biển", "1 giường King size", "Trang thiết bị hiện đại"],
  },
  {
    id: "calista-bay",
    name: "CALISTA BAY",
    image: "/image/Home%20-%20s3%20-%20hình%20background.jpg",
    desc: "Không gian thoáng đãng nằm tại tầng 2 với tầm nhìn bao quát toàn bộ vẻ đẹp tĩnh lặng của Vịnh Hạ Long.",
    features: ["Ban công riêng ngắm vịnh", "Bồn tắm nằm cao cấp", "Giường đôi hoặc 2 giường đơn", "Minibar miễn phí"],
  },
  {
    id: "calista-president",
    name: "CALISTA PRESIDENT",
    image: "/image/Home%20-%20s3%20-%20hình%20background.jpg",
    desc: "Là hạng phòng sang trọng bậc nhất trên du thuyền Calista, Calista President tái định nghĩa sự xa hoa, hào nhoáng với không gian rộng 126m² tại tầng 3",
    features: [
      "Bồn tắm hướng biển",
      "Bể sục Jacuzzi",
      "1 giường Super King",
      "Sân hiên riêng",
    ],
  },
  {
    id: "calista-majesty",
    name: "CALISTA MAJESTY",
    image: "/image/Home%20-%20s3%20-%20hình%20background.jpg",
    desc: "Được thiết kế tinh tế theo phong cách hoàng gia, đem lại trải nghiệm nghỉ dưỡng quý phái và đẳng cấp.",
    features: ["Không gian 85m² rộng rãi", "Bồn tắm sục massage", "Sofa tiếp khách sang trọng", "Dịch vụ quản gia 24/7"],
  },
  {
    id: "calista-suite",
    name: "CALISTA SUITE",
    image: "/image/Home%20-%20s3%20-%20hình%20background.jpg",
    desc: "Lựa chọn lý tưởng cho các gia đình và cặp đôi tìm kiếm sự ấm cúng, sang trọng và riêng tư tuyệt đối.",
    features: ["Ban công kính trực diện vịnh", "Phòng tắm vách kính cao cấp", "Giường King êm ái", "Bữa sáng tại phòng"],
  },
];

export default function Section3Rooms() {
  const [activeIndex, setActiveIndex] = useState(2); // Default is CALISTA PRESIDENT (index 2) exactly matching Figma Home - s3.png
  const [windowWidth, setWindowWidth] = useState(1920);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const canPrev = activeIndex > 0;
  const canNext = activeIndex < rooms.length - 1;

  const handlePrev = () => {
    if (canPrev) {
      setActiveIndex((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (canNext) {
      setActiveIndex((prev) => prev + 1);
    }
  };

  // Touch gesture handling for mobile swipe (bounded 0..4)
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

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

  // Pixel-perfect card coordinates matching Home - s3.png (1920px wide)
  const getCardLayout = (diff: number) => {
    const isMobile = windowWidth < 768;
    const isSmallTablet = windowWidth >= 768 && windowWidth < 1024;
    const isTablet = windowWidth >= 1024 && windowWidth < 1280;
    const isLaptop = windowWidth >= 1280 && windowWidth < 1536;

    // Desktop (1536px+) matches Figma Home - s3.png 1920px exactly:
    // Center: width = 490px, height = 654px
    // Sides: width = 431px, height = 575px, gap = 41px
    if (diff === 0) {
      const width = isMobile
        ? Math.min(windowWidth - 36, 350)
        : isSmallTablet
        ? 370
        : isTablet
        ? 410
        : isLaptop
        ? 450
        : 490;
      const height = isMobile ? 500 : isSmallTablet ? 530 : isTablet ? 570 : isLaptop ? 610 : 654;
      return {
        xOffset: 0,
        width,
        height,
        zIndex: 30,
        opacity: 1,
        isCenter: true,
      };
    }

    if (diff === -1) {
      const width = isMobile ? 220 : isSmallTablet ? 220 : isTablet ? 320 : isLaptop ? 380 : 431;
      const height = isMobile ? 440 : isSmallTablet ? 470 : isTablet ? 510 : isLaptop ? 540 : 575;
      const xOffset = isMobile
        ? -Math.min(windowWidth * 0.8, 300)
        : isSmallTablet
        ? -305
        : isTablet
        ? -380
        : isLaptop
        ? -442
        : -502;
      return {
        xOffset,
        width,
        height,
        zIndex: 20,
        opacity: isMobile ? 0.35 : 0.92,
        isCenter: false,
      };
    }

    if (diff === 1) {
      const width = isMobile ? 220 : isSmallTablet ? 220 : isTablet ? 320 : isLaptop ? 380 : 431;
      const height = isMobile ? 440 : isSmallTablet ? 470 : isTablet ? 510 : isLaptop ? 540 : 575;
      const xOffset = isMobile
        ? Math.min(windowWidth * 0.8, 300)
        : isSmallTablet
        ? 305
        : isTablet
        ? 380
        : isLaptop
        ? 442
        : 502;
      return {
        xOffset,
        width,
        height,
        zIndex: 20,
        opacity: isMobile ? 0.35 : 0.92,
        isCenter: false,
      };
    }

    if (diff === -2) {
      const width = isMobile ? 180 : isSmallTablet ? 180 : isTablet ? 300 : isLaptop ? 380 : 431;
      const height = isMobile ? 400 : isSmallTablet ? 430 : isTablet ? 480 : isLaptop ? 530 : 575;
      const xOffset = isMobile
        ? -520
        : isSmallTablet
        ? -520
        : isTablet
        ? -720
        : isLaptop
        ? -854
        : -974;
      return {
        xOffset,
        width,
        height,
        zIndex: 10,
        opacity: isMobile ? 0 : isSmallTablet ? 0.4 : 0.8,
        isCenter: false,
      };
    }

    if (diff === 2) {
      const width = isMobile ? 180 : isSmallTablet ? 180 : isTablet ? 300 : isLaptop ? 380 : 431;
      const height = isMobile ? 400 : isSmallTablet ? 430 : isTablet ? 480 : isLaptop ? 530 : 575;
      const xOffset = isMobile
        ? 520
        : isSmallTablet
        ? 520
        : isTablet
        ? 720
        : isLaptop
        ? 854
        : 974;
      return {
        xOffset,
        width,
        height,
        zIndex: 10,
        opacity: isMobile ? 0 : isSmallTablet ? 0.4 : 0.8,
        isCenter: false,
      };
    }

    // Outer off-screen cards
    const dir = diff > 0 ? 1 : -1;
    const baseOffset = isLaptop ? 854 : 974;
    const baseWidth = isLaptop ? 380 : 431;
    return {
      xOffset: dir * (baseOffset + (Math.abs(diff) - 2) * (baseWidth + 41)),
      width: baseWidth,
      height: 575,
      zIndex: 0,
      opacity: 0,
      isCenter: false,
    };
  };

  return (
    <section
      id="hang-phong"
      className="relative w-full py-20 lg:py-28 overflow-hidden bg-cover bg-center select-text"
      style={{
        backgroundImage: `url('/image/Home%20-%20s3%20-%20h%C3%ACnh%20background.jpg')`,
      }}
    >
      {/* Light Luxury Glass/White Overlay */}
      <div className="absolute inset-0 bg-white/75" />

      {/* 1. Header Centered: contained within max-w-7xl */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 select-text">
        <div className="text-center max-w-4xl mx-auto mb-14 select-text">
          <span className="text-[16px] font-semibold tracking-[0.25em] text-slate-800 uppercase mb-3 block select-text">
            HỆ THỐNG
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-[48px] leading-tight font-normal heading-gradient mb-5 select-text">
            HẠNG PHÒNG NGHỈ TRÊN DU THUYỀN
          </h2>
          <p className="text-slate-600 text-sm sm:text-[16px] leading-relaxed font-light select-text">
            Calista Cruise mang đến các hạng phòng nghỉ sang trọng trên du thuyền tại Vịnh
            Hạ Long, được thiết kế với ban công riêng, cửa sổ lớn ngắm toàn cảnh và bồn tắm
            tách biệt. Mỗi hạng phòng đều có sự kết hợp khác biệt về không gian, vị trí, cách
            bố trí giường ngủ và các đặc quyền riêng. Từ những căn phòng ấm cúng dành cho các
            cặp đôi đến các lựa chọn rộng rãi cho gia đình hay những dịp đặc biệt, du khách
            có thể dễ dàng chọn được căn phòng phù hợp nhất với hành trình của mình.
          </p>
        </div>
      </div>

      {/* 
        2. Virtual Stage: FULL-WIDTH (W-FULL) Across the Entire 1920px Window
        No max-w-7xl constraint, matching Figma Home - s3.png
      */}
      <div className="relative z-10 w-full overflow-hidden select-text">
        <div
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="relative w-full h-[670px] sm:h-[690px] flex items-center justify-center touch-pan-y select-text"
        >
          {rooms.map((room, idx) => {
            const diff = idx - activeIndex;
            const { xOffset, width, height, zIndex, opacity, isCenter } = getCardLayout(diff);

            return (
              <div
                key={room.id}
                onClick={() => {
                  if (!isCenter) setActiveIndex(idx);
                }}
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  width: `${width}px`,
                  height: `${height}px`,
                  transform: `translate3d(calc(-50% + ${xOffset}px), -50%, 0)`,
                  zIndex,
                  opacity,
                  pointerEvents: opacity > 0 ? "auto" : "none",
                }}
                className="transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform will-change-[width,height,opacity]"
              >
                {isCenter ? (
                  /* ================= Active Expanded Center Card ================= */
                  <div className="w-full h-full bg-white shadow-2xl overflow-hidden border-2 border-[#163b65] flex flex-col rounded-xs select-text">
                    {/* White Top Header Bar (80px) */}
                    <div className="h-[80px] shrink-0 px-6 flex items-center justify-center bg-white border-b border-slate-100 select-text">
                      <h3 className="font-serif-luxury text-[#163b65] text-2xl sm:text-[28px] uppercase tracking-wider font-normal select-text whitespace-nowrap">
                        {room.name}
                      </h3>
                    </div>

                    {/* Room Image with Content Overlay */}
                    <div className="relative flex-1 bg-cover bg-center overflow-hidden select-text">
                      <img
                        src={room.image}
                        alt={room.name}
                        className="w-full h-full object-cover select-none"
                      />

                      {/* Bottom Dark Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent flex flex-col justify-end p-6 sm:p-8 text-white select-text">
                        <p className="text-sm sm:text-[16px] text-white/95 font-light leading-relaxed mb-4 select-text">
                          {room.desc}
                        </p>

                        <div className="flex items-end justify-between gap-4 select-text">
                          <ul className="space-y-1.5 text-sm sm:text-[15px] text-white/90 font-light select-text">
                            {room.features.map((feature, fIdx) => (
                              <li key={fIdx} className="flex items-center gap-2 select-text">
                                <span className="w-1.5 h-1.5 rounded-full bg-white inline-block shrink-0"></span>
                                <span className="select-text">{feature}</span>
                              </li>
                            ))}
                          </ul>

                          <div className="shrink-0">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                const el = document.getElementById("form-uu-dai");
                                if (el) el.scrollIntoView({ behavior: "smooth" });
                              }}
                              className="bg-[#133e70] hover:bg-[#0e2c50] text-white px-7 py-2.5 rounded-xs text-xs sm:text-[13px] uppercase tracking-wider font-semibold transition-colors shadow-md cursor-pointer whitespace-nowrap"
                            >
                              CHI TIẾT
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* ================= Inactive Side Transparent Card (matching Figma) ================= */
                  <div className="w-full h-full border border-black/80 pt-9 px-6 text-center relative bg-transparent cursor-pointer hover:border-black hover:bg-black/[0.02] transition-all duration-300 rounded-xs flex flex-col items-center justify-start select-none group">
                    <span className="font-serif-luxury text-black text-xl sm:text-[24px] lg:text-[26px] uppercase tracking-wider font-normal transition-colors group-hover:text-[#133e70] whitespace-nowrap">
                      {room.name}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 
        3. Bottom Bounded Navigation Track (0..4) 
        - Disables Prev when at first item (idx 0)
        - Disables Next when at last item (idx 4)
      */}
      <div className="max-w-3xl mx-auto mt-8 px-4 flex items-center justify-between text-xs sm:text-[13px] font-semibold text-[#163b65] select-text">
        {/* Left Text Button: Name of Previous Room */}
        {canPrev ? (
          <button
            onClick={handlePrev}
            className="uppercase tracking-wider text-slate-800 hover:text-[#dfa968] transition-colors cursor-pointer text-left w-36 sm:w-44 truncate"
          >
            {rooms[activeIndex - 1].name}
          </button>
        ) : (
          <div className="w-36 sm:w-44 select-none pointer-events-none" />
        )}

        {/* Middle Progress Track with Arrow Controls */}
        <div className="flex-1 max-w-md mx-4 sm:mx-6 flex items-center gap-3">
          <button
            onClick={handlePrev}
            disabled={!canPrev}
            aria-label="Previous Room"
            className={`p-1.5 transition-colors ${
              canPrev
                ? "text-[#163b65] hover:text-[#dfa968] cursor-pointer"
                : "text-slate-300 cursor-not-allowed opacity-35"
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          <div className="relative flex-1 h-[2px] bg-slate-300">
            <div
              className="absolute top-1/2 -translate-y-1/2 h-[4px] bg-[#163b65] rounded-full transition-all duration-500 ease-out"
              style={{
                width: "20%",
                left: `${activeIndex * 20}%`,
              }}
            />
          </div>

          <button
            onClick={handleNext}
            disabled={!canNext}
            aria-label="Next Room"
            className={`p-1.5 transition-colors ${
              canNext
                ? "text-[#163b65] hover:text-[#dfa968] cursor-pointer"
                : "text-slate-300 cursor-not-allowed opacity-35"
            }`}
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Right Text Button: Name of Next Room */}
        {canNext ? (
          <button
            onClick={handleNext}
            className="uppercase tracking-wider text-slate-800 hover:text-[#dfa968] transition-colors cursor-pointer text-right w-36 sm:w-44 truncate"
          >
            {rooms[activeIndex + 1].name}
          </button>
        ) : (
          <div className="w-36 sm:w-44 select-none pointer-events-none" />
        )}
      </div>
    </section>
  );
}
