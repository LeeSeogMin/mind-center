import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { COUNSELOR_NAME, SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: "연구소 소개",
};

export default function AboutPage() {
  return (
    <div className="bg-[#F0FAF3]">
      {/* 페이지 헤더 */}
      <section className="bg-[#2D5A3D] border-b border-[#D0E8D8]">
        <div className="max-w-[1200px] mx-auto px-6 py-12 text-center">
          <h1 className="font-heading text-4xl font-bold text-white">연구소 소개</h1>
        </div>
      </section>

      {/* 연구소 철학 */}
      <section className="bg-white border-y border-[#D0E8D8]">
        <div className="max-w-[1200px] mx-auto px-6 py-6">
          <h2 className="font-heading text-3xl font-bold text-[#2A5FAA] text-center mb-2">
            공감터의 철학
          </h2>
          <p className="text-[#6B8C7B] text-center mb-6 max-w-xl mx-auto text-lg">
            {SITE_NAME}가 소중히 여기는 가치입니다
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "무조건적 존중",
                description:
                  "어떤 모습의 당신이라도 비난받지 않고 온전히 수용되는 안전한 공간을 지향합니다.",
              },
              {
                title: "공감적 이해",
                description:
                  "당신의 언어뿐 아니라 그 이면에 숨겨진 마음의 소리까지 귀 기울여 깊이 이해하고자 노력합니다.",
              },
              {
                title: "전문성과 진정성",
                description:
                  "과학적 근거를 기반으로 한 전문 지식에 사람을 향한 진심을 더해 최선의 치유 경로를 제시합니다.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-[#E8EDF5] rounded-2xl border border-[#2C3E6B] p-8 text-center"
              >
                <h3 className="font-heading text-xl font-bold text-[#1E3A26] mb-4">
                  {item.title}
                </h3>
                <p className="text-[#6B8C7B] leading-relaxed text-base" style={{ wordBreak: "keep-all" }}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 메인 콘텐츠 */}
      <section className="max-w-[1200px] mx-auto px-6 py-20">
        <div className="flex flex-col md:flex-row items-stretch gap-12 md:gap-16">
          {/* Left: Text content */}
          <div className="flex-1 space-y-8">
            <h2 className="font-heading text-2xl md:text-3xl font-bold leading-snug text-[#2A5FAA]">
              공감터의 4대 핵심 강점
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-[#1E3A26] mb-2">
                  1. 일회성을 넘어선 책임감, 차별화된 &lsquo;추수상담&rsquo; 시스템
                </h3>
                <p className="text-[#6B8C7B] leading-relaxed">
                  상담의 종결은 끝이 아닌 새로운 일상의 시작입니다. 공감터는 상담 효과가 삶에 안정적으로 안착했는지 확인하는 <strong className="text-[#1E3A26]">추수상담(Follow-up)</strong>을 진행합니다. 변화가 일시적인 경험에 그치지 않고 지속가능한 삶의 양식으로 자리 잡을 수 있도록 끝까지 책임지고 동행합니다.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-[#1E3A26] mb-2">
                  2. 객관적 지표에 근거한 &lsquo;과학적 심리 진단&rsquo;
                </h3>
                <p className="text-[#6B8C7B] leading-relaxed">
                  상담사의 주관적 판단을 넘어, 검증된 <strong className="text-[#1E3A26]">심리검사</strong>를 통해 내담자의 상태를 정밀하게 분석합니다. 데이터에 기반한 객관적인 진단은 상담의 효율성을 극대화하며, 내담자가 자신의 내면 구조를 선명하게 이해하고 수용할 수 있는 명확한 지표를 제공합니다.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-[#1E3A26] mb-2">
                  3. 개인부터 조직까지, &lsquo;생애주기별 맞춤형 프로그램&rsquo;
                </h3>
                <p className="text-[#6B8C7B] leading-relaxed">
                  개인 상담을 비롯해 <strong className="text-[#1E3A26]">부모교육, 집단 프로그램, 기업상담</strong>까지 폭넓은 케어 스펙트럼을 갖추고 있습니다. 개인이 마주하는 다양한 사회적 관계와 생애주기별 과업에 맞춘 통합적 솔루션을 통해, 가정과 조직 안에서 건강한 성장을 이룰 수 있도록 돕습니다.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-[#1E3A26] mb-2">
                  4. 학술적 성취를 위한 전문 파트너, &lsquo;논문 컨설팅 &amp; 코칭&rsquo;
                </h3>
                <p className="text-[#6B8C7B] leading-relaxed">
                  임상 현장의 전문성을 학술적 역량으로 연결합니다. 양적 연구를 위한 통계 교육 및 분석, 심층적인 질적 연구 지도, 논문 특강 및 개별 코칭을 아우르는 체계적인 커리큘럼을 제공합니다. 연구자가 학문적 성과를 완성하고 전문가로 거듭날 수 있도록 실무적인 가이드를 제시합니다.
                </p>
              </div>
            </div>
          </div>

          {/* Right: 공감터 소개 */}
          <div className="w-full md:w-[420px] flex-shrink-0">
            <div className="h-full rounded-2xl bg-[#E8F0E8] overflow-hidden flex flex-col border border-[#2C3E6B]">
              <div className="relative w-full h-[200px]">
                <Image
                  src="/geralt-stress.png"
                  alt="Stress & Relax 표지판"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-8 md:p-10 flex flex-col justify-center space-y-6">
              <h3 className="font-heading text-2xl md:text-3xl font-bold text-[#2A5FAA]">
                공감터의 역할
              </h3>
              <div className="space-y-5 text-[#1E3A26] leading-relaxed">
                <p className="flex items-start gap-2.5 text-[15px] md:text-base">
                  <span className="mt-2 w-2 h-2 rounded-full bg-[#2C3E6B] flex-shrink-0" />
                  <span>
                    <span className="text-[#8B6B2E] font-bold text-base md:text-lg">공감터</span>는
                    임상경험이 풍부한 전문가들이 과학적 근거를 바탕으로
                    당신의 심리적 성장을 돕습니다.
                  </span>
                </p>
                <p className="flex items-start gap-2.5 text-[15px] md:text-base">
                  <span className="mt-2 w-2 h-2 rounded-full bg-[#2C3E6B] flex-shrink-0" />
                  <span>
                    <span className="text-[#8B6B2E] font-bold text-base md:text-lg">공감터</span>는
                    내면의 상처를 치유하고 본연의 빛을 되찾을 수 있도록
                    변화의 여정에 든든한 페이스메이커가 되어드립니다.
                  </span>
                </p>
                <p className="flex items-start gap-2.5 text-[15px] md:text-base">
                  <span className="mt-2 w-2 h-2 rounded-full bg-[#2C3E6B] flex-shrink-0" />
                  <span>
                    <span className="text-[#8B6B2E] font-bold text-base md:text-lg">공감터</span>는
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

      {/* CTA */}
      <section className="relative overflow-hidden py-20 text-center">
        <Image
          src="/pexels-poppies.png"
          alt="양귀비 꽃밭 배경"
          fill
          className="object-cover"
        />
        <div className="relative max-w-[1200px] mx-auto px-6">
          <h2 className="font-heading text-2xl font-bold text-[#1E3A26] mb-4">
            상담이 필요하신가요?
          </h2>
          <p className="text-[#1E3A26] font-bold mb-8">
            공감터와 함께 마음의 이야기를 나누어 보세요.
          </p>
          <Link href="/reservation/offline">
            <Button className="bg-[#4A85D4] hover:bg-[#3B73C4] text-white px-8 h-12 text-base rounded-xl">
              상담 예약하기
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
