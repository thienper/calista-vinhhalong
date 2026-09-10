import type { Metadata } from "next";
import { Playfair_Display, Montserrat } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
});

const montserrat = Montserrat({
  variable: "--font-sans",
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Calista Cruise | Du Thuyền Vịnh Hạ Long",
  description: "Calista Cruise là du thuyền sang trọng 6 sao phục vụ các chuyến tham quan nghỉ đêm trên Vịnh Hạ Long.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="vi"
      className={`${playfair.variable} ${montserrat.variable} min-h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-white text-slate-800 antialiased selection:bg-amber-100 selection:text-amber-900">
        {children}
      </body>
    </html>
  );
}
