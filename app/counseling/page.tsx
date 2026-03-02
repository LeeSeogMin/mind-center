import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { COUNSELING_SERVICES } from "@/lib/constants";
import {
  Baby,
  User,
  Heart,
  PersonStanding,
  Users,
  Building2,
} from "lucide-react";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Baby,
  User,
  Heart,
  PersonStanding,
  Users,
  Building2,
};

export const metadata: Metadata = {
  title: "심리상담이란",
};

export default function CounselingPage() {
  return (
    <div className="bg-[#F0FAF3]">
      {/* 페이지 헤더 */}
      <section className="bg-[#2D5A3D] border-b border-[#D0E8D8]">
        <div className="max-w-[1200px] mx-auto px-6 py-12 text-center">
          <h1 className="font-heading text-4xl font-bold text-white mb-4">
            심리상담이란
          </h1>
          <p className="text-white/70 text-lg">
            전문 상담사와 함께하는 마음 치유의 과정
          </p>
        </div>
      </section>

      {/* 심리상담 설명 */}
      <section className="max-w-[1200px] mx-auto px-6 pt-10 pb-10">
        <div>
          <div className="bg-white rounded-2xl border border-[#2C3E6B] p-10 space-y-6" style={{ wordBreak: "keep-all" }}>
            <div className="space-y-4 text-[#1E3A26] leading-relaxed">
              <p>
                심리상담은 단순히 고민을 털어놓고 위로를 받는 것을 넘어, 전문적인 훈련을 받은 <strong>상담사</strong>와 함께 자신의 내면을 객관적으로 들여다보는 <strong>과정</strong>입니다.
              </p>
              <p>
                우리는 삶의 여정 속에서 뜻하지 않은 감정의 파도를 만나거나 길을 잃기도 합니다. 상담은 그 파도를 멈추게 하는 것이 아니라, 파도를 타는 법을 배우고 스스로 나아갈 수 있는 <strong>내면의 힘(Resilience)</strong>을 기르는 일입니다. 안전하고 수용적인 분위기 속에서 자신을 가로막던 패턴을 이해하고, 더 건강한 삶의 방향을 선택할 수 있도록 돕는 <strong>가장 적극적인 자기 돌봄</strong>의 시간입니다.
              </p>
            </div>

            {/* 이런 경우 상담이 도움이 됩니다 */}
            <div className="mt-8 pt-8 border-t border-[#D0E8D8]">
              <h3 className="font-heading text-xl font-bold text-[#E8863A] mb-4">
                이런 경우, 심리상담이 도움이 됩니다
              </h3>
              <p className="text-[#1E3A26] leading-relaxed mb-6">
                특별한 정신적 질환이 없더라도, 일상에서 다음과 같은 어려움을 느끼신다면 언제든 <strong className="text-[#5C3A1E]">공감터</strong>의 문을 두드려 주세요.
              </p>
              <ul className="space-y-4 text-[#1E3A26] leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#1E3A26] flex-shrink-0" />
                  <span><strong>감정의 조절이 어려울 때:</strong> 이유 없는 우울감, 무기력증, 갑작스러운 분노나 불안이 지속되어 일상생활에 지장을 주는 경우</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#1E3A26] flex-shrink-0" />
                  <span><strong>관계 속에서 반복되는 갈등:</strong> 가족, 연인, 친구, 직장 동료와의 관계에서 소통이 어렵고 비슷한 갈등 패턴이 되풀이될 때</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#1E3A26] flex-shrink-0" />
                  <span><strong>자존감과 정체성의 혼란:</strong> 내가 누구인지 모르겠거나 스스로를 비난하게 되고, 타인의 시선에 지나치게 신경이 쓰일 때</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#1E3A26] flex-shrink-0" />
                  <span><strong>예기치 못한 삶의 위기:</strong> 이별, 사별, 트라우마, 큰 실패 등 감당하기 힘든 스트레스로 인해 마음의 지지대가 필요한 경우</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#1E3A26] flex-shrink-0" />
                  <span><strong>중요한 결정을 앞둔 혼란:</strong> 진로나 인생의 전환점에서 객관적인 시선으로 자신을 탐색하고 올바른 결정을 내리고 싶을 때</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#1E3A26] flex-shrink-0" />
                  <span><strong>더 나은 성장을 원할 때:</strong> 현재 큰 문제는 없지만, 나를 더 깊이 이해하고 잠재력을 발휘하여 삶의 질을 높이고 싶을 때</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 상담 유형 그리드 */}
      <section className="bg-white border-y border-[#D0E8D8]">
        <div className="max-w-[1200px] mx-auto px-6 pt-10 pb-10">
          <h2 className="font-heading text-3xl font-bold text-[#2C3E6B] text-center mb-8">
            상담 분야
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {COUNSELING_SERVICES.map((service) => (
              <Link key={service.slug} href={`/counseling/${service.slug}`}>
                <Card className="rounded-2xl bg-[#F0FAF3] border-[#2C3E6B] hover:border-[#8CC4A0] hover:shadow-md transition-all h-full cursor-pointer group">
                  <CardHeader className="pb-2">
                    {(() => {
                      const IconComponent = ICON_MAP[service.icon];
                      return (
                        <div className="w-14 h-14 rounded-2xl bg-white border border-[#E8863A] flex items-center justify-center mb-2 group-hover:border-[#8CC4A0] transition-colors">
                          {IconComponent && <IconComponent className="w-7 h-7 text-[#4A8C5E]" />}
                        </div>
                      );
                    })()}
                    <h3 className="font-heading text-lg font-bold text-[#1E3A26] group-hover:text-[#4A8C5E] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs text-[#6B8C7B]">{service.subtitle}</p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-base text-[#6B8C7B] leading-relaxed" style={{ wordBreak: "keep-all" }}>
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

    </div>
  );
}
