import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function WechslerPage() {
  return (
    <div className="bg-[#F0FAF3]">
      {/* 페이지 헤더 */}
      <section className="bg-white border-b border-[#D0E8D8]">
        <div className="max-w-[1200px] mx-auto px-6 py-16">
          <p className="text-sm text-[#6B8C7B] mb-2">심리검사</p>
          <h1 className="font-heading text-4xl font-bold text-[#1E3A26] mb-4">
            웩슬러 지능검사
          </h1>
          <p className="text-[#6B8C7B] text-lg max-w-2xl">
            전 세계 표준 지능검사로, 전체 지능 및 인지 능력의 강점과 약점을 세밀하게 파악할 수 있습니다.
          </p>
        </div>
      </section>

      <div className="max-w-[1200px] mx-auto px-6 py-16 space-y-10">
        {/* 검사 개요 */}
        <div className="bg-white rounded-2xl border border-[#D0E8D8] p-8">
          <h2 className="font-heading text-xl font-bold text-[#1E3A26] mb-4">검사 개요</h2>
          <p className="text-[#6B8C7B] leading-relaxed">
            웩슬러 지능검사(Wechsler Intelligence Scale)는 아동용(K-WISC-V)과 성인용(K-WAIS-IV)으로
            구분되며, 언어이해, 시공간, 유동추론, 작업기억, 처리속도의 5개 지표를 통해 인지 능력의
            전반적인 수준과 세부 프로파일을 평가합니다. 학습 부진, ADHD, 발달 평가, 직업 적성 탐색 등
            다양한 목적으로 활용됩니다.
          </p>
        </div>

        {/* 지표 + 대상 */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl border border-[#D0E8D8] p-8">
            <h2 className="font-heading text-xl font-bold text-[#1E3A26] mb-4">5가지 지표 지수</h2>
            <ul className="space-y-2">
              {[
                "언어이해 (VCI) — 언어적 추론·개념 형성",
                "시공간 (VSI) — 공간 관계 지각·구성",
                "유동추론 (FRI) — 귀납·양적 추론",
                "작업기억 (WMI) — 정보 유지·조작",
                "처리속도 (PSI) — 시각 정보 처리 속도",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-[#6B8C7B] text-sm">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#4A85D4] flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-2xl border border-[#D0E8D8] p-8">
            <h2 className="font-heading text-xl font-bold text-[#1E3A26] mb-4">검사 대상 및 활용</h2>
            <ul className="space-y-2">
              {[
                "아동·청소년 (K-WISC-V, 만 6~16세)",
                "성인 (K-WAIS-IV, 만 16세 이상)",
                "학습 부진·ADHD 진단 평가",
                "발달 지연 및 영재 판별",
                "직업 적성 및 인지 특성 파악",
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
              <p className="text-xs text-[#6B8C7B] mb-1">검사 방식</p>
              <p className="text-lg font-medium text-[#1E3A26]">대면 (1:1 개별 시행)</p>
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
            웩슬러 검사를 받고 싶으신가요?
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
