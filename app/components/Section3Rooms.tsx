"use client";

import React, { useState } from "react";
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
    image: "/image/Home%20-%20s3%20-%20Calista%20president.jpg",
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
  const [activeIndex, setActiveIndex] = useState(2); // Default is CALISTA PRESIDENT

  const handlePrev = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : rooms.length - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev < rooms.length - 1 ? prev + 1 : 0));
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

  const activeRoom = rooms[activeIndex];
  const prevRoom = rooms[(activeIndex - 1 + rooms.length) % rooms.length];
  const nextRoom = rooms[(activeIndex + 1) % rooms.length];

  return (
    <section
      id="hang-phong"
      className="relative w-full py-20 lg:py-28 overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage: `url('/image/Home%20-%20s3%20-%20h%C3%ACnh%20background.jpg')`,
      }}
    >
      {/* Light Luxury Glass/White Overlay */}
      <div className="absolute inset-0 bg-white/88 backdrop-blur-[2px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8">
        {/* Header Centered */}
        <div className="text-center max-w-4xl mx-auto mb-14">
          <span className="text-xs sm:text-[13px] font-semibold tracking-[0.25em] text-slate-800 uppercase mb-3 block">
            HỆ THỐNG
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-[46px] leading-tight font-normal heading-gradient mb-5">
            HẠNG PHÒNG NGHỈ TRÊN DU THUYỀN
          </h2>
          <p className="text-slate-600 text-xs sm:text-[13.5px] leading-relaxed font-light">
            Calista Cruise mang đến các hạng phòng nghỉ sang trọng trên du thuyền tại Vịnh
            Hạ Long, được thiết kế với ban công riêng, cửa sổ lớn ngắm toàn cảnh và bồn tắm
            tách biệt. Mỗi hạng phòng đều có sự kết hợp khác biệt về không gian, vị trí, cách
            bố trí giường ngủ và các đặc quyền riêng. Từ những căn phòng ấm cúng dành cho các
            cặp đôi đến các lựa chọn rộng rãi cho gia đình hay những dịp đặc biệt, du khách
            có thể dễ dàng chọn được căn phòng phù hợp nhất với hành trình của mình.
          </p>
        </div>

        {/* Room Carousel Container with Fixed Height and Touch Support */}
        <div
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="relative w-full h-[560px] flex items-center touch-pan-y"
        >
          <div className="grid grid-cols-12 gap-3 lg:gap-5 items-center w-full">
            {/* Card Left Outer (Hidden on small) */}
            <div className="hidden xl:block col-span-2 h-[460px] border border-slate-700/70 p-4 text-center relative bg-white/5 backdrop-blur-[1px] transform-gpu transition-all duration-500 ease-out">
              <span className="font-serif-luxury text-slate-900 text-base uppercase tracking-wider font-medium">
                {rooms[(activeIndex - 2 + rooms.length) % rooms.length].name}
              </span>
            </div>

            {/* Card Left (Prev) */}
            <div
              onClick={handlePrev}
              className="hidden md:block col-span-3 xl:col-span-2 h-[500px] border border-slate-700/80 p-5 text-center relative bg-white/10 backdrop-blur-[1px] cursor-pointer hover:bg-white/25 transform-gpu transition-all duration-500 ease-out"
            >
              <span className="font-serif-luxury text-slate-900 text-lg uppercase tracking-wider font-medium">
                {prevRoom.name}
              </span>
            </div>

            {/* Active Card (Center - Calista President) */}
            <div className="col-span-12 md:col-span-6 xl:col-span-4 bg-white shadow-2xl overflow-hidden border border-slate-300 h-[536px] flex flex-col transform-gpu transition-all duration-500 ease-out">
              {/* White Top Header Bar */}
              <div className="h-[56px] shrink-0 px-6 flex items-center justify-center bg-white border-b border-slate-100">
                <h3 className="font-serif-luxury text-[#163b65] text-xl sm:text-2xl uppercase tracking-wider font-medium">
                  {activeRoom.name}
                </h3>
              </div>

              {/* Room Image with Content Overlay */}
              <div className="relative flex-1 bg-cover bg-center overflow-hidden">
                <img
                  src={activeRoom.image}
                  alt={activeRoom.name}
                  className="w-full h-full object-cover"
                />

                {/* Bottom Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-6 text-white">
                  <p className="text-xs sm:text-[13px] text-white/90 font-light leading-relaxed mb-3 min-h-[38px] line-clamp-2">
                    {activeRoom.desc}
                  </p>

                  <ul className="space-y-1 text-xs text-white/90 mb-4 font-light min-h-[76px]">
                    {activeRoom.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-white inline-block"></span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div>
                    <button
                      onClick={() => {
                        const el = document.getElementById("form-uu-dai");
                        if (el) el.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="bg-[#133e70] hover:bg-[#0e2c50] text-white px-7 py-2 rounded-xs text-xs uppercase tracking-wider font-medium transition-colors shadow-md cursor-pointer"
                    >
                      CHI TIẾT
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Card Right (Next) */}
            <div
              onClick={handleNext}
              className="hidden md:block col-span-3 xl:col-span-2 h-[500px] border border-slate-700/80 p-5 text-center relative bg-white/10 backdrop-blur-[1px] cursor-pointer hover:bg-white/25 transform-gpu transition-all duration-500 ease-out"
            >
              <span className="font-serif-luxury text-slate-900 text-lg uppercase tracking-wider font-medium">
                {nextRoom.name}
              </span>
            </div>

            {/* Card Right Outer (Hidden on small) */}
            <div className="hidden xl:block col-span-2 h-[460px] border border-slate-700/70 p-4 text-center relative bg-white/5 backdrop-blur-[1px] transform-gpu transition-all duration-500 ease-out">
              <span className="font-serif-luxury text-slate-900 text-base uppercase tracking-wider font-medium">
                {rooms[(activeIndex + 2) % rooms.length].name}
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Navigation Track */}
        <div className="max-w-3xl mx-auto mt-12 px-4 flex items-center justify-between text-xs sm:text-[13px] font-semibold text-[#163b65]">
          <button
            onClick={handlePrev}
            className="uppercase tracking-wider hover:text-[#dfa968] transition-colors cursor-pointer text-left w-36 truncate"
          >
            {prevRoom.name}
          </button>

          <div className="flex-1 max-w-md mx-6 flex items-center gap-3">
            <button
              onClick={handlePrev}
              aria-label="Previous Room"
              className="p-1 hover:text-[#dfa968] transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>

            <div className="relative flex-1 h-[2px] bg-slate-300">
              <div
                className="absolute top-1/2 -translate-y-1/2 h-[4px] bg-[#163b65] rounded-full transition-all duration-300"
                style={{
                  width: "20%",
                  left: `${activeIndex * 20}%`,
                }}
              />
            </div>

            <button
              onClick={handleNext}
              aria-label="Next Room"
              className="p-1 hover:text-[#dfa968] transition-colors cursor-pointer"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={handleNext}
            className="uppercase tracking-wider hover:text-[#dfa968] transition-colors cursor-pointer text-right w-36 truncate"
          >
            {nextRoom.name}
          </button>
        </div>
      </div>
    </section>
  );
}
