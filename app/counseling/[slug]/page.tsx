import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { COUNSELING_SERVICES } from "@/lib/constants";

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

  return (
    <div className="bg-[#F0FAF3]">
      {/* 페이지 헤더 */}
      <section className="bg-[#2D5A3D] border-b border-[#D0E8D8]">
        <div className="max-w-[1200px] mx-auto px-6 py-12 text-center">
          <h1 className="font-heading text-4xl font-bold text-white mb-4">
            {service.title}
          </h1>
          <p className="text-white/70 text-lg">{service.subtitle}</p>
        </div>
      </section>

      {/* 상세 콘텐츠 */}
      <section className="max-w-[1200px] mx-auto px-6 pt-10 pb-10">
        <div className="space-y-10">
          {/* 설명 */}
          <div className="bg-white rounded-2xl border border-[#D0E8D8] p-10">
            <h2 className="font-heading text-2xl font-bold text-[#2C3E6B] mb-6">
              {service.title}이란?
            </h2>
            <p className="text-[#1E3A26] leading-relaxed text-lg">
              {service.description}
            </p>
          </div>

          {/* 상담의 특징 */}
          {service.features && service.features.length > 0 && (
            <div className="bg-white rounded-2xl border border-[#D0E8D8] p-10" style={{ wordBreak: "keep-all" }}>
              <h2 className="font-heading text-2xl font-bold text-[#2C3E6B] mb-6">
                {service.title}의 특징
              </h2>
              <ol className="space-y-4 text-[#1E3A26] leading-relaxed">
                {service.features.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="font-bold text-[#2C3E6B] shrink-0">{index + 1}.</span>
                    <span><strong>{item.title}:</strong> {item.desc}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {/* 주요 상담 내용 및 영역 */}
          {service.categories && service.categories.length > 0 && (
            <div className="bg-white rounded-2xl border border-[#D0E8D8] p-10" style={{ wordBreak: "keep-all" }}>
              <h2 className="font-heading text-2xl font-bold text-[#2C3E6B] mb-6">
                주요 상담 내용 및 영역
              </h2>
              <div className="grid md:grid-cols-[1fr_320px] gap-4 items-center">
                <div className="space-y-6 text-[#1E3A26] leading-relaxed">
                  {service.categories.map((cat, index) => (
                    <div key={index}>
                      <div className="flex items-start gap-3 mb-2">
                        <span className="font-bold text-[#2C3E6B] shrink-0">{index + 1}.</span>
                        <span><strong>{cat.title}</strong></span>
                      </div>
                      <ul className="space-y-2 ml-4">
                        {cat.items.map((item, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#1E3A26] flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                <div className="hidden md:flex justify-center">
                  <Image
                    src="/olenchic-ai-generated.png"
                    alt="아동·청소년 상담 일러스트"
                    width={240}
                    height={300}
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          )}

          {/* 기존 details 목록 (features/categories 없는 경우) */}
          {(!service.features || service.features.length === 0) && service.details.length > 0 && (
            <div className="bg-white rounded-2xl border border-[#D0E8D8] p-10">
              <h2 className="font-heading text-2xl font-bold text-[#2C3E6B] mb-6">
                주요 상담 내용
              </h2>
              <ul className="space-y-4">
                {service.details.map((detail, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-4 bg-[#F0FAF3] rounded-xl p-5 border border-[#D0E8D8]"
                  >
                    <span className="w-8 h-8 rounded-full bg-[#4A8C5E] text-white flex items-center justify-center text-sm font-medium shrink-0">
                      {index + 1}
                    </span>
                    <span className="text-[#1E3A26] pt-1">{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* 공감터만의 상담 시스템 */}
          {service.system && service.system.length > 0 && (
            <div className="bg-white rounded-2xl border border-[#D0E8D8] p-10" style={{ wordBreak: "keep-all" }}>
              <h2 className="font-heading text-2xl font-bold text-[#2C3E6B] mb-6">
                공감터만의 {service.title} 시스템
              </h2>
              <ul className="space-y-4 text-[#1E3A26] leading-relaxed">
                {service.system.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#1E3A26] flex-shrink-0" />
                    <span><strong>{item.title}:</strong> {item.desc}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* 상담 예약 */}
          <div className="bg-white rounded-2xl border border-[#D0E8D8] p-10 text-center space-y-4">
            <h3 className="font-heading text-xl font-bold text-[#2C3E6B]">
              <strong>상담 예약</strong>
            </h3>
            <div className="flex justify-center gap-4">
              <Link href="/reservation/offline">
                <Button className="bg-[#4A85D4] hover:bg-[#3B73C4] text-white h-12 text-base rounded-xl px-8">
                  대면상담 예약하기
                </Button>
              </Link>
              <Link href="/reservation/online">
                <Button
                  variant="outline"
                  className="border-[#D0E8D8] text-[#4A8C5E] hover:bg-[#F0FAF3] h-12 text-base rounded-xl px-8"
                >
                  화상상담 예약하기
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
