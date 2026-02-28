import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { COUNSELING_SERVICES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "심리상담이란",
};

export default function CounselingPage() {
  return (
    <div className="bg-[#F0FAF3]">
      {/* 페이지 헤더 */}
      <section className="bg-white border-b border-[#D0E8D8]">
        <div className="max-w-[1200px] mx-auto px-6 py-16 text-center">
          <h1 className="font-heading text-4xl font-bold text-[#1E3A26] mb-4">
            심리상담이란
          </h1>
          <p className="text-[#6B8C7B] text-lg">
            전문 상담사와 함께하는 마음 치유의 과정
          </p>
        </div>
      </section>

      {/* 심리상담 설명 */}
      <section className="max-w-[1200px] mx-auto px-6 py-20">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl border border-[#D0E8D8] p-10 space-y-6">
            <h2 className="font-heading text-2xl font-bold text-[#1E3A26]">
              심리상담은 무엇인가요?
            </h2>
            <div className="space-y-4 text-[#1E3A26] leading-relaxed">
              <p>
                심리상담은 전문 교육을 받은 상담사가 심리적·정서적 어려움을 겪고 있는
                내담자와 대화를 통해 문제를 탐색하고, 이해하며, 해결해 나가는 전문적인 과정입니다.
              </p>
              <p>
                상담에서는 내담자의 감정, 생각, 행동 패턴을 함께 살펴보며,
                스스로 자신을 이해하고 건강한 방향으로 변화할 수 있도록 돕습니다.
                비밀이 철저히 보장되는 안전한 환경에서 자유롭게 자신의 이야기를 나눌 수 있습니다.
              </p>
              <p>
                상담은 심각한 정신 질환이 있는 분들만을 위한 것이 아닙니다.
                일상에서 겪는 스트레스, 관계의 어려움, 자기 이해와 성장을 원하는 모든 분이
                상담을 통해 도움을 받으실 수 있습니다.
              </p>
            </div>

            {/* 상담이 도움이 되는 경우 */}
            <div className="mt-8 pt-8 border-t border-[#D0E8D8]">
              <h3 className="font-heading text-xl font-bold text-[#1E3A26] mb-4">
                이런 경우 상담이 도움이 됩니다
              </h3>
              <ul className="grid sm:grid-cols-2 gap-3 text-sm text-[#1E3A26]">
                {[
                  "우울감이나 불안이 지속될 때",
                  "대인관계에서 반복적인 어려움을 느낄 때",
                  "자존감이 낮아 일상이 힘들 때",
                  "부부·가족 간 갈등이 심할 때",
                  "자녀의 행동이나 정서가 걱정될 때",
                  "직장 스트레스로 지쳐있을 때",
                  "삶의 방향을 찾고 싶을 때",
                  "과거의 상처가 현재에 영향을 줄 때",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 bg-[#F0FAF3] rounded-xl px-4 py-3 border border-[#D0E8D8]"
                  >
                    <span className="text-[#4A85D4] mt-0.5 shrink-0">&#10003;</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 상담 유형 그리드 */}
      <section className="bg-white border-y border-[#D0E8D8]">
        <div className="max-w-[1200px] mx-auto px-6 py-20">
          <h2 className="font-heading text-3xl font-bold text-[#1E3A26] text-center mb-4">
            상담 분야
          </h2>
          <p className="text-[#6B8C7B] text-center mb-12">
            각 분야별 전문 상담을 제공합니다
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {COUNSELING_SERVICES.map((service) => (
              <Link key={service.slug} href={`/counseling/${service.slug}`}>
                <Card className="rounded-2xl bg-[#F0FAF3] border-[#D0E8D8] hover:border-[#8CC4A0] hover:shadow-md transition-all h-full cursor-pointer group">
                  <CardHeader className="pb-2">
                    <div className="w-14 h-14 rounded-2xl bg-white border border-[#D0E8D8] flex items-center justify-center mb-2 group-hover:border-[#8CC4A0] transition-colors">
                      <span className="text-2xl text-[#4A8C5E]">
                        {service.icon === "Baby" && "👶"}
                        {service.icon === "User" && "🧑"}
                        {service.icon === "Heart" && "💛"}
                        {service.icon === "Briefcase" && "💼"}
                      </span>
                    </div>
                    <h3 className="font-heading text-lg font-bold text-[#1E3A26] group-hover:text-[#4A8C5E] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs text-[#6B8C7B]">{service.subtitle}</p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-[#6B8C7B] leading-relaxed line-clamp-3">
                      {service.description}
                    </p>
                    <span className="inline-block mt-4 text-sm text-[#4A85D4] font-medium group-hover:underline">
                      자세히 보기 &rarr;
                    </span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-[1200px] mx-auto px-6 py-20 text-center">
        <h2 className="font-heading text-2xl font-bold text-[#1E3A26] mb-4">
          상담을 시작해 보세요
        </h2>
        <p className="text-[#6B8C7B] mb-8 max-w-md mx-auto">
          전문 상담사가 여러분의 마음에 귀 기울이겠습니다.
          편안한 마음으로 첫 걸음을 내딛어 보세요.
        </p>
        <Link href="/reservation/offline">
          <Button className="bg-[#4A85D4] hover:bg-[#3B73C4] text-white px-8 h-12 text-base rounded-xl">
            상담 예약하기
          </Button>
        </Link>
      </section>
    </div>
  );
}
