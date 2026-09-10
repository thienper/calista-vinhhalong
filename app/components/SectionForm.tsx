"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, CheckCircle2 } from "lucide-react";

export default function SectionForm() {
  const [email, setEmail] = useState("");
  const [travelerType, setTravelerType] = useState("");
  const [isOpenSelect, setIsOpenSelect] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpenSelect(false);
      }
    }
    if (isOpenSelect) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpenSelect]);

  const options = [
    "Solo Traveler",
    "Couple / Honeymoon",
    "Family with Kids",
    "Group of Friends",
    "Corporate / MICE",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setEmail("");
        setTravelerType("");
      }, 4000);
    }
  };

  return (
    <section
      id="form-uu-dai"
      className="relative w-full py-20 lg:py-28 pb-28 lg:pb-36 overflow-visible z-20 bg-cover bg-center"
    >
      {/* Background Image isolated in overflow-hidden */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('/image/Form%20-%20%E1%BA%A3nh%20background.jpg')`,
          }}
        />
        {/* Deep Rich Blue Overlay matching Form.png */}
        <div className="absolute inset-0 bg-[#163e6e]/85 backdrop-blur-[1px]" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-8 text-center text-white">
        {/* Subtitle & Title */}
        <span className="text-xs sm:text-[13px] font-semibold tracking-[0.25em] text-blue-200 uppercase mb-3 block">
          ĐĂNG KÍ
        </span>

        <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-[46px] uppercase tracking-wider font-normal leading-tight mb-4">
          NHẬN THÔNG TIN ƯU ĐÃI
        </h2>

        <p className="text-blue-100/90 text-xs sm:text-sm font-light leading-relaxed max-w-xl mx-auto mb-10">
          Chúng tôi sẽ cập nhập cho bạn những tin tức mới nhất, cẩm nang du lịch và
          các ưu đãi đặc biệt.
        </p>

        {submitted ? (
          <div className="bg-white/10 backdrop-blur-md border border-white/30 rounded-xl p-8 max-w-xl mx-auto flex flex-col items-center gap-3">
            <CheckCircle2 className="w-10 h-10 text-[#dfa968]" />
            <h3 className="font-serif-luxury text-xl">Cảm ơn bạn đã đăng ký!</h3>
            <p className="text-xs text-blue-100">
              Calista Cruise sẽ gửi thông tin ưu đãi mới nhất vào hòm thư của bạn.
            </p>
          </div>
        ) : (
          /* Form Fields */
          <form
            onSubmit={handleSubmit}
            className="max-w-xl mx-auto flex flex-col gap-4 text-left"
          >
            {/* Input Email */}
            <div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full bg-transparent border border-white/75 rounded-lg px-5 py-3.5 text-white placeholder:text-white/75 text-xs sm:text-sm focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-colors"
              />
            </div>

            {/* Custom Select Traveler Type */}
            <div ref={selectRef} className="relative z-30">
              <button
                type="button"
                onClick={() => setIsOpenSelect((prev) => !prev)}
                className="w-full bg-transparent border border-white/75 rounded-lg px-5 py-3.5 text-white text-xs sm:text-sm flex items-center justify-between focus:outline-none hover:border-white transition-colors cursor-pointer"
              >
                <span className={travelerType ? "text-white font-medium" : "text-white/75"}>
                  {travelerType || "What type of traveler are you?"}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-white/80 shrink-0 ml-2 transition-transform duration-200 ${
                    isOpenSelect ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isOpenSelect && (
                <div className="absolute top-full left-0 mt-2 w-full bg-white rounded-lg shadow-2xl py-2 z-50 border border-slate-200">
                  {options.map((opt, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setTravelerType(opt);
                        setIsOpenSelect(false);
                      }}
                      className="w-full text-left px-5 py-3 text-xs sm:text-sm text-slate-800 hover:bg-amber-50 hover:text-amber-800 transition-colors cursor-pointer font-medium"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Submit Button: SUBCRIBE */}
            <button
              type="submit"
              className="w-full bg-[#dfa968] hover:bg-[#cb9250] text-[#133e70] font-bold py-3.5 rounded-lg text-xs sm:text-sm tracking-wider uppercase transition-all duration-200 shadow-lg cursor-pointer mt-1"
            >
              SUBCRIBE
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
