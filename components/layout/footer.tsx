import Link from "next/link";
import { SITE_NAME } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-[#1E3A26] text-[#8CC4A0]">
      <div className="max-w-[800px] mx-auto px-6 py-12">
        <div className="flex flex-col items-center text-center gap-2">
          <h3 className="text-2xl font-bold">
            <span className="font-heading" style={{ color: '#8CC4A0' }}>공감</span>
            <span style={{ fontFamily: "'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif", fontSize: '1.65rem', color: '#D4B878', fontWeight: 600 }}>터</span>
            {' '}
            <span style={{ fontFamily: "'DOSSaemmul', sans-serif", fontSize: '1.1rem', color: '#C8B8A0' }}>심리상담연구소</span>
          </h3>
          <p className="text-sm">이메일: iillac@naver.com</p>
        </div>

        <div className="mt-3 pt-2 border-t border-[#2D5A3D] flex flex-col md:flex-row justify-between items-center gap-2 text-xs">
          <p>&copy; {new Date().getFullYear()} {SITE_NAME}. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-white">개인정보처리방침</Link>
            <Link href="#" className="hover:text-white">이용약관</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
