"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Calendar } from "lucide-react";

export default function HeroBanner() {
  const [selectedItinerary, setSelectedItinerary] = useState("HẢI TRÌNH");
  const [selectedDate, setSelectedDate] = useState("");
  const [showItineraryDropdown, setShowItineraryDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowItineraryDropdown(false);
      }
    }
    if (showItineraryDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showItineraryDropdown]);

  const itineraries = [
    "Hải trình 2 Ngày 1 Đêm",
    "Hải trình 3 Ngày 2 Đêm",
    "Hải trình Speedboat Khám phá",
  ];

  return (
    <section className="relative w-full min-h-[580px] lg:min-h-[660px] flex flex-col items-center justify-center overflow-visible z-20">
      {/* Background Image with Dark Vignette/Overlay (isolated in overflow-hidden) */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 scale-105"
          style={{
            backgroundImage: `url('/image/%E1%BA%A3nh%20hero%20banner.png')`,
          }}
        >
          {/* Subtle dark tint to ensure high contrast */}
          <div className="absolute inset-0 bg-black/35" />
        </div>
      </div>

      {/* Center Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center flex flex-col items-center pb-20">
        <h1 className="font-serif-luxury text-white text-5xl sm:text-6xl md:text-7xl lg:text-[86px] tracking-wider uppercase font-normal drop-shadow-md">
          SUMMER TRAVEL
        </h1>
        <p className="text-white text-base sm:text-xl md:text-2xl font-light mt-3 tracking-wide drop-shadow-sm">
          Giảm ngay 500k cho lần đầu đăng ký qua Website
        </p>
      </div>

      {/* Floating Glassmorphic Search Bar */}
      <div className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 w-[92%] max-w-4xl z-30">
        <div className="bg-[#12365e]/80 backdrop-blur-md rounded-xl p-3 sm:p-4 border border-white/25 shadow-2xl flex flex-col md:flex-row items-stretch md:items-center gap-3">
          {/* Select: Hải trình */}
          <div ref={dropdownRef} className="relative flex-1">
            <button
              type="button"
              onClick={() => setShowItineraryDropdown((prev) => !prev)}
              className="w-full flex items-center justify-between border border-white/50 rounded-lg px-4 py-3 bg-transparent text-white text-xs sm:text-[13px] tracking-wider uppercase hover:border-white transition-colors cursor-pointer"
            >
              <span className="truncate">{selectedItinerary}</span>
              <ChevronDown
                className={`w-4 h-4 ml-2 opacity-80 shrink-0 transition-transform duration-200 ${
                  showItineraryDropdown ? "rotate-180" : ""
                }`}
              />
            </button>

            {showItineraryDropdown && (
              <div className="absolute top-full left-0 mt-2 w-full bg-white rounded-lg shadow-2xl overflow-hidden z-50 border border-slate-200 py-1">
                {itineraries.map((itinerary, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setSelectedItinerary(itinerary);
                      setShowItineraryDropdown(false);
                    }}
                    className="w-full text-left px-4 py-3 text-xs text-slate-800 hover:bg-amber-50 hover:text-amber-800 transition-colors cursor-pointer font-medium"
                  >
                    {itinerary}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Date Picker: Ngày khởi hành */}
          <div className="relative flex-1">
            <button
              type="button"
              onClick={() => {
                const input = document.getElementById("hero-date-picker");
                if (input) {
                  // @ts-ignore
                  input.showPicker ? input.showPicker() : input.focus();
                }
              }}
              className="w-full flex items-center justify-between border border-white/50 rounded-lg px-4 py-3 bg-transparent text-white text-xs sm:text-[13px] tracking-wider uppercase hover:border-white transition-colors cursor-pointer"
            >
              <span>{selectedDate ? selectedDate : "NGÀY KHỞI HÀNH"}</span>
              <ChevronDown className="w-4 h-4 ml-2 opacity-80 shrink-0" />
            </button>
            <input
              id="hero-date-picker"
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="sr-only"
            />
          </div>

          {/* Button: Tìm kiếm */}
          <button
            type="button"
            onClick={() => {
              const el = document.getElementById("hai-trinh");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="btn-gold px-8 py-3.5 rounded-lg text-xs sm:text-[13px] font-medium tracking-widest uppercase transition-all duration-200 cursor-pointer shadow-md text-center"
          >
            TÌM KIẾM
          </button>
        </div>
      </div>
    </section>
  );
}
