import Link from "next/link";
import { Button } from "@/components/ui/button";

interface BoardPost {
  id: number;
  title: string;
  author: string;
  date: string;
  viewCount: number;
}

const SAMPLE_DATA: Record<string, BoardPost[]> = {
  notice: [
    { id: 1, title: "2025년 설 연휴 휴무 안내", author: "관리자", date: "2025-01-20", viewCount: 152 },
    { id: 2, title: "화상상담 서비스 오픈 안내", author: "관리자", date: "2025-01-15", viewCount: 238 },
    { id: 3, title: "개인정보처리방침 개정 안내", author: "관리자", date: "2025-01-10", viewCount: 97 },
    { id: 4, title: "상담 예약 시스템 이용 안내", author: "관리자", date: "2025-01-05", viewCount: 314 },
  ],
  review: [
    { id: 1, title: "6개월간의 상담을 마치며 감사 인사드립니다", author: "김**", date: "2025-01-18", viewCount: 89 },
    { id: 2, title: "부부상담 후기 - 대화가 다시 시작되었어요", author: "이**", date: "2025-01-12", viewCount: 134 },
    { id: 3, title: "아이가 밝아졌어요, 놀이치료 후기", author: "박**", date: "2025-01-08", viewCount: 201 },
  ],
  column: [
    { id: 1, title: "불안을 다스리는 5가지 일상 습관", author: "정선이 박사", date: "2025-01-22", viewCount: 456 },
    { id: 2, title: "아이의 마음을 여는 대화법", author: "정선이 박사", date: "2025-01-14", viewCount: 389 },
    { id: 3, title: "번아웃, 어떻게 회복할 수 있을까", author: "정선이 박사", date: "2025-01-07", viewCount: 312 },
    { id: 4, title: "건강한 부부 관계를 위한 소통의 기술", author: "정선이 박사", date: "2024-12-28", viewCount: 278 },
  ],
};

interface BoardListProps {
  category: "notice" | "review" | "column";
  title: string;
}

export default function BoardList({ category, title }: BoardListProps) {
  const posts = SAMPLE_DATA[category];

  const categoryLabels = {
    notice: "공지사항",
    review: "상담후기",
    column: "칼럼",
  };

  return (
    <div className="bg-[#FBF8F3]">
      {/* 페이지 헤더 */}
      <section className="bg-white border-b border-[#E8DDD0]">
        <div className="max-w-[1200px] mx-auto px-6 py-16 text-center">
          <h1 className="font-heading text-4xl font-bold text-[#3A2E26] mb-4">
            {title}
          </h1>
          <p className="text-[#8C7B6B] text-lg">게시판</p>
        </div>
      </section>

      <section className="max-w-[1200px] mx-auto px-6 py-20">
        {/* 탭 네비게이션 */}
        <div className="flex gap-2 mb-8 border-b border-[#E8DDD0] pb-4">
          {(["notice", "review", "column"] as const).map((cat) => (
            <Link
              key={cat}
              href={`/board/${cat}`}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                cat === category
                  ? "bg-[#8B6B4E] text-white"
                  : "bg-white text-[#8C7B6B] border border-[#E8DDD0] hover:border-[#C4A882] hover:text-[#8B6B4E]"
              }`}
            >
              {categoryLabels[cat]}
            </Link>
          ))}
        </div>

        {/* 게시글 목록 */}
        <div className="bg-white rounded-2xl border border-[#E8DDD0] overflow-hidden">
          {/* 테이블 헤더 */}
          <div className="hidden sm:grid grid-cols-[1fr_100px_100px_80px] gap-4 px-6 py-3 bg-[#FBF8F3] border-b border-[#E8DDD0] text-xs text-[#8C7B6B] font-medium">
            <span>제목</span>
            <span className="text-center">작성자</span>
            <span className="text-center">작성일</span>
            <span className="text-center">조회</span>
          </div>

          {/* 게시글 행 */}
          {posts.map((post, index) => (
            <div
              key={post.id}
              className={`grid sm:grid-cols-[1fr_100px_100px_80px] gap-2 sm:gap-4 px-6 py-4 hover:bg-[#FBF8F3] transition-colors cursor-pointer ${
                index < posts.length - 1 ? "border-b border-[#E8DDD0]" : ""
              }`}
            >
              <span className="text-sm text-[#3A2E26] font-medium hover:text-[#8B6B4E] transition-colors">
                {post.title}
              </span>
              <span className="text-xs sm:text-sm text-[#8C7B6B] sm:text-center">
                {post.author}
              </span>
              <span className="text-xs sm:text-sm text-[#8C7B6B] sm:text-center">
                {post.date}
              </span>
              <span className="text-xs sm:text-sm text-[#8C7B6B] sm:text-center">
                {post.viewCount}
              </span>
            </div>
          ))}
        </div>

        {/* 글쓰기 버튼 */}
        <div className="flex justify-end mt-6">
          <Button className="bg-[#8B6B4E] hover:bg-[#7A5D42] text-white rounded-xl">
            글쓰기
          </Button>
        </div>
      </section>
    </div>
  );
}
