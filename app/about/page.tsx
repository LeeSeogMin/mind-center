import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { COUNSELOR_NAME, SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: "연구소 소개",
};

export default function AboutPage() {
  return (
    <div className="bg-[#F0FAF3]">
      {/* 페이지 헤더 */}
      <section className="relative bg-white border-b border-[#D0E8D8] overflow-hidden">
        {/* 배경 일러스트 */}
        <div className="absolute inset-0">
          <Image
            src="/about-illustration.jpg"
            alt="꽃밭 일러스트"
            fill
            className="object-cover opacity-30"
            priority
          />
        </div>
        <div className="relative max-w-[1200px] mx-auto px-6 py-20 text-center space-y-3">
          <h1 className="font-heading text-2xl md:text-3xl font-bold text-[#C93545] leading-relaxed">
            당신의 마음은 안녕하신가요?
          </h1>
          <p className="font-heading text-lg md:text-xl font-bold text-[#5C3A1E] leading-relaxed">
            깊은 이해와 마음에 닿는 진심
          </p>
          <p className="font-heading text-lg md:text-xl font-bold text-[#5C3A1E] leading-relaxed">
            삶을 바꾸는 상담
          </p>
          <p className="font-heading text-lg md:text-xl font-bold text-[#5C3A1E] leading-relaxed">
            공감터와의 만남은 당신을 새롭게 합니다
          </p>
        </div>
      </section>

      {/* 메인 콘텐츠 */}
      <section className="max-w-[1200px] mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* 사진 영역 */}
          <div className="flex justify-center">
            <div className="w-full max-w-[400px] aspect-[3/4] bg-white rounded-2xl border border-[#D0E8D8] flex items-center justify-center shadow-sm">
              <div className="text-center text-[#6B8C7B]">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-[#F3EDE5] flex items-center justify-center">
                  <span className="text-3xl text-[#8CC4A0]">
                    {COUNSELOR_NAME.charAt(0)}
                  </span>
                </div>
                <p className="text-sm">대표 상담사 프로필 사진</p>
              </div>
            </div>
          </div>

          {/* 공감터 소개 */}
          <div className="space-y-8">
            <div>
              <h2 className="font-heading text-5xl font-bold text-[#4A85D4] leading-tight mb-4">
                <span className="text-[#2A5FAA] text-6xl">공감터</span>
              </h2>
            </div>

            <div className="space-y-5 text-[#1E3A26] leading-relaxed">
              <p className="flex items-start gap-2">
                <span className="mt-2 w-2 h-2 rounded-full bg-[#4A85D4] flex-shrink-0" />
                <span>
                  <span className="text-[#2A5FAA] font-bold text-lg">공감터</span>는
                  임상경험이 풍부한 전문가들이 과학적 근거를 바탕으로
                  당신의 심리적 성장을 돕습니다.
                </span>
              </p>
              <p className="flex items-start gap-2">
                <span className="mt-2 w-2 h-2 rounded-full bg-[#4A85D4] flex-shrink-0" />
                <span>
                  <span className="text-[#2A5FAA] font-bold text-lg">공감터</span>는
                  내면의 상처를 치유하고 본연의 빛을 되찾을 수 있도록
                  변화의 여정에 든든한 페이스메이커가 되어드립니다.
                </span>
              </p>
              <p className="flex items-start gap-2">
                <span className="mt-2 w-2 h-2 rounded-full bg-[#4A85D4] flex-shrink-0" />
                <span>
                  <span className="text-[#2A5FAA] font-bold text-lg">공감터</span>는
                  누구에게도 말하지 못했던 고민,
                  따뜻한 경청과 공감으로 함께 하겠습니다.
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 연구소 미션 */}
      <section className="bg-white border-y border-[#D0E8D8]">
        <div className="max-w-[1200px] mx-auto px-6 py-20">
          <h2 className="font-heading text-3xl font-bold text-[#1E3A26] text-center mb-4">
            연구소 철학
          </h2>
          <p className="text-[#6B8C7B] text-center mb-12 max-w-xl mx-auto">
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
                className="bg-[#F0FAF3] rounded-2xl border border-[#D0E8D8] p-8 text-center"
              >
                <h3 className="font-heading text-xl font-bold text-[#1E3A26] mb-4">
                  {item.title}
                </h3>
                <p className="text-[#6B8C7B] leading-relaxed text-sm">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-[1200px] mx-auto px-6 py-20 text-center">
        <h2 className="font-heading text-2xl font-bold text-[#1E3A26] mb-4">
          상담이 필요하신가요?
        </h2>
        <p className="text-[#6B8C7B] mb-8">
          정선이 박사와 함께 마음의 이야기를 나누어 보세요.
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
