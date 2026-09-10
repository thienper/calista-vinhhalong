"use client";

import React, { useState } from "react";
import { Star, ArrowLeft, ArrowRight } from "lucide-react";

interface FeedbackItem {
  id: number;
  image: string;
  author: string;
  date?: string;
  title: string;
  content: string;
}

const feedbacks: FeedbackItem[] = [
  {
    id: 1,
    image: "/image/Home%20-%20s4%20-%20%E1%BA%A3nh%20feedback%201.jpg",
    author: "MS. ANNA – 12/02/2025",
    title: "TRẢI NGHIỆM TUYỆT VỜI CÙNG GIA ĐÌNH",
    content:
      "Chuyến đi vượt xa mong đợi của chúng tôi. Cảnh quan vịnh tuyệt đẹp khi ngắm từ ban công phòng, hải sản tươi sống và nhân viên phục vụ cực kỳ tận tâm.",
  },
  {
    id: 2,
    image: "/image/Home%20-%20s4%20-%20%E1%BA%A3nh%20feedback%202.jpg",
    author: "MR. DAVID – 28/02/2025",
    title: "DU THUYỀN SANG TRỌNG ĐẲNG CẤP",
    content:
      "Tàu rất mới và hiện đại. Phòng ốc sạch sẽ, tiện nghi 6 sao chuẩn quốc tế. Nhất định sẽ quay lại cùng bạn bè vào dịp hè tới!",
  },
  {
    id: 3,
    image: "/image/Home%20-%20s4%20-%20%E1%BA%A3nh%20feedback%203.jpg",
    author: "MRS. LINDA – 05/03/2025",
    title: "KỲ NGHỈ ĐÁNG NHỚ NHẤT NĂM",
    content:
      "Không gian nghỉ dưỡng yên bình, bồn sục jacuzzi trên sundeck ngắm hoàng hôn vịnh Hạ Long là khoảnh khắc kỳ diệu không thể quên.",
  },
  {
    id: 4,
    image: "/image/Home%20-%20s4%20-%20%E1%BA%A3nh%20feedback%204.jpg",
    author: "MR. MICHAEL – 10/03/2025",
    title: "ẨM THỰC TINH HOA VÀ DỊCH VỤ CHU ĐÁO",
    content:
      "Thực đơn đa dạng, các món ăn được chế biến công phu và trang trí bắt mắt. Đội ngũ hướng dẫn viên nhiệt tình, vui tính.",
  },
  {
    id: 5,
    image: "/image/Home%20-%20s4%20-%20%E1%BA%A3nh%20feedback%205.jpg",
    author: "MS. MAI ANH – 16/03/2025",
    title: "SỰ LỰA CHỌN HOÀN HẢO CHO KỶ NIỆM NGÀY CƯỚI",
    content:
      "Bữa tối lãng mạn dưới ánh nến và phòng trang trí hoa hồng rất ngọt ngào. Cảm ơn Calista Cruise đã mang lại kỷ niệm tuyệt đẹp.",
  },
  {
    id: 6,
    image:
      "/image/Home%20-%20s4%20-%20%E1%BA%A3nh%20feedback%206%20(%E1%BA%A3nh%20m%E1%BA%B7c%20%C4%91%E1%BB%8Bnh%20%C4%91ang%20%C4%91%C6%B0%E1%BB%A3c%20ch%E1%BB%8Dn).jpg",
    author: "MR. TONY – 21/03/2025",
    title: "CHUYẾN ĐI RẤT VUI VÀ ĐÁNG NHỚ",
    content:
      "Du thuyền đẹp, phòng sạch sẽ, nhân viên nhiệt tình và đồ ăn khá ngon. Mọi thứ đều được chuẩn bị chu đáo, gia đình tôi đã có một khoảng thời gian rất thoải mái.",
  },
  {
    id: 7,
    image: "/image/Home%20-%20s4%20-%20%E1%BA%A3nh%20feedback%207.jpg",
    author: "MR. ROBERT – 25/03/2025",
    title: "HOẠT ĐỘNG CHÈO THUYỀN VÀ KHÁM PHÁ HANG ĐỘNG",
    content:
      "Các hoạt động ngoài trời như chèo thuyền kayak và thăm hang Luồn rất thú vị. Cảm giác hoà mình vào thiên nhiên thật sảng khoái.",
  },
  {
    id: 8,
    image: "/image/Home%20-%20s4%20-%20%E1%BA%A3nh%20feedback%208.jpg",
    author: "MS. EMILY – 02/04/2025",
    title: "CHECK-IN SỐNG ẢO MỌI GÓC CỦA TÀU",
    content:
      "Du thuyền thiết kế quá đẹp, chụp góc nào cũng có ảnh lung linh. Dịch vụ spa thư giãn và sân tập golf mini rất thú vị.",
  },
  {
    id: 9,
    image: "/image/Home%20-%20s4%20-%20%E1%BA%A3nh%20feedback%209.jpg",
    author: "MR. JOHN – 15/04/2025",
    title: "ĐÁNH GIÁ 5 SAO CHO CALISTA",
    content:
      "Hải trình hợp lý, không bị vội vã. Tàu chạy êm và không bị say sóng. Chắc chắn tôi sẽ giới thiệu cho đồng nghiệp và người thân.",
  },
];

export default function Section4Reviews() {
  const [selectedIdx, setSelectedIdx] = useState(5); // Default index 5 (item 6)
  const galleryContainerRef = React.useRef<HTMLDivElement>(null);
  const galleryItemRefs = React.useRef<(HTMLDivElement | null)[]>([]);
  const isProgrammaticScroll = React.useRef(false);

  // Smooth scroll target photo to the center of container ONLY (never moving the window scroll)
  const scrollToFeedback = (index: number, smooth = true) => {
    const container = galleryContainerRef.current;
    const el = galleryItemRefs.current[index];
    if (container && el) {
      isProgrammaticScroll.current = true;
      const containerWidth = container.clientWidth;
      const elLeft = el.offsetLeft;
      const elWidth = el.clientWidth;
      const targetScrollLeft = elLeft - containerWidth / 2 + elWidth / 2;
      container.scrollTo({
        left: targetScrollLeft,
        behavior: smooth ? "smooth" : "auto",
      });
      setTimeout(() => {
        isProgrammaticScroll.current = false;
      }, 500);
    }
  };

  // Center the active photo on initial mount on mobile ONLY (never touching window scroll)
  React.useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      const timer = setTimeout(() => {
        scrollToFeedback(5, false);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, []);

  const handlePrev = () => {
    const target = selectedIdx > 0 ? selectedIdx - 1 : feedbacks.length - 1;
    setSelectedIdx(target);
    scrollToFeedback(target);
  };

  const handleNext = () => {
    const target = selectedIdx < feedbacks.length - 1 ? selectedIdx + 1 : 0;
    setSelectedIdx(target);
    scrollToFeedback(target);
  };

  // Auto-detect which photo is in the center of the viewport during horizontal scroll
  const handleGalleryScroll = () => {
    if (isProgrammaticScroll.current) return;
    const container = galleryContainerRef.current;
    if (!container) return;

    const containerRect = container.getBoundingClientRect();
    const containerCenter = containerRect.left + containerRect.width / 2;

    let closestIdx = selectedIdx;
    let minDistance = Infinity;

    galleryItemRefs.current.forEach((el, idx) => {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const itemCenter = rect.left + rect.width / 2;
      const distance = Math.abs(containerCenter - itemCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closestIdx = idx;
      }
    });

    if (closestIdx !== selectedIdx) {
      setSelectedIdx(closestIdx);
    }
  };

  // Touch gesture handling for mobile swipe on reviews quote
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

  const currentFeedback = feedbacks[selectedIdx];

  return (
    <section className="w-full bg-white py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Header */}
        <div className="mb-12 text-left">
          <span className="text-[16px] font-semibold tracking-[0.25em] text-slate-800 uppercase mb-2 block">
            CẢM NHẬN
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-[48px] leading-tight font-normal heading-gradient">
            TỪ QUÝ KHÁCH HÀNG
          </h2>
        </div>

        {/* Top Content Row: Rating summary (Left) & Testimonial quote (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-16">
          {/* Left: Rating Box */}
          <div className="lg:col-span-6 flex flex-col sm:flex-row items-center sm:items-start gap-8">
            <div className="flex flex-col items-center sm:items-start">
              <span className="text-6xl sm:text-7xl font-light text-slate-900 leading-none">
                4.87
              </span>

              {/* 5 Stars */}
              <div className="flex items-center gap-1 my-2.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className="w-5 h-5 fill-[#dfa968] text-[#dfa968]"
                  />
                ))}
              </div>

              <span className="text-xs sm:text-[13px] italic text-slate-500">
                Tổng 23.652 review từ khách hàng
              </span>
            </div>

            {/* Rating distribution breakdown bars */}
            <div className="flex flex-col gap-2 w-full max-w-[240px] pt-1">
              {/* 5 star */}
              <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                <span className="w-4">5★</span>
                <div className="flex-1 h-3.5 bg-slate-100 rounded-xs overflow-hidden">
                  <div className="h-full bg-[#8db642] w-[88%]" />
                </div>
              </div>

              {/* 4 star */}
              <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                <span className="w-4">4★</span>
                <div className="flex-1 h-3.5 bg-slate-100 rounded-xs overflow-hidden">
                  <div className="h-full bg-[#a6ce39] w-[35%]" />
                </div>
              </div>

              {/* 3 star */}
              <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                <span className="w-4">3★</span>
                <div className="flex-1 h-3.5 bg-slate-100 rounded-xs overflow-hidden">
                  <div className="h-full bg-[#f7c631] w-[14%]" />
                </div>
              </div>

              {/* 2 star */}
              <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                <span className="w-4">2★</span>
                <div className="flex-1 h-3.5 bg-slate-100 rounded-xs overflow-hidden">
                  <div className="h-full bg-[#f39223] w-[8%]" />
                </div>
              </div>

              {/* 1 star */}
              <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                <span className="w-4">1★</span>
                <div className="flex-1 h-3.5 bg-slate-100 rounded-xs overflow-hidden">
                  <div className="h-full bg-[#f05a28] w-[4%]" />
                </div>
              </div>
            </div>
          </div>

          {/* Right: Featured Quote with Touch Swipe */}
          <div
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className="lg:col-span-6 flex items-start gap-4 touch-pan-y"
          >
            {/* Big Navy Quote Mark */}
            <span className="text-6xl sm:text-7xl font-serif text-[#163b65] leading-none select-none shrink-0">
              “
            </span>

            <div className="flex-1 pt-2 flex flex-col justify-between min-h-[160px] sm:min-h-[140px]">
              <div>
                <h3 className="font-bold text-sm sm:text-base text-slate-900 tracking-wider uppercase mb-2 min-h-[22px] transition-opacity duration-300">
                  {currentFeedback.title}
                </h3>

                <p className="text-xs sm:text-sm italic text-slate-600 leading-relaxed mb-4 min-h-[64px] sm:min-h-[56px] transition-opacity duration-300">
                  {currentFeedback.content}
                </p>
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="font-bold text-xs sm:text-[13px] text-slate-900 uppercase tracking-wide">
                  {currentFeedback.author}
                </span>

                {/* Slider nav track */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrev}
                    aria-label="Previous Review"
                    className="p-1 text-slate-700 hover:text-[#dfa968] cursor-pointer transition-colors"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                  </button>

                  <div className="w-16 h-[2px] bg-slate-300 relative">
                    <div
                      className="absolute top-1/2 -translate-y-1/2 h-[4px] bg-[#163b65] rounded-full transition-all duration-300 ease-out"
                      style={{
                        width: "25%",
                        left: `${(selectedIdx / (feedbacks.length - 1)) * 75}%`,
                      }}
                    />
                  </div>

                  <button
                    onClick={handleNext}
                    aria-label="Next Review"
                    className="p-1 text-slate-700 hover:text-[#dfa968] cursor-pointer transition-colors"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row: 9 Photos Gallery with Auto-Center Detection on Mobile */}
        <div
          ref={galleryContainerRef}
          onScroll={handleGalleryScroll}
          className="w-full overflow-x-auto no-scrollbar py-2 h-[290px] flex items-end scroll-smooth snap-x snap-proximity px-[28vw] sm:px-[15vw] md:px-0"
          style={{ WebkitOverflowScrolling: "touch", touchAction: "pan-y pan-x" }}
        >
          <div className="flex items-end justify-start md:justify-between gap-3 min-w-max md:min-w-[980px] w-full h-[270px]">
            {feedbacks.map((item, idx) => {
              const isActive = idx === selectedIdx;
              return (
                <div
                  key={item.id}
                  ref={(el) => {
                    galleryItemRefs.current[idx] = el;
                  }}
                  onClick={() => {
                    setSelectedIdx(idx);
                    scrollToFeedback(idx);
                  }}
                  className={`relative w-36 sm:w-44 md:w-auto md:flex-1 shrink-0 md:shrink rounded-xs overflow-hidden cursor-pointer transform-gpu transition-all duration-500 ease-out snap-center ${
                    isActive
                      ? "h-[260px] ring-2 ring-[#163b65] shadow-xl scale-105 z-10 opacity-100"
                      : "h-[190px] opacity-65 hover:opacity-90 hover:scale-[1.02]"
                  }`}
                >
                  <img
                    src={item.image}
                    alt={`Feedback ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                  {!isActive && (
                    <div className="absolute inset-0 bg-black/35 hover:bg-black/15 transition-colors" />
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
