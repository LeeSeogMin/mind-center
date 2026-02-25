import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "심리검사",
};

const TESTS = [
  {
    name: "종합심리검사 (Full Battery)",
    description:
      "인지, 정서, 성격, 대인관계 등 심리적 기능 전반을 종합적으로 평가하는 검사입니다. 여러 심리검사를 통합하여 내담자의 심리 상태를 다각도로 이해합니다.",
    duration: "약 3~4시간",
    price: "문의",
    tags: ["종합평가", "인지", "정서", "성격"],
  },
  {
    name: "MMPI-2 성격검사",
    description:
      "세계적으로 가장 널리 사용되는 객관적 성격검사입니다. 567개 문항을 통해 성격 특성, 정서 상태, 행동 패턴 등을 파악하며, 임상적 진단에 참고 자료로 활용됩니다.",
    duration: "약 1~1.5시간",
    price: "문의",
    tags: ["성격", "임상", "객관적 검사"],
  },
  {
    name: "지능검사 (K-WAIS / K-WISC)",
    description:
      "성인용(K-WAIS) 또는 아동용(K-WISC) 개인 지능검사입니다. 언어이해, 지각추론, 작업기억, 처리속도 등 인지 능력을 세부적으로 평가하여 인지적 강점과 약점을 파악합니다.",
    duration: "약 1.5~2시간",
    price: "문의",
    tags: ["지능", "인지능력", "성인", "아동"],
  },
  {
    name: "투사검사 (로르샤흐 / HTP)",
    description:
      "로르샤흐 잉크반점 검사와 집-나무-사람(HTP) 그림 검사를 통해 무의식적 심리 상태, 내면의 갈등, 정서적 특성을 탐색합니다. 객관적 검사로 파악하기 어려운 심층적인 심리를 이해합니다.",
    duration: "약 1~2시간",
    price: "문의",
    tags: ["투사검사", "무의식", "정서", "심층분석"],
  },
  {
    name: "진로적성검사",
    description:
      "흥미, 적성, 가치관, 성격 유형을 종합적으로 분석하여 적합한 진로 방향을 탐색합니다. 청소년의 진학 상담, 성인의 직업 전환 및 커리어 설계에 활용됩니다.",
    duration: "약 1~1.5시간",
    price: "문의",
    tags: ["진로", "적성", "청소년", "커리어"],
  },
];

export default function TestPage() {
  return (
    <div className="bg-[#FBF8F3]">
      {/* 페이지 헤더 */}
      <section className="bg-white border-b border-[#E8DDD0]">
        <div className="max-w-[1200px] mx-auto px-6 py-16 text-center">
          <h1 className="font-heading text-4xl font-bold text-[#3A2E26] mb-4">
            심리검사
          </h1>
          <p className="text-[#8C7B6B] text-lg">
            과학적이고 체계적인 심리검사로 자신을 더 깊이 이해해 보세요
          </p>
        </div>
      </section>

      {/* 안내 */}
      <section className="max-w-[1200px] mx-auto px-6 pt-20 pb-10">
        <div className="bg-white rounded-2xl border border-[#E8DDD0] p-8 max-w-3xl mx-auto text-center">
          <h2 className="font-heading text-xl font-bold text-[#3A2E26] mb-3">
            심리검사 안내
          </h2>
          <p className="text-[#8C7B6B] leading-relaxed text-sm">
            심리검사는 전문 상담사의 안내 하에 실시되며, 검사 결과는 개별 해석 상담을 통해
            상세히 설명드립니다. 검사 종류와 목적에 따라 소요 시간과 비용이 달라질 수 있으며,
            상담 시 함께 결정하실 수 있습니다.
          </p>
        </div>
      </section>

      {/* 검사 목록 */}
      <section className="max-w-[1200px] mx-auto px-6 pb-20">
        <div className="space-y-6 mt-10">
          {TESTS.map((test) => (
            <Card
              key={test.name}
              className="rounded-2xl bg-white border-[#E8DDD0] hover:border-[#C4A882] transition-colors"
            >
              <div className="grid md:grid-cols-[1fr_200px]">
                <div>
                  <CardHeader>
                    <h3 className="font-heading text-xl font-bold text-[#3A2E26]">
                      {test.name}
                    </h3>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {test.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="bg-[#FBF8F3] border border-[#E8DDD0] text-[#8B6B4E] text-xs"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-[#8C7B6B] leading-relaxed">
                      {test.description}
                    </p>
                  </CardContent>
                </div>

                {/* 오른쪽: 시간/가격 */}
                <div className="flex md:flex-col items-center justify-center gap-4 p-6 md:border-l border-t md:border-t-0 border-[#E8DDD0] bg-[#FBF8F3] md:rounded-r-2xl">
                  <div className="text-center">
                    <p className="text-xs text-[#8C7B6B] mb-1">소요 시간</p>
                    <p className="text-sm font-medium text-[#3A2E26]">
                      {test.duration}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-[#8C7B6B] mb-1">검사 비용</p>
                    <p className="text-sm font-medium text-[#D4845A]">
                      {test.price}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white border-y border-[#E8DDD0]">
        <div className="max-w-[1200px] mx-auto px-6 py-16 text-center">
          <h2 className="font-heading text-2xl font-bold text-[#3A2E26] mb-4">
            심리검사를 받고 싶으신가요?
          </h2>
          <p className="text-[#8C7B6B] mb-8 max-w-md mx-auto text-sm">
            어떤 검사가 적합한지 상담사와 함께 상의하실 수 있습니다.
            편하게 문의해 주세요.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/reservation/offline">
              <Button className="bg-[#D4845A] hover:bg-[#C47349] text-white px-8 h-12 text-base rounded-xl">
                상담 예약하기
              </Button>
            </Link>
            <a href="tel:02-1234-5678">
              <Button
                variant="outline"
                className="border-[#E8DDD0] text-[#8B6B4E] hover:bg-[#FBF8F3] px-8 h-12 text-base rounded-xl"
              >
                전화 문의: 02-1234-5678
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
