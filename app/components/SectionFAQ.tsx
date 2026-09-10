"use client";

import React, { useState } from "react";
import { PlusCircle, MinusCircle } from "lucide-react";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    id: 1,
    question: "Calista Cruise có phải là du thuyền 6 sao trên Vịnh Hạ Long không?",
    answer:
      "Calista đạt tiêu chuẩn du thuyền 6 sao với các chuyến hải trình nghỉ đêm sang trọng trên Vịnh Hạ Long. Các phòng nghỉ đều có ban công riêng, bồn tắm tách biệt, dịch vụ ăn uống trên tàu, hồ bơi ngoài trời.",
  },
  {
    id: 2,
    question: "Giá tour du thuyền bao gồm những gì?",
    answer:
      "Giá tour đã bao gồm trọn gói: các bữa ăn hải sản cao cấp theo lịch trình, phòng nghỉ sang trọng đầy đủ tiện nghi với ban công riêng, vé thắng cảnh tham quan các điểm, hoạt động chèo kayak/thuyền nan, bể sục jacuzzi, cùng bảo hiểm du lịch.",
  },
  {
    id: 3,
    question: "Tôi nên chọn lịch trình nào của Calista Cruise?",
    answer:
      "Nếu bạn có quỹ thời gian ngắn, lịch trình 2 Ngày 1 Đêm là lựa chọn hoàn hảo. Nếu bạn muốn tận hưởng trọn vẹn sự thư giãn và khám phá sâu hơn cả Vịnh Bái Tử Long hoang sơ, hãy chọn lịch trình 3 Ngày 2 Đêm.",
  },
  {
    id: 4,
    question: "Phòng nghỉ trên Calista Cruise có ban công riêng không?",
    answer:
      "100% tất cả các hạng phòng trên du thuyền Calista đều có ban công riêng view ngắm trọn cảnh vịnh và cửa sổ kính panorama lớn chạm sàn.",
  },
  {
    id: 5,
    question: "Phòng nghỉ có trang bị bồn tắm không?",
    answer:
      "Tất cả các phòng đều được trang bị bồn tắm nằm cao cấp hướng thẳng ra vịnh biển và khu vực tắm đứng riêng biệt.",
  },
  {
    id: 6,
    question: "Calista có cung cấp dịch vụ đưa đón từ Hà Nội không?",
    answer:
      "Calista cung cấp xe limousine đưa đón 2 chiều cao cấp Hà Nội – Hạ Long đón trả tận nơi tại khu vực phố cổ hoặc trung tâm thành phố.",
  },
];

export default function SectionFAQ() {
  const [openId, setOpenId] = useState<number | null>(1); // First question open by default as in FAQ.png

  const toggleFAQ = (id: number) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="w-full bg-white py-20 lg:py-28">
      <div className="max-w-4xl mx-auto px-4 sm:px-8">
        {/* Title */}
        <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-[48px] text-center uppercase tracking-wider text-[#163b65] font-normal mb-14">
          CÂU HỎI THƯỜNG GẶP
        </h2>

        {/* FAQ List */}
        <div className="flex flex-col space-y-5">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="border-b border-slate-300 pb-5 transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full flex items-center justify-between text-left gap-4 cursor-pointer group"
                >
                  <span className="font-semibold text-sm sm:text-[16px] text-[#163b65] group-hover:text-[#dfa968] transition-colors leading-snug">
                    {faq.question}
                  </span>
                  <span className="text-[#163b65] group-hover:text-[#dfa968] transition-colors shrink-0">
                    {isOpen ? (
                      <MinusCircle className="w-5 h-5 stroke-[1.5]" />
                    ) : (
                      <PlusCircle className="w-5 h-5 stroke-[1.5]" />
                    )}
                  </span>
                </button>

                {/* Answer Accordion */}
                <div
                  className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-40 opacity-100 mt-3" : "max-h-0 opacity-0"
                    }`}
                >
                  <p className="text-slate-600 text-sm sm:text-[16px] leading-relaxed font-light pr-8">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
