"use client";

import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";

interface AccordionItem {
  id: number;
  title: string;
  image: string;
}

const items: AccordionItem[] = [
  {
    id: 0,
    title: "TRẢI NGHIỆM VÀ KHÁM PHÁ",
    image: "/image/Home%20-%20s1%20-%20Tr%E1%BA%A3i%20nghi%E1%BB%87m%20v%C3%A0%20kh%C3%A1m%20ph%C3%A1.jpg",
  },
  {
    id: 1,
    title: "DỊCH VỤ VÀ TIỆN ÍCH",
    image: "/image/Home%20-%20s1%20-%20Du%20l%E1%BB%8Bch%20v%C3%A0%20ti%E1%BB%87n%20%C3%ADch.png",
  },
  {
    id: 2,
    title: "ẨM THỰC",
    image: "/image/Home%20-%20s1%20-%20%E1%BA%A8m%20th%E1%BB%B1c.jpg",
  },
  {
    id: 3,
    title: "CẨM NANG DU LỊCH",
    image: "/image/Home%20-%20s1%20-%20C%E1%BA%A9m%20nang%20du%20l%E1%BB%8Bch.png",
  },
];

export default function Section1Intro() {
  const [activeId, setActiveId] = useState<number>(0);

  return (
    <section id="ve-chung-toi" className="w-full bg-white py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Heading & Description */}
          <div className="lg:col-span-5 flex flex-col justify-center pt-4">
            <span className="text-xs sm:text-[13px] font-semibold tracking-[0.25em] text-slate-800 uppercase mb-4 block">
              DU THUYỀN
            </span>

            <h2 className="font-serif-luxury text-4xl sm:text-5xl lg:text-[54px] leading-[1.12] font-normal mb-8">
              <span className="heading-gradient block">CALISTA</span>
              <span className="heading-gradient block">VỊNH HẠ LONG</span>
            </h2>

            <p className="text-slate-600 text-sm sm:text-[15px] leading-relaxed max-w-md font-light">
              Calista Cruise là du thuyền sang trọng phục vụ các chuyến tham quan nghỉ
              đêm trên Vịnh Hạ Long, kết hợp hoàn hảo giữa hệ thống phòng nghỉ rộng
              rãi có ban công riêng, ẩm thực được chăm chút kỹ lưỡng, các tiện nghi
              hiện đại cùng dịch vụ chu đáo xuyên suốt hành trình.
            </p>
          </div>

          {/* Right Column: Accordion Showcase with Fixed Container Height */}
          <div className="lg:col-span-7 flex flex-col gap-3.5 h-[580px] lg:h-[660px] overflow-hidden">
            {items.map((item) => {
              const isActive = activeId === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => setActiveId(item.id)}
                  className={`relative overflow-hidden cursor-pointer rounded-xs transform-gpu will-change-[flex] transition-[flex] duration-500 ease-out ${
                    isActive ? "flex-[5]" : "flex-[1]"
                  }`}
                >
                  {/* Background Image */}
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
                    style={{ backgroundImage: `url('${item.image}')` }}
                  >
                    {/* Gradient Overlay */}
                    <div
                      className={`absolute inset-0 transition-opacity duration-300 ${
                        isActive
                          ? "bg-gradient-to-t from-black/80 via-black/20 to-transparent"
                          : "bg-black/55 hover:bg-black/45"
                      }`}
                    />
                  </div>

                  {/* Content for Expanded Card */}
                  {isActive ? (
                    <div className="absolute inset-0 p-6 sm:p-10 flex flex-col justify-end z-10 transition-all duration-300 delay-150 ease-out">
                      <h3 className="font-serif-luxury text-white text-2xl sm:text-3xl lg:text-[40px] tracking-wider uppercase font-normal drop-shadow-lg leading-tight">
                        {item.title.includes(" ") && item.title.startsWith("TRẢI NGHIỆM") ? (
                          <>
                            TRẢI NGHIỆM
                            <br />
                            VÀ KHÁM PHÁ
                          </>
                        ) : (
                          item.title
                        )}
                      </h3>
                    </div>
                  ) : (
                    /* Content for Collapsed Bar */
                    <div className="absolute inset-0 px-6 sm:px-8 flex items-center justify-between z-10">
                      <h3 className="font-serif-luxury text-white text-base sm:text-xl tracking-wider uppercase font-normal drop-shadow-sm">
                        {item.title}
                      </h3>
                      <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full border border-white/70 flex items-center justify-center text-white">
                        <Plus className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
