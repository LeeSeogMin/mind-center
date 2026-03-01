import Link from "next/link";

export default function AboutSection() {
  return (
    <section className="bg-[#FBF8F3] py-20 md:py-24">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex flex-col md:flex-row items-stretch gap-12 md:gap-16">
          {/* Left: Text content */}
          <div className="flex-1 space-y-5">
            <p className="text-sm font-semibold text-[#2C3E6B] tracking-wide">
              연구소 소개
            </p>
            <h2 className="font-heading text-2xl md:text-3xl font-bold leading-snug text-[#1E3A26]">
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
                className="inline-flex items-center justify-center rounded-xl border border-[#C8D6E5] px-6 py-3 text-sm font-semibold text-[#2C3E6B] transition-colors hover:bg-[#F3EDE5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2C3E6B]/30"
              >
                자세히 보기
              </Link>
            </div>
          </div>

          {/* Right: 공감터 소개 */}
          <div className="w-full md:w-[420px] flex-shrink-0">
            <div className="h-full rounded-2xl bg-[#E8F0E8] p-8 md:p-10 flex flex-col justify-center space-y-6">
              <h3 className="font-heading text-3xl md:text-4xl font-bold text-[#2A5FAA]">
                공감터
              </h3>
              <div className="space-y-5 text-[#1E3A26] leading-relaxed">
                <p className="flex items-start gap-2.5 text-[15px] md:text-base">
                  <span className="mt-2 w-2 h-2 rounded-full bg-[#2C3E6B] flex-shrink-0" />
                  <span>
                    <span className="text-[#2A5FAA] font-bold text-base md:text-lg">공감터</span>는
                    임상경험이 풍부한 전문가들이 과학적 근거를 바탕으로
                    당신의 심리적 성장을 돕습니다.
                  </span>
                </p>
                <p className="flex items-start gap-2.5 text-[15px] md:text-base">
                  <span className="mt-2 w-2 h-2 rounded-full bg-[#2C3E6B] flex-shrink-0" />
                  <span>
                    <span className="text-[#2A5FAA] font-bold text-base md:text-lg">공감터</span>는
                    내면의 상처를 치유하고 본연의 빛을 되찾을 수 있도록
                    변화의 여정에 든든한 페이스메이커가 되어드립니다.
                  </span>
                </p>
                <p className="flex items-start gap-2.5 text-[15px] md:text-base">
                  <span className="mt-2 w-2 h-2 rounded-full bg-[#2C3E6B] flex-shrink-0" />
                  <span>
                    <span className="text-[#2A5FAA] font-bold text-base md:text-lg">공감터</span>는
                    누구에게도 말하지 못했던 고민,
                    따뜻한 경청과 공감으로 함께 하겠습니다.
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
