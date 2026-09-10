"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lang, setLang] = useState<"EN" | "VI">("VI");
  const [isScrolled, setIsScrolled] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`w-full sticky top-0 z-50 bg-white transition-all duration-300 ${
        isScrolled ? "shadow-md" : "shadow-xs"
      }`}
    >
      {/* 1. Menu phụ (Top Bar) */}
      <div className="w-full bg-[#163b65] text-white text-[13px] py-1.5 px-4 sm:px-6 xl:px-0">
        <div className="max-w-[1200px] mx-auto flex justify-end items-center gap-6">
          {/* Phone */}
          <a
            href="tel:+84938319979"
            className="flex items-center gap-2 text-white/90 hover:text-white transition-colors"
          >
            <img
              src="/image/Menu%20ph%E1%BB%A5%20-%20phone.png"
              alt="Phone"
              className="w-3.5 h-3.5 object-contain"
            />
            <span className="font-normal">(+84) 938 319 979</span>
          </a>

          {/* Links */}
          <Link
            href="#lien-he"
            className="text-white/90 hover:text-white transition-colors hidden sm:inline"
          >
            Liên hệ
          </Link>
          <Link
            href="#thu-vien"
            className="text-white/90 hover:text-white transition-colors hidden sm:inline"
          >
            Thư viện
          </Link>

          {/* Language Switcher */}
          <div className="flex items-center gap-2 pl-2 border-l border-white/30 text-xs">
            <button
              onClick={() => setLang("EN")}
              className={`transition-colors cursor-pointer ${
                lang === "EN" ? "font-bold text-white" : "text-white/60 hover:text-white"
              }`}
            >
              EN
            </button>
            <span className="text-white/40">|</span>
            <button
              onClick={() => setLang("VI")}
              className={`transition-colors cursor-pointer ${
                lang === "VI" ? "font-bold text-white" : "text-white/60 hover:text-white"
              }`}
            >
              VI
            </button>
          </div>
        </div>
      </div>

      {/* 2. Menu chính (Main Navigation) */}
      <div className="w-full bg-white border-b border-slate-100">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 xl:px-0 h-[66px] flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex items-center cursor-pointer transition-transform duration-200 active:scale-95"
            title="Về đầu trang"
          >
            <img
              src="/image/logo-calista.png"
              alt="Calista Halong Bay Cruise"
              className="h-[50px] w-auto object-contain"
            />
          </Link>

          {/* Navigation Links - Desktop */}
          <nav className="hidden lg:flex items-center gap-7 text-[13px] font-medium tracking-wide text-[#163b65]">
            <Link
              href="#ve-chung-toi"
              className="hover:text-[#dfa968] transition-colors uppercase"
            >
              VỀ CHÚNG TÔI
            </Link>

            <div className="relative group flex items-center gap-1 cursor-pointer hover:text-[#dfa968] transition-colors uppercase">
              <span>HẢI TRÌNH</span>
              <ChevronDown className="w-3.5 h-3.5 text-[#163b65] group-hover:text-[#dfa968] transition-colors" />
              <div className="absolute top-full left-0 hidden group-hover:block bg-white shadow-lg rounded-md py-2 px-4 w-48 border border-slate-100 z-50">
                <Link href="#hai-trinh" className="block py-1.5 text-xs text-slate-700 hover:text-[#dfa968]">
                  Hải trình 2 Ngày 1 Đêm
                </Link>
                <Link href="#hai-trinh" className="block py-1.5 text-xs text-slate-700 hover:text-[#dfa968]">
                  Hải trình 3 Ngày 2 Đêm
                </Link>
                <Link href="#hai-trinh" className="block py-1.5 text-xs text-slate-700 hover:text-[#dfa968]">
                  Hải trình Speedboat
                </Link>
              </div>
            </div>

            <div className="relative group flex items-center gap-1 cursor-pointer hover:text-[#dfa968] transition-colors uppercase">
              <span>CABIN</span>
              <ChevronDown className="w-3.5 h-3.5 text-[#163b65] group-hover:text-[#dfa968] transition-colors" />
              <div className="absolute top-full left-0 hidden group-hover:block bg-white shadow-lg rounded-md py-2 px-4 w-48 border border-slate-100 z-50">
                <Link href="#hang-phong" className="block py-1.5 text-xs text-slate-700 hover:text-[#dfa968]">
                  Calista President
                </Link>
                <Link href="#hang-phong" className="block py-1.5 text-xs text-slate-700 hover:text-[#dfa968]">
                  Calista Bay
                </Link>
                <Link href="#hang-phong" className="block py-1.5 text-xs text-slate-700 hover:text-[#dfa968]">
                  Calista Majesty
                </Link>
              </div>
            </div>

            <Link
              href="#diem-den"
              className="hover:text-[#dfa968] transition-colors uppercase"
            >
              ĐIỂM ĐẾN
            </Link>

            <Link
              href="#cam-nang"
              className="hover:text-[#dfa968] transition-colors uppercase"
            >
              CẨM NANG
            </Link>

            <Link
              href="#uu-dai"
              className="hover:text-[#dfa968] transition-colors uppercase"
            >
              ƯU ĐÃI
            </Link>
          </nav>

          {/* Action Button: ĐẶT NGAY */}
          <div className="hidden lg:flex items-center">
            <button
              onClick={() => {
                const el = document.getElementById("form-uu-dai");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="btn-gold h-[34px] w-[125px] flex items-center justify-center rounded-[4px] text-[13px] font-semibold tracking-wider uppercase transition-all duration-200 cursor-pointer shadow-xs"
            >
              ĐẶT NGAY
            </button>
          </div>

          {/* Mobile menu toggle button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#163b65] hover:text-[#dfa968]"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-slate-100 px-6 py-4 space-y-3 shadow-xl">
            <Link
              href="#ve-chung-toi"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-medium text-[#163b65] uppercase hover:text-[#dfa968]"
            >
              VỀ CHÚNG TÔI
            </Link>
            <Link
              href="#hai-trinh"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-medium text-[#163b65] uppercase hover:text-[#dfa968]"
            >
              HẢI TRÌNH
            </Link>
            <Link
              href="#hang-phong"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-medium text-[#163b65] uppercase hover:text-[#dfa968]"
            >
              CABIN
            </Link>
            <Link
              href="#diem-den"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-medium text-[#163b65] uppercase hover:text-[#dfa968]"
            >
              ĐIỂM ĐẾN
            </Link>
            <Link
              href="#cam-nang"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-medium text-[#163b65] uppercase hover:text-[#dfa968]"
            >
              CẨM NANG
            </Link>
            <Link
              href="#uu-dai"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-medium text-[#163b65] uppercase hover:text-[#dfa968]"
            >
              ƯU ĐÃI
            </Link>
            <div className="pt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  const el = document.getElementById("form-uu-dai");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="btn-gold w-full py-3 rounded-lg text-xs font-semibold tracking-wider uppercase text-center"
              >
                ĐẶT NGAY
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
