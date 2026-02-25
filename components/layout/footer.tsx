import Link from "next/link";
import { SITE_NAME, COUNSELOR_NAME, COUNSELOR_TITLE } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-[#3A2E26] text-[#C4A882]">
      <div className="max-w-[1200px] mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* 센터 정보 */}
          <div>
            <h3 className="font-heading text-xl font-bold text-white mb-4">{SITE_NAME}</h3>
            <p className="text-sm leading-relaxed">
              {COUNSELOR_NAME} {COUNSELOR_TITLE}<br />
              서울특별시 OO구 OO로 123, 4층<br />
              전화: 02-1234-5678<br />
              이메일: contact@gongamteo.kr
            </p>
          </div>

          {/* 바로가기 */}
          <div>
            <h4 className="font-bold text-white mb-4">바로가기</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <Link href="/about" className="hover:text-white transition-colors">센터소개</Link>
              <Link href="/counseling" className="hover:text-white transition-colors">상담안내</Link>
              <Link href="/test" className="hover:text-white transition-colors">심리검사</Link>
              <Link href="/reservation/offline" className="hover:text-white transition-colors">상담예약</Link>
              <Link href="/mindtalk" className="hover:text-white transition-colors">마음톡</Link>
              <Link href="/board/notice" className="hover:text-white transition-colors">게시판</Link>
            </div>
          </div>

          {/* 상담 시간 */}
          <div>
            <h4 className="font-bold text-white mb-4">상담 시간</h4>
            <div className="text-sm space-y-1">
              <p>평일: 09:00 ~ 21:00</p>
              <p>토요일: 10:00 ~ 18:00</p>
              <p>일요일·공휴일: 휴무</p>
              <p className="mt-3 text-[#D4845A]">상담 예약제로 운영됩니다</p>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-[#4A3E36] flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
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
