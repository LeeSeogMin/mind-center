import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function SctPage() {
  return (
    <div className="bg-[#F0FAF3]">
      {/* 페이지 헤더 */}
      <section className="bg-white border-b border-[#D0E8D8]">
        <div className="max-w-[1200px] mx-auto px-6 py-16">
          <p className="text-sm text-[#6B8C7B] mb-2">심리검사</p>
          <h1 className="font-heading text-4xl font-bold text-[#1E3A26] mb-4">
            SCT 문장완성검사
          </h1>
          <p className="text-[#6B8C7B] text-lg max-w-2xl">
            미완성 문장을 자유롭게 완성하며 내면의 감정, 욕구, 갈등을 탐색하는 투사적 심리검사입니다.
          </p>
        </div>
      </section>

      <div className="max-w-[1200px] mx-auto px-6 py-16 space-y-10">
        {/* 검사 개요 */}
        <div className="bg-white rounded-2xl border border-[#D0E8D8] p-8">
          <h2 className="font-heading text-xl font-bold text-[#1E3A26] mb-4">검사 개요</h2>
          <p className="text-[#6B8C7B] leading-relaxed">
            SCT(Sentence Completion Test, 문장완성검사)는 수십 개의 미완성 문장 첫머리를 제시하고
            피검자가 자유롭게 문장을 완성하도록 하는 투사적 검사입니다. 의식·무의식적 감정,
            대인관계 패턴, 자아개념, 가족관계, 미래에 대한 태도 등 광범위한 심리적 특성을
            파악할 수 있습니다.
          </p>
        </div>

        {/* 측정 영역 + 대상 */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl border border-[#D0E8D8] p-8">
            <h2 className="font-heading text-xl font-bold text-[#1E3A26] mb-4">측정 영역</h2>
            <ul className="space-y-2">
              {[
                "자아개념 및 자존감",
                "가족·대인관계 패턴",
                "무의식적 욕구와 갈등",
                "미래·목표에 대한 태도",
                "감정 조절 및 표현 방식",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-[#6B8C7B] text-sm">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#4A85D4] flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-2xl border border-[#D0E8D8] p-8">
            <h2 className="font-heading text-xl font-bold text-[#1E3A26] mb-4">검사 대상</h2>
            <ul className="space-y-2">
              {[
                "자신의 내면을 탐색하고 싶은 성인",
                "우울·불안·대인관계 어려움을 경험하는 분",
                "상담 초기 심층적 이해가 필요한 경우",
                "청소년 (적용 가능)",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-[#6B8C7B] text-sm">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#8CC4A0] flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 소요 시간 & 비용 */}
        <div className="bg-white rounded-2xl border border-[#D0E8D8] p-8">
          <h2 className="font-heading text-xl font-bold text-[#1E3A26] mb-6">검사 정보</h2>
          <div className="grid sm:grid-cols-3 gap-6 text-center">
            <div>
              <p className="text-xs text-[#6B8C7B] mb-1">소요 시간</p>
              <p className="text-lg font-medium text-[#1E3A26]">약 30~50분</p>
            </div>
            <div>
              <p className="text-xs text-[#6B8C7B] mb-1">검사 방식</p>
              <p className="text-lg font-medium text-[#1E3A26]">지필 / 온라인</p>
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
            SCT 검사를 받고 싶으신가요?
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
