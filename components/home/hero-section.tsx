import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="bg-[#FBF8F3]">
      <div className="max-w-[1200px] mx-auto px-6 py-20 md:py-28">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
          {/* Left: Text content */}
          <div className="flex-1 space-y-6">
            <h1 className="font-heading text-3xl md:text-4xl lg:text-[42px] font-bold leading-tight text-[#3A2E26]">
              마음이 힘들 때,{" "}
              <span className="relative inline-block">
                공감터
                <span
                  className="absolute left-0 -bottom-1 w-full h-[10px] bg-[#D4845A]/25 rounded-sm -z-0"
                  aria-hidden="true"
                />
              </span>
              가{" "}
              <br className="hidden md:block" />
              함께합니다
            </h1>
            <p className="text-base md:text-lg leading-relaxed text-[#8C7B6B] max-w-lg">
              공감터 심리상담연구소는 아동청소년부터 성인, 부부·가족까지
              다양한 심리적·정서적 어려움을 함께 나누고 해결해 나가는
              종합심리상담센터입니다. 전문 상담사가 여러분의 마음 건강을
              따뜻하게 돌봐드립니다.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                href="/reservation/offline"
                className="inline-flex items-center justify-center rounded-xl bg-[#D4845A] px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#C07348] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4845A]/50"
              >
                상담예약하기
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center rounded-xl border border-[#E8DDD0] px-7 py-3.5 text-sm font-semibold text-[#8B6B4E] transition-colors hover:bg-[#F3EDE5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C4A882]/50"
              >
                센터 알아보기
              </Link>
            </div>
          </div>

          {/* Right: Image placeholder */}
          <div className="flex-shrink-0">
            <div className="w-[280px] h-[240px] md:w-[320px] md:h-[280px] rounded-2xl bg-[#E8DDD0] flex items-center justify-center">
              <span className="text-[#8C7B6B] text-sm">대표 이미지</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
