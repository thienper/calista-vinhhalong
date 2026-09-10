"use client";

import React, { useState } from "react";

interface MomentPhoto {
  id: number;
  image: string;
  alt: string;
}

const photos: MomentPhoto[] = [
  {
    id: 1,
    image: "/image/Home%20-%20s6%20-%20%E1%BA%A3nh%201.jpg",
    alt: "Chèo kayak trên vịnh",
  },
  {
    id: 2,
    image: "/image/Home%20-%20s6%20-%20%E1%BA%A3nh%202.png",
    alt: "Floating breakfast tại bồn sục jacuzzi",
  },
  {
    id: 3,
    image: "/image/Home%20-%20s6%20-%20%E1%BA%A3nh%203.jpg",
    alt: "Trải nghiệm văn hóa ngư dân Hạ Long",
  },
  {
    id: 4,
    image: "/image/Home%20-%20s6%20-%20%E1%BA%A3nh%204.jpg",
    alt: "Tiệc sinh nhật ấm cúng trên du thuyền",
  },
  {
    id: 5,
    image: "/image/Home%20-%20s6%20-%20%E1%BA%A3nh%205.jpg",
    alt: "Sân tập golf mini trên boong sundeck",
  },
  {
    id: 6,
    image: "/image/Home%20-%20s6%20-%20%E1%BA%A3nh%206.jpg",
    alt: "Thư giãn đọc sách ngắm vịnh di sản",
  },
  {
    id: 7,
    image: "/image/Home%20-%20s6%20-%20%E1%BA%A3nh%207.jpg",
    alt: "Khoảnh khắc check-in ban công",
  },
];

export default function Section6Moments() {
  const [centerIdx, setCenterIdx] = useState(4); // Index 4 is the mini-golf photo (Item 5)
  const containerRef = React.useRef<HTMLDivElement>(null);
  const itemRefs = React.useRef<(HTMLDivElement | null)[]>([]);
  const isProgrammaticScroll = React.useRef(false);

  // Smooth scroll to target photo
  const scrollToItem = (index: number) => {
    const el = itemRefs.current[index];
    if (el) {
      isProgrammaticScroll.current = true;
      el.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
      setTimeout(() => {
        isProgrammaticScroll.current = false;
      }, 500);
    }
  };

  // Center photo 4 on initial mount on mobile
  React.useEffect(() => {
    const timer = setTimeout(() => {
      scrollToItem(4);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  // Detect which photo is in the center of the viewport/container during scroll
  const handleScroll = () => {
    if (isProgrammaticScroll.current) return;
    const container = containerRef.current;
    if (!container) return;

    const containerRect = container.getBoundingClientRect();
    const containerCenter = containerRect.left + containerRect.width / 2;

    let closestIdx = centerIdx;
    let minDistance = Infinity;

    itemRefs.current.forEach((el, idx) => {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const itemCenter = rect.left + rect.width / 2;
      const distance = Math.abs(containerCenter - itemCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closestIdx = idx;
      }
    });

    if (closestIdx !== centerIdx) {
      setCenterIdx(closestIdx);
    }
  };

  return (
    <section id="thu-vien" className="w-full bg-white py-16 sm:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Header */}
        <div className="mb-12 text-left">
          <span className="text-xs sm:text-[13px] font-semibold tracking-[0.25em] text-slate-800 uppercase mb-2 block">
            THƯ VIỆN
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-[46px] leading-tight font-normal heading-gradient">
            CÙNG CHIA SẺ KHOẢNH KHẮC
          </h2>
        </div>
      </div>

      {/* Cascading visual gallery flow with Auto-Center Detection on Mobile */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="w-full overflow-x-auto no-scrollbar py-4 h-[530px] sm:h-[570px] flex items-center scroll-smooth snap-x snap-proximity px-[25vw] sm:px-[15vw] md:px-0"
        style={{ WebkitOverflowScrolling: "touch", touchAction: "pan-y pan-x" }}
      >
        <div className="flex items-center justify-start md:justify-center gap-3 sm:gap-4 min-w-max md:min-w-[1100px] px-4 mx-auto h-[500px]">
          {photos.map((photo, idx) => {
            const isCenter = idx === centerIdx;
            const distance = Math.abs(idx - centerIdx);

            // Scale and height calculation matching the natural perspective arch in s6
            let heightClass = "h-[460px] sm:h-[500px] w-72 sm:w-96 shadow-2xl rounded-xl z-20";
            let opacityClass = "opacity-100";

            if (distance === 1) {
              heightClass = "h-[400px] sm:h-[440px] w-56 sm:w-72 rounded-lg z-10";
              opacityClass = "opacity-95";
            } else if (distance === 2) {
              heightClass = "h-[320px] sm:h-[360px] w-44 sm:w-56 rounded-md z-5";
              opacityClass = "opacity-80";
            } else if (distance === 3) {
              heightClass = "h-[240px] sm:h-[280px] w-36 sm:w-44 rounded-sm";
              opacityClass = "opacity-60";
            } else if (distance >= 4) {
              heightClass = "h-[180px] sm:h-[220px] w-28 sm:w-36 rounded-sm";
              opacityClass = "opacity-40";
            }

            return (
              <div
                key={photo.id}
                ref={(el) => {
                  itemRefs.current[idx] = el;
                }}
                onClick={() => {
                  setCenterIdx(idx);
                  scrollToItem(idx);
                }}
                className={`relative shrink-0 overflow-hidden cursor-pointer transform-gpu transition-all duration-500 ease-out hover:opacity-100 snap-center ${heightClass} ${opacityClass}`}
              >
                <img
                  src={photo.image}
                  alt={photo.alt}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                {!isCenter && (
                  <div className="absolute inset-0 bg-white/10 hover:bg-transparent transition-colors" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

