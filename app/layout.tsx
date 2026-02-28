import type { Metadata } from "next";
import { Nanum_Myeongjo } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { AuthProvider } from "@/lib/auth-context";

const nanumMyeongjo = Nanum_Myeongjo({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const pretendard = localFont({
  src: [
    { path: "../public/fonts/PretendardVariable.woff2", weight: "100 900" },
  ],
  variable: "--font-sans",
  display: "swap",
  fallback: ["Noto Sans KR", "sans-serif"],
});

export const metadata: Metadata = {
  title: {
    default: "공감터 심리상담연구소",
    template: "%s | 공감터 심리상담연구소",
  },
  description:
    "온라인 화상상담 전문 심리상담연구소. 정선이 상담학 박사가 직접 상담하는 공감터에서 편안하게 전문 심리상담을 받아보세요.",
  keywords: ["심리상담", "심리상담연구소", "심리검사", "가족상담", "부부상담", "아동상담", "공감터"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${nanumMyeongjo.variable} ${pretendard.variable} antialiased`}>
        <AuthProvider>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
