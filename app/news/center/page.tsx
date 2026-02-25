import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "센터소식",
};

const NEWS_ITEMS = [
  {
    id: 1,
    title: "공감터 심리상담연구소, 2025년 상반기 무료 심리검사 이벤트 실시",
    date: "2025-01-20",
    excerpt:
      "공감터 심리상담연구소에서 2025년 상반기를 맞아 지역 주민을 대상으로 무료 심리검사 이벤트를 실시합니다. 간단한 성격검사와 스트레스 척도 검사를 받아보실 수 있습니다.",
  },
  {
    id: 2,
    title: "정선이 박사, OO대학교 상담심리학과 특강 진행",
    date: "2025-01-15",
    excerpt:
      "정선이 박사가 OO대학교 상담심리학과 대학원생을 대상으로 '상담 현장에서의 통합적 접근'이라는 주제로 특강을 진행하였습니다.",
  },
  {
    id: 3,
    title: "화상상담 서비스 정식 오픈",
    date: "2025-01-10",
    excerpt:
      "공감터 심리상담연구소에서 비대면 화상상담 서비스를 정식으로 오픈하였습니다. 거리나 시간 제약으로 대면 상담이 어려우신 분들도 편안하게 상담을 받으실 수 있습니다.",
  },
  {
    id: 4,
    title: "센터 리모델링 완료 안내",
    date: "2024-12-20",
    excerpt:
      "보다 편안한 상담 환경을 위해 진행했던 센터 리모델링이 완료되었습니다. 새롭게 단장한 상담실에서 따뜻하고 아늑한 분위기 속에서 상담을 받으실 수 있습니다.",
  },
];

export default function CenterNewsPage() {
  return (
    <div className="bg-[#FBF8F3]">
      {/* 페이지 헤더 */}
      <section className="bg-white border-b border-[#E8DDD0]">
        <div className="max-w-[1200px] mx-auto px-6 py-16 text-center">
          <h1 className="font-heading text-4xl font-bold text-[#3A2E26] mb-4">
            센터소식
          </h1>
          <p className="text-[#8C7B6B] text-lg">
            공감터 심리상담연구소의 새로운 소식을 전합니다
          </p>
        </div>
      </section>

      <section className="max-w-[1200px] mx-auto px-6 py-20">
        {/* 탭 네비게이션 */}
        <div className="flex gap-2 mb-10 border-b border-[#E8DDD0] pb-4">
          <Link
            href="/news/center"
            className="px-5 py-2.5 rounded-xl text-sm font-medium bg-[#8B6B4E] text-white"
          >
            센터소식
          </Link>
          <Link
            href="/news/event"
            className="px-5 py-2.5 rounded-xl text-sm font-medium bg-white text-[#8C7B6B] border border-[#E8DDD0] hover:border-[#C4A882] hover:text-[#8B6B4E] transition-colors"
          >
            이벤트
          </Link>
        </div>

        {/* 소식 카드 */}
        <div className="grid md:grid-cols-2 gap-6">
          {NEWS_ITEMS.map((item) => (
            <Card
              key={item.id}
              className="rounded-2xl bg-white border-[#E8DDD0] hover:border-[#C4A882] hover:shadow-md transition-all cursor-pointer group"
            >
              {/* 썸네일 플레이스홀더 */}
              <div className="h-48 bg-[#F3EDE5] rounded-t-2xl flex items-center justify-center">
                <div className="text-center text-[#C4A882]">
                  <svg
                    className="w-10 h-10 mx-auto mb-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                    />
                  </svg>
                  <p className="text-xs">이미지</p>
                </div>
              </div>
              <CardHeader className="pb-2">
                <p className="text-xs text-[#8C7B6B]">{item.date}</p>
                <h3 className="font-heading text-lg font-bold text-[#3A2E26] group-hover:text-[#8B6B4E] transition-colors leading-snug">
                  {item.title}
                </h3>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-[#8C7B6B] leading-relaxed line-clamp-2">
                  {item.excerpt}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
