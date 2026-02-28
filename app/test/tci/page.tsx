import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function TciPage() {
  return (
    <div className="bg-[#F0FAF3]">
      {/* 페이지 헤더 */}
      <section className="bg-white border-b border-[#D0E8D8]">
        <div className="max-w-[1200px] mx-auto px-6 py-16">
          <p className="text-sm text-[#6B8C7B] mb-2">심리검사</p>
          <h1 className="font-heading text-4xl font-bold text-[#1E3A26] mb-4">
            TCI 기질 및 성격검사
          </h1>
          <p className="text-[#6B8C7B] text-lg max-w-2xl">
            선천적 기질과 후천적 성격을 구분하여 개인의 고유한 심리 구조를 이해하는 성격 유형 검사입니다.
          </p>
        </div>
      </section>

      <div className="max-w-[1200px] mx-auto px-6 py-16 space-y-10">
        {/* 검사 개요 */}
        <div className="bg-white rounded-2xl border border-[#D0E8D8] p-8">
          <h2 className="font-heading text-xl font-bold text-[#1E3A26] mb-4">검사 개요</h2>
          <p className="text-[#6B8C7B] leading-relaxed">
            TCI(Temperament and Character Inventory)는 Cloninger의 심리생물학적 성격 모델을 기반으로
            개발된 검사입니다. 유전적으로 결정되는 4가지 기질 차원(자극 추구, 위험 회피, 사회적 민감성,
            인내력)과 성장 과정에서 형성되는 3가지 성격 차원(자율성, 연대감, 자기초월)을 측정하여
            자신의 타고난 성향과 성숙한 자아를 통합적으로 이해할 수 있습니다.
          </p>
        </div>

        {/* 기질 & 성격 */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl border border-[#D0E8D8] p-8">
            <h2 className="font-heading text-xl font-bold text-[#1E3A26] mb-4">기질 차원 (선천적)</h2>
            <ul className="space-y-2">
              {[
                "자극 추구 (Novelty Seeking)",
                "위험 회피 (Harm Avoidance)",
                "사회적 민감성 (Reward Dependence)",
                "인내력 (Persistence)",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-[#6B8C7B] text-sm">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#4A85D4] flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-2xl border border-[#D0E8D8] p-8">
            <h2 className="font-heading text-xl font-bold text-[#1E3A26] mb-4">성격 차원 (후천적)</h2>
            <ul className="space-y-2">
              {[
                "자율성 (Self-Directedness)",
                "연대감 (Cooperativeness)",
                "자기초월 (Self-Transcendence)",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-[#6B8C7B] text-sm">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#8CC4A0] flex-shrink-0" />
                  {item}
                </li>
              ))}
              <li className="flex items-start gap-2 text-[#6B8C7B] text-sm mt-4 pt-4 border-t border-[#D0E8D8]">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#4A8C5E] flex-shrink-0" />
                대인관계·직업 선택·자기 이해에 폭넓게 활용
              </li>
            </ul>
          </div>
        </div>

        {/* 검사 정보 */}
        <div className="bg-white rounded-2xl border border-[#D0E8D8] p-8">
          <h2 className="font-heading text-xl font-bold text-[#1E3A26] mb-6">검사 정보</h2>
          <div className="grid sm:grid-cols-3 gap-6 text-center">
            <div>
              <p className="text-xs text-[#6B8C7B] mb-1">소요 시간</p>
              <p className="text-lg font-medium text-[#1E3A26]">약 30~40분</p>
            </div>
            <div>
              <p className="text-xs text-[#6B8C7B] mb-1">적용 연령</p>
              <p className="text-lg font-medium text-[#1E3A26]">만 19세 이상</p>
            </div>
            <div>
              <p className="text-xs text-[#6B8C7B] mb-1">결과 해석</p>
              <p className="text-lg font-medium text-[#4A85D4]">전문가 해석 상담 포함</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-white rounded-2xl border border-[#D0E8D8] p-8 text-center">
          <h2 className="font-heading text-xl font-bold text-[#1E3A26] mb-3">
            TCI 검사를 받고 싶으신가요?
          </h2>
          <p className="text-[#6B8C7B] text-sm mb-6">
            검사 신청 및 비용은 상담사와 상의 후 결정됩니다. 편하게 문의해 주세요.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/reservation/offline">
              <Button className="bg-[#4A85D4] hover:bg-[#3B73C4] text-white px-8 h-11 rounded-xl">
                상담 예약하기
              </Button>
            </Link>
            <Link href="/test">
              <Button variant="outline" className="border-[#D0E8D8] text-[#4A8C5E] hover:bg-[#F0FAF3] px-8 h-11 rounded-xl">
                다른 검사 보기
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
