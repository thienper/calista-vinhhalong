"use client";

import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-[#133860] text-white pt-20 pb-16 relative overflow-hidden">
      {/* Subtle curved background ornament matching Footer.png */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <svg
          className="w-full h-full"
          viewBox="0 0 1440 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M-100 500 C 300 300, 700 700, 1500 200"
            stroke="white"
            strokeWidth="80"
            strokeOpacity="0.15"
          />
          <path
            d="M-50 200 C 400 600, 1000 100, 1600 500"
            stroke="white"
            strokeWidth="120"
            strokeOpacity="0.1"
          />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8">
        {/* Top Logo Centered */}
        <div className="flex justify-center mb-16">
          <Link href="/">
            <img
              src="/image/Footer%20%20-%20Logo.png"
              alt="Calista Halong Bay Cruise"
              className="h-16 sm:h-20 w-auto object-contain"
            />
          </Link>
        </div>

        {/* 4 Columns Top Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* Column 1: HẢI TRÌNH */}
          <div>
            <h4 className="font-serif-luxury text-[#e0ab72] text-sm uppercase tracking-wider mb-4 font-normal">
              HẢI TRÌNH
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-[13px] text-white/85 font-light">
              <li>
                <Link href="#hai-trinh" className="hover:text-[#e0ab72] transition-colors">
                  2 ngày 1 đêm
                </Link>
              </li>
              <li>
                <Link href="#hai-trinh" className="hover:text-[#e0ab72] transition-colors">
                  3 ngày 2 đêm
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: MORE INFORMATION */}
          <div>
            <h4 className="font-serif-luxury text-[#e0ab72] text-sm uppercase tracking-wider mb-4 font-normal">
              MORE INFORMATION
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-[13px] text-white/85 font-light">
              <li>
                <Link href="#form-uu-dai" className="hover:text-[#e0ab72] transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="#thu-vien" className="hover:text-[#e0ab72] transition-colors">
                  Media Centre
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: EXPERIENCE */}
          <div>
            <h4 className="font-serif-luxury text-[#e0ab72] text-sm uppercase tracking-wider mb-4 font-normal">
              EXPERIENCE
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-[13px] text-white/85 font-light">
              <li>
                <Link href="#hang-phong" className="hover:text-[#e0ab72] transition-colors">
                  Our Rooms
                </Link>
              </li>
              <li>
                <Link href="#hai-trinh" className="hover:text-[#e0ab72] transition-colors">
                  Itineraries & Activities
                </Link>
              </li>
              <li>
                <Link href="#ve-chung-toi" className="hover:text-[#e0ab72] transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="#form-uu-dai" className="hover:text-[#e0ab72] transition-colors">
                  MICE & Charter
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: LINK WITH US */}
          <div>
            <h4 className="font-serif-luxury text-[#e0ab72] text-sm uppercase tracking-wider mb-4 font-normal">
              LINK WITH US
            </h4>
            <div className="flex items-center gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-7 h-7 flex items-center justify-center hover:scale-110 transition-transform"
              >
                <img
                  src="/image/Footer%20-%20facebook.png"
                  alt="Facebook"
                  className="w-5 h-5 object-contain"
                />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-7 h-7 flex items-center justify-center hover:scale-110 transition-transform"
              >
                <img
                  src="/image/Footer%20-%20instagram.png"
                  alt="Instagram"
                  className="w-5 h-5 object-contain"
                />
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noreferrer"
                className="w-7 h-7 flex items-center justify-center hover:scale-110 transition-transform"
              >
                <img
                  src="/image/Footer%20-%20tiktok.png"
                  alt="TikTok"
                  className="w-5 h-5 object-contain"
                />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-7 h-7 flex items-center justify-center hover:scale-110 transition-transform"
              >
                <img
                  src="/image/Footer%20-%20youtube.png"
                  alt="YouTube"
                  className="w-5 h-5 object-contain"
                />
              </a>
            </div>
          </div>
        </div>

        {/* Thin Divider Line */}
        <div className="w-full border-t border-white/20 my-10" />

        {/* Bottom 2 Columns: HA LONG OFFICE & PORT */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 text-xs sm:text-[13px] font-light text-white/90">
          {/* Left: HA LONG OFFICE */}
          <div>
            <h4 className="font-serif-luxury text-[#e0ab72] text-sm uppercase tracking-wider mb-2 font-normal">
              HA LONG OFFICE
            </h4>
            <p className="leading-relaxed mb-1">
              <span className="font-semibold">Address:</span> No.18, Dong Hung Thang
              Urban Area, Bai Chay Ward, Ha Long City, Quang Ninh
            </p>
            <p className="mb-1">
              <span className="font-semibold">Hotline:</span> (+84) 931 869 979
            </p>
            <p>
              <span className="font-semibold">Email:</span> info@calistacruise.com
            </p>
          </div>

          {/* Right: PORT */}
          <div>
            <h4 className="font-serif-luxury text-[#e0ab72] text-sm uppercase tracking-wider mb-2 font-normal">
              PORT
            </h4>
            <p className="leading-relaxed mb-1">
              <span className="font-semibold">Address:</span> No.37, Tuan Chau
              International port, Ha Long city, Quang Ninh
            </p>
            <p className="mb-1">
              <span className="font-semibold">Hotline:</span> (+84) 931 869 979
            </p>
            <p>
              <span className="font-semibold">Email:</span> info@calistacruise.com
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
