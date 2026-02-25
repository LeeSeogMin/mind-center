import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "이벤트",
};

const EVENTS = [
  {
    id: 1,
    title: "신규 내담자 첫 상담 20% 할인 이벤트",
    dateRange: "2025.01.01 ~ 2025.03.31",
    status: "진행중",
    description:
      "공감터 심리상담연구소를 처음 방문하시는 분들을 위해 첫 상담 비용을 20% 할인해 드립니다. 부담 없이 전문 상담을 경험해 보세요.",
  },
  {
    id: 2,
    title: "2025 상반기 무료 심리검사 이벤트",
    dateRange: "2025.02.01 ~ 2025.02.28",
    status: "진행중",
    description:
      "지역 주민을 대상으로 간이 성격검사와 스트레스 척도 검사를 무료로 제공합니다. 선착순 50명 한정이니 서둘러 신청해 주세요.",
  },
  {
    id: 3,
    title: "부부상담 패키지 특별 프로모션",
    dateRange: "2025.03.01 ~ 2025.04.30",
    status: "예정",
    description:
      "부부상담 10회기 패키지를 특별 가격으로 제공합니다. 소통의 어려움을 겪고 계신 부부를 위한 맞춤형 프로그램입니다.",
  },
  {
    id: 4,
    title: "청소년 자존감 향상 집단상담 프로그램",
    dateRange: "2024.10.01 ~ 2024.12.31",
    status: "종료",
    description:
      "중·고등학생을 대상으로 한 자존감 향상 집단상담 프로그램입니다. 또래와 함께 자기 이해와 긍정적 자아상을 형성해 나갑니다.",
  },
];

function getStatusColor(status: string) {
  switch (status) {
    case "진행중":
      return "bg-[#D4845A] text-white";
    case "예정":
      return "bg-[#C4A882] text-white";
    case "종료":
      return "bg-[#E8DDD0] text-[#8C7B6B]";
    default:
      return "bg-[#E8DDD0] text-[#8C7B6B]";
  }
}

export default function EventPage() {
  return (
    <div className="bg-[#FBF8F3]">
      {/* 페이지 헤더 */}
      <section className="bg-white border-b border-[#E8DDD0]">
        <div className="max-w-[1200px] mx-auto px-6 py-16 text-center">
          <h1 className="font-heading text-4xl font-bold text-[#3A2E26] mb-4">
            이벤트
          </h1>
          <p className="text-[#8C7B6B] text-lg">
            공감터 심리상담연구소의 특별한 이벤트를 만나보세요
          </p>
        </div>
      </section>

      <section className="max-w-[1200px] mx-auto px-6 py-20">
        {/* 탭 네비게이션 */}
        <div className="flex gap-2 mb-10 border-b border-[#E8DDD0] pb-4">
          <Link
            href="/news/center"
            className="px-5 py-2.5 rounded-xl text-sm font-medium bg-white text-[#8C7B6B] border border-[#E8DDD0] hover:border-[#C4A882] hover:text-[#8B6B4E] transition-colors"
          >
            센터소식
          </Link>
          <Link
            href="/news/event"
            className="px-5 py-2.5 rounded-xl text-sm font-medium bg-[#8B6B4E] text-white"
          >
            이벤트
          </Link>
        </div>

        {/* 이벤트 카드 */}
        <div className="grid md:grid-cols-2 gap-6">
          {EVENTS.map((event) => (
            <Card
              key={event.id}
              className="rounded-2xl bg-white border-[#E8DDD0] hover:border-[#C4A882] hover:shadow-md transition-all cursor-pointer group overflow-hidden"
            >
              {/* 썸네일 플레이스홀더 */}
              <div className="h-48 bg-[#F3EDE5] flex items-center justify-center relative">
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
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <p className="text-xs">이벤트 이미지</p>
                </div>
                {/* 상태 뱃지 */}
                <Badge
                  className={`absolute top-4 right-4 ${getStatusColor(event.status)}`}
                >
                  {event.status}
                </Badge>
              </div>

              <CardHeader className="pb-2">
                <p className="text-xs text-[#D4845A] font-medium">
                  {event.dateRange}
                </p>
                <h3 className="font-heading text-lg font-bold text-[#3A2E26] group-hover:text-[#8B6B4E] transition-colors leading-snug">
                  {event.title}
                </h3>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-[#8C7B6B] leading-relaxed line-clamp-2">
                  {event.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
