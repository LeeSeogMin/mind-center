import Link from "next/link";

export default function AboutSection() {
  return (
    <section className="bg-[#FBF8F3] py-20 md:py-24">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
          {/* Left: Text content */}
          <div className="flex-1 space-y-5">
            <p className="text-sm font-semibold text-[#D4845A] tracking-wide">
              센터 소개
            </p>
            <h2 className="font-heading text-2xl md:text-3xl font-bold leading-snug text-[#3A2E26]">
              정선이 박사의
              <br />
              온라인 심리상담연구소, 공감터
            </h2>
            <p className="text-[#8C7B6B] leading-relaxed max-w-lg">
              공감터 심리상담연구소는 &lsquo;공감&rsquo;을 바탕으로 내담자의
              마음에 진심으로 다가가는 온라인 화상상담 전문 심리상담연구소입니다.
              상담학 박사 정선이 원장이 직접 아동·청소년, 성인, 부부·가족,
              직장인 등 다양한 대상의 심리적 어려움을 체계적으로 상담합니다.
            </p>
            <p className="text-[#8C7B6B] leading-relaxed max-w-lg">
              과학적이고 검증된 상담 기법을 통해 내담자 한 분 한 분에게 맞는
              맞춤형 상담을 제공하며, 따뜻한 공감과 전문적인 지지로 마음의
              회복과 성장을 돕겠습니다.
            </p>
            <div className="pt-2">
              <Link
                href="/about"
                className="inline-flex items-center justify-center rounded-xl border border-[#E8DDD0] px-6 py-3 text-sm font-semibold text-[#8B6B4E] transition-colors hover:bg-[#F3EDE5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C4A882]/50"
              >
                자세히 보기
              </Link>
            </div>
          </div>

          {/* Right: Image placeholder */}
          <div className="flex-shrink-0">
            <div className="w-[280px] h-[320px] md:w-[360px] md:h-[400px] rounded-2xl bg-[#E8DDD0] flex items-center justify-center">
              <span className="text-[#8C7B6B] text-sm">원장 사진</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
