import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { COUNSELING_SERVICES, SITE_NAME } from "@/lib/constants";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = COUNSELING_SERVICES.find((s) => s.slug === slug);
  if (!service) return { title: "상담안내" };
  return { title: service.title };
}

export function generateStaticParams() {
  return COUNSELING_SERVICES.map((s) => ({ slug: s.slug }));
}

export default async function CounselingDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = COUNSELING_SERVICES.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  // 다른 상담 분야 (현재 페이지 제외)
  const otherServices = COUNSELING_SERVICES.filter((s) => s.slug !== slug);

  return (
    <div className="bg-[#FBF8F3]">
      {/* 페이지 헤더 */}
      <section className="bg-white border-b border-[#E8DDD0]">
        <div className="max-w-[1200px] mx-auto px-6 py-16 text-center">
          <p className="text-[#D4845A] font-medium mb-2">상담안내</p>
          <h1 className="font-heading text-4xl font-bold text-[#3A2E26] mb-4">
            {service.title}
          </h1>
          <p className="text-[#8C7B6B] text-lg">{service.subtitle}</p>
        </div>
      </section>

      {/* 상세 콘텐츠 */}
      <section className="max-w-[1200px] mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-[1fr_360px] gap-10">
          {/* 메인 콘텐츠 */}
          <div className="space-y-10">
            {/* 설명 */}
            <div className="bg-white rounded-2xl border border-[#E8DDD0] p-10">
              <h2 className="font-heading text-2xl font-bold text-[#3A2E26] mb-6">
                {service.title}이란?
              </h2>
              <p className="text-[#3A2E26] leading-relaxed text-lg">
                {service.description}
              </p>
            </div>

            {/* 상담 내용 */}
            <div className="bg-white rounded-2xl border border-[#E8DDD0] p-10">
              <h2 className="font-heading text-2xl font-bold text-[#3A2E26] mb-6">
                주요 상담 내용
              </h2>
              <ul className="space-y-4">
                {service.details.map((detail, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-4 bg-[#FBF8F3] rounded-xl p-5 border border-[#E8DDD0]"
                  >
                    <span className="w-8 h-8 rounded-full bg-[#8B6B4E] text-white flex items-center justify-center text-sm font-medium shrink-0">
                      {index + 1}
                    </span>
                    <span className="text-[#3A2E26] pt-1">{detail}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 상담 과정 */}
            <div className="bg-white rounded-2xl border border-[#E8DDD0] p-10">
              <h2 className="font-heading text-2xl font-bold text-[#3A2E26] mb-6">
                상담 진행 과정
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  {
                    step: "01",
                    title: "초기 상담",
                    desc: "현재 겪고 있는 어려움과 상담 목표를 함께 파악합니다.",
                  },
                  {
                    step: "02",
                    title: "심리 평가",
                    desc: "필요에 따라 심리검사를 실시하여 보다 정확한 이해를 돕습니다.",
                  },
                  {
                    step: "03",
                    title: "상담 진행",
                    desc: "정기적인 상담을 통해 문제를 탐색하고 변화를 이끌어갑니다.",
                  },
                  {
                    step: "04",
                    title: "종결 및 사후관리",
                    desc: "상담 목표 달성 후 종결하며, 필요시 추후 상담을 지원합니다.",
                  },
                ].map((item) => (
                  <div
                    key={item.step}
                    className="bg-[#FBF8F3] rounded-xl p-5 border border-[#E8DDD0]"
                  >
                    <span className="text-[#D4845A] font-bold text-sm">
                      STEP {item.step}
                    </span>
                    <h4 className="font-heading text-lg font-bold text-[#3A2E26] mt-1 mb-2">
                      {item.title}
                    </h4>
                    <p className="text-sm text-[#8C7B6B]">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 사이드바 */}
          <div className="space-y-6">
            {/* 예약 CTA */}
            <Card className="rounded-2xl bg-white border-[#E8DDD0] sticky top-24">
              <CardContent className="p-8 text-center space-y-4">
                <h3 className="font-heading text-xl font-bold text-[#3A2E26]">
                  상담 예약
                </h3>
                <p className="text-sm text-[#8C7B6B] leading-relaxed">
                  {service.title}에 대해 더 자세한 상담이 필요하시면
                  편하게 예약해 주세요.
                </p>
                <Link href="/reservation/offline" className="block">
                  <Button className="w-full bg-[#D4845A] hover:bg-[#C47349] text-white h-12 text-base rounded-xl">
                    대면상담 예약하기
                  </Button>
                </Link>
                <Link href="/reservation/online" className="block">
                  <Button
                    variant="outline"
                    className="w-full border-[#E8DDD0] text-[#8B6B4E] hover:bg-[#FBF8F3] h-12 text-base rounded-xl"
                  >
                    화상상담 예약하기
                  </Button>
                </Link>
                <p className="text-xs text-[#8C7B6B] pt-2">
                  전화 문의: 02-1234-5678
                </p>
              </CardContent>
            </Card>

            {/* 다른 상담 분야 */}
            <Card className="rounded-2xl bg-white border-[#E8DDD0]">
              <CardContent className="p-6">
                <h3 className="font-heading text-lg font-bold text-[#3A2E26] mb-4">
                  다른 상담 분야
                </h3>
                <div className="space-y-2">
                  {otherServices.map((other) => (
                    <Link
                      key={other.slug}
                      href={`/counseling/${other.slug}`}
                      className="block px-4 py-3 rounded-xl text-sm text-[#3A2E26] hover:bg-[#FBF8F3] hover:text-[#8B6B4E] transition-colors border border-transparent hover:border-[#E8DDD0]"
                    >
                      {other.title}
                      <span className="text-[#8C7B6B] block text-xs mt-0.5">
                        {other.subtitle}
                      </span>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
