import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Mmpi2Page() {
  return (
    <div className="bg-[#F0FAF3]">
      {/* 페이지 헤더 */}
      <section className="bg-white border-b border-[#D0E8D8]">
        <div className="max-w-[1200px] mx-auto px-6 py-16">
          <p className="text-sm text-[#6B8C7B] mb-2">심리검사</p>
          <h1 className="font-heading text-4xl font-bold text-[#1E3A26] mb-4">
            MMPI-2 다면적 인성검사
          </h1>
          <p className="text-[#6B8C7B] text-lg max-w-2xl">
            세계에서 가장 널리 사용되는 객관적 성격·정신병리 검사로, 개인의 성격 특성과 심리적 증상을 종합적으로 평가합니다.
          </p>
        </div>
      </section>

      <div className="max-w-[1200px] mx-auto px-6 py-16 space-y-10">
        {/* 검사 개요 */}
        <div className="bg-white rounded-2xl border border-[#D0E8D8] p-8">
          <h2 className="font-heading text-xl font-bold text-[#1E3A26] mb-4">검사 개요</h2>
          <p className="text-[#6B8C7B] leading-relaxed">
            MMPI-2(Minnesota Multiphasic Personality Inventory-2)는 567문항으로 구성된
            자기보고형 성격검사입니다. 10개의 임상 척도와 다수의 내용 척도, 보충 척도를 통해
            우울, 불안, 강박, 편집, 반사회성 등 다양한 정신건강 영역을 체계적으로 평가하며,
            타당도 척도를 통해 검사 태도의 신뢰성도 함께 점검합니다.
          </p>
        </div>

        {/* 측정 영역 + 대상 */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl border border-[#D0E8D8] p-8">
            <h2 className="font-heading text-xl font-bold text-[#1E3A26] mb-4">주요 임상 척도</h2>
            <ul className="space-y-2">
              {[
                "건강 염려증 (Hs)",
                "우울증 (D)",
                "히스테리 (Hy)",
                "반사회성 (Pd)",
                "편집증 (Pa)",
                "강박증 (Pt) / 조현병 (Sc)",
                "경조증 (Ma) / 내향성 (Si)",
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
                "만 19세 이상 성인",
                "우울·불안·강박 등 심리적 증상이 있는 분",
                "성격 특성을 객관적으로 파악하고 싶은 분",
                "상담 전 종합적인 심리 평가가 필요한 경우",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-[#6B8C7B] text-sm">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#8CC4A0] flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 검사 정보 */}
        <div className="bg-white rounded-2xl border border-[#D0E8D8] p-8">
          <h2 className="font-heading text-xl font-bold text-[#1E3A26] mb-6">검사 정보</h2>
          <div className="grid sm:grid-cols-3 gap-6 text-center">
            <div>
              <p className="text-xs text-[#6B8C7B] mb-1">소요 시간</p>
              <p className="text-lg font-medium text-[#1E3A26]">약 60~90분</p>
            </div>
            <div>
              <p className="text-xs text-[#6B8C7B] mb-1">문항 수</p>
              <p className="text-lg font-medium text-[#1E3A26]">567문항</p>
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
            MMPI-2 검사를 받고 싶으신가요?
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
