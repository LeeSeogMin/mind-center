import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="bg-[#F0FAF3]">
      <div className="max-w-[1200px] mx-auto px-6 py-20 md:py-28">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
          {/* Left: Text content */}
          <div className="flex-1 space-y-6">
            <h1 className="font-heading text-3xl md:text-4xl lg:text-[42px] font-bold leading-tight text-[#1E3A26]">
              마음이 힘들 때,{" "}
              <span className="relative inline-block">
                공감터
                <span
                  className="absolute left-0 -bottom-1 w-full h-[10px] bg-[#4A85D4]/25 rounded-sm -z-0"
                  aria-hidden="true"
                />
              </span>
              가 함께합니다
            </h1>
            <p className="text-base md:text-lg leading-relaxed text-[#6B8C7B] max-w-lg">
              공감터 심리상담연구소는 상담학 박사가 운영하는 전문 심리상담기관입니다.
              아동·청소년부터 성인, 부부·가족까지 생애 전반의 심리적·정서적 어려움에
              근거 기반 상담을 통해 실질적인 변화를 함께 만들어갑니다.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                href="/reservation/offline"
                className="inline-flex items-center justify-center rounded-xl bg-[#4A85D4] px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#C07348] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4A85D4]/50"
              >
                상담예약하기
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center rounded-xl border border-[#D0E8D8] px-7 py-3.5 text-sm font-semibold text-[#4A8C5E] transition-colors hover:bg-[#F3EDE5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8CC4A0]/50"
              >
                연구소 알아보기
              </Link>
            </div>
          </div>

          {/* Right: Image placeholder */}
          <div className="flex-shrink-0">
            <div className="w-[280px] h-[240px] md:w-[320px] md:h-[280px] rounded-2xl bg-[#D0E8D8] flex items-center justify-center">
              <span className="text-[#6B8C7B] text-sm">대표 이미지</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
