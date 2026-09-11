import Header from "./components/Header";
import HeroBanner from "./components/HeroBanner";
import Section1Intro from "./components/Section1Intro";
import Section2Itinerary from "./components/Section2Itinerary";
import Section3Rooms from "./components/Section3Rooms";
import Section4Reviews from "./components/Section4Reviews";
import Section5Plan from "./components/Section5Plan";
import Section6Moments from "./components/Section6Moments";
import SectionForm from "./components/SectionForm";
import SectionFAQ from "./components/SectionFAQ";
import Footer from "./components/Footer";
import RevealOnScroll from "./components/RevealOnScroll";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-slate-800 flex flex-col w-full selection:bg-amber-100 selection:text-amber-900">
      {/* 1. Header (Menu phụ + Menu chính) */}
      <Header />

      {/* Main Content Area: Default background is 100% white */}
      <main className="flex-1 w-full bg-white">
        {/* 2. Hero Banner (có hiệu ứng entrance text riêng) */}
        <HeroBanner />

        {/* 3. Section 1: Giới thiệu du thuyền Calista & Trải nghiệm */}
        <RevealOnScroll>
          <Section1Intro />
        </RevealOnScroll>

        {/* 4. Section 2: Hải trình du thuyền Vịnh Hạ Long */}
        <RevealOnScroll>
          <Section2Itinerary />
        </RevealOnScroll>

        {/* 5. Section 3: Hệ thống hạng phòng nghỉ trên du thuyền */}
        <RevealOnScroll>
          <Section3Rooms />
        </RevealOnScroll>

        {/* 6. Section 4: Cảm nhận từ quý khách hàng */}
        <RevealOnScroll>
          <Section4Reviews />
        </RevealOnScroll>

        {/* 7. Section 5: Lên kế hoạch cho chuyến du lịch Vịnh Hạ Long */}
        <RevealOnScroll>
          <Section5Plan />
        </RevealOnScroll>

        {/* 8. Section 6: Thư viện cùng chia sẻ khoảnh khắc */}
        <RevealOnScroll>
          <Section6Moments />
        </RevealOnScroll>

        {/* 9. Section Form: Đăng kí nhận thông tin ưu đãi */}
        <RevealOnScroll className="relative z-20">
          <SectionForm />
        </RevealOnScroll>

        {/* 10. Section FAQ: Câu hỏi thường gặp */}
        <RevealOnScroll className="relative z-10">
          <SectionFAQ />
        </RevealOnScroll>
      </main>

      {/* 11. Footer: Chân trang đầy đủ thông tin văn phòng và mạng xã hội */}
      <RevealOnScroll>
        <Footer />
      </RevealOnScroll>
    </div>
  );
}
