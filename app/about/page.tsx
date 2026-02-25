import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { COUNSELOR_NAME, COUNSELOR_TITLE, SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: "인사말",
};

export default function AboutPage() {
  return (
    <div className="bg-[#FBF8F3]">
      {/* 페이지 헤더 */}
      <section className="bg-white border-b border-[#E8DDD0]">
        <div className="max-w-[1200px] mx-auto px-6 py-16 text-center">
          <h1 className="font-heading text-4xl font-bold text-[#3A2E26] mb-4">
            인사말
          </h1>
          <p className="text-[#8C7B6B] text-lg">
            {SITE_NAME}을 찾아주셔서 감사합니다
          </p>
        </div>
      </section>

      {/* 메인 콘텐츠 */}
      <section className="max-w-[1200px] mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* 사진 영역 */}
          <div className="flex justify-center">
            <div className="w-full max-w-[400px] aspect-[3/4] bg-white rounded-2xl border border-[#E8DDD0] flex items-center justify-center shadow-sm">
              <div className="text-center text-[#8C7B6B]">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-[#F3EDE5] flex items-center justify-center">
                  <span className="text-3xl text-[#C4A882]">
                    {COUNSELOR_NAME.charAt(0)}
                  </span>
                </div>
                <p className="text-sm">대표 상담사 프로필 사진</p>
              </div>
            </div>
          </div>

          {/* 인사말 텍스트 */}
          <div className="space-y-8">
            <div>
              <p className="text-[#D4845A] font-medium mb-2">대표 인사말</p>
              <h2 className="font-heading text-3xl font-bold text-[#3A2E26] leading-relaxed">
                마음의 어려움,<br />
                함께 나누면 길이 보입니다.
              </h2>
            </div>

            <div className="space-y-5 text-[#3A2E26] leading-relaxed">
              <p>
                안녕하세요. {SITE_NAME} 대표 {COUNSELOR_NAME} {COUNSELOR_TITLE}입니다.
              </p>
              <p>
                살아가면서 우리 모두는 크고 작은 심리적 어려움을 경험합니다.
                때로는 혼자 감당하기 힘든 감정들이 일상을 무겁게 할 때가 있습니다.
                그러한 순간, 전문적인 도움과 따뜻한 공감이 함께한다면
                마음의 짐을 조금 더 가볍게 내려놓을 수 있습니다.
              </p>
              <p>
                {SITE_NAME}는 심리적·정서적 어려움을 겪고 있는 분들이
                자신을 더 깊이 이해하고, 건강한 변화를 이루어나갈 수 있도록
                전문적이고 체계적인 상담 서비스를 제공하고 있습니다.
              </p>
              <p>
                아동·청소년부터 성인, 부부·가족, 직장인에 이르기까지
                다양한 분야의 전문 상담을 통해 내담자 한 분 한 분의 이야기에
                귀 기울이며, 각자에게 맞는 최적의 상담을 제공하겠습니다.
              </p>
              <p>
                용기를 내어 첫 걸음을 내딛으신 여러분을 진심으로 환영합니다.
                {SITE_NAME}가 여러분의 마음에 따뜻한 쉼터가 되겠습니다.
              </p>
            </div>

            <div className="pt-4">
              <p className="font-heading text-lg text-[#8B6B4E]">
                {SITE_NAME} 대표
              </p>
              <p className="font-heading text-2xl font-bold text-[#3A2E26] mt-1">
                {COUNSELOR_NAME} <span className="text-base font-normal text-[#8C7B6B]">{COUNSELOR_TITLE}</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 센터 미션 */}
      <section className="bg-white border-y border-[#E8DDD0]">
        <div className="max-w-[1200px] mx-auto px-6 py-20">
          <h2 className="font-heading text-3xl font-bold text-[#3A2E26] text-center mb-4">
            센터 철학
          </h2>
          <p className="text-[#8C7B6B] text-center mb-12 max-w-xl mx-auto">
            {SITE_NAME}가 소중히 여기는 가치입니다
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "공감과 존중",
                description:
                  "내담자의 이야기에 진심으로 귀 기울이며, 있는 그대로의 모습을 존중합니다. 판단 없는 따뜻한 공감이 치유의 첫걸음이라고 믿습니다.",
              },
              {
                title: "전문성과 윤리",
                description:
                  "검증된 상담 이론과 기법을 바탕으로 체계적인 상담을 진행합니다. 상담 윤리를 철저히 준수하며 비밀보장을 최우선으로 합니다.",
              },
              {
                title: "성장과 변화",
                description:
                  "단순한 문제 해결을 넘어, 내담자가 스스로 자신의 내면을 탐색하고 건강한 변화를 이루어 나갈 수 있도록 함께 동행합니다.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-[#FBF8F3] rounded-2xl border border-[#E8DDD0] p-8 text-center"
              >
                <h3 className="font-heading text-xl font-bold text-[#3A2E26] mb-4">
                  {item.title}
                </h3>
                <p className="text-[#8C7B6B] leading-relaxed text-sm">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-[1200px] mx-auto px-6 py-20 text-center">
        <h2 className="font-heading text-2xl font-bold text-[#3A2E26] mb-4">
          상담이 필요하신가요?
        </h2>
        <p className="text-[#8C7B6B] mb-8">
          전문 상담사와 함께 마음의 이야기를 나누어 보세요.
        </p>
        <Link href="/reservation/offline">
          <Button className="bg-[#D4845A] hover:bg-[#C47349] text-white px-8 h-12 text-base rounded-xl">
            상담 예약하기
          </Button>
        </Link>
      </section>
    </div>
  );
}
