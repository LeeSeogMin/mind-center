import Link from "next/link";
import { Heart } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import BoardWriteButton from "@/components/board-write-button";

interface BoardListProps {
  category: "notice" | "review" | "column" | "qna";
  title: string;
}

const categoryLabels = {
  notice: "공지사항",
  review: "상담후기",
  column: "칼럼",
  qna: "Q&A",
};

export default async function BoardList({ category, title }: BoardListProps) {
  const supabase = await createClient();

  const { data: posts } = await supabase
    .from("board_posts")
    .select("id, title, created_at, view_count, users:author_id(name), board_comments(count), board_likes(count)")
    .eq("category", category)
    .order("created_at", { ascending: false });

  const postList = posts ?? [];

  return (
    <div className="bg-[#F0FAF3]">
      {/* 페이지 헤더 */}
      <section className="bg-white border-b border-[#D0E8D8]">
        <div className="max-w-[1200px] mx-auto px-6 py-16 text-center">
          <h1 className="font-heading text-4xl font-bold text-[#1E3A26] mb-4">
            {title}
          </h1>
          <p className="text-[#6B8C7B] text-lg">게시판</p>
        </div>
      </section>

      <section className="max-w-[1200px] mx-auto px-6 py-20">
        {/* 탭 네비게이션 */}
        <div className="flex gap-2 mb-8 border-b border-[#D0E8D8] pb-4">
          {(["notice", "review", "column", "qna"] as const).map((cat) => (
            <Link
              key={cat}
              href={`/board/${cat}`}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                cat === category
                  ? "bg-[#4A8C5E] text-white"
                  : "bg-white text-[#6B8C7B] border border-[#D0E8D8] hover:border-[#8CC4A0] hover:text-[#4A8C5E]"
              }`}
            >
              {categoryLabels[cat]}
            </Link>
          ))}
        </div>

        {/* 게시글 목록 */}
        <div className="bg-white rounded-2xl border border-[#D0E8D8] overflow-hidden">
          {/* 테이블 헤더 */}
          <div className="hidden sm:grid grid-cols-[1fr_100px_100px_60px_60px] gap-4 px-6 py-3 bg-[#F0FAF3] border-b border-[#D0E8D8] text-xs text-[#6B8C7B] font-medium">
            <span>제목</span>
            <span className="text-center">작성자</span>
            <span className="text-center">작성일</span>
            <span className="text-center">조회</span>
            <span className="text-center">좋아요</span>
          </div>

          {postList.length === 0 && (
            <div className="px-6 py-12 text-center text-[#6B8C7B] text-sm">
              등록된 게시글이 없습니다.
            </div>
          )}

          {/* 게시글 행 */}
          {postList.map((post, index) => {
            const users = post.users as unknown as { name: string } | null;
            const authorName = users?.name ?? "익명";
            const commentNum = post.board_comments?.[0]?.count ?? 0;
            const likeNum = post.board_likes?.[0]?.count ?? 0;
            return (
              <Link
                key={post.id}
                href={`/board/${category}/${post.id}`}
                className={`grid sm:grid-cols-[1fr_100px_100px_60px_60px] gap-2 sm:gap-4 px-6 py-4 hover:bg-[#F0FAF3] transition-colors cursor-pointer ${
                  index < postList.length - 1 ? "border-b border-[#D0E8D8]" : ""
                }`}
              >
                <span className="text-sm text-[#1E3A26] font-medium hover:text-[#4A8C5E] transition-colors">
                  {post.title}
                  {commentNum > 0 && (
                    <span className="text-[#4A8C5E] text-xs ml-2">[{commentNum}]</span>
                  )}
                </span>
                <span className="text-xs sm:text-sm text-[#6B8C7B] sm:text-center">
                  {authorName}
                </span>
                <span className="text-xs sm:text-sm text-[#6B8C7B] sm:text-center">
                  {new Date(post.created_at).toLocaleDateString("ko-KR")}
                </span>
                <span className="text-xs sm:text-sm text-[#6B8C7B] sm:text-center">
                  {post.view_count}
                </span>
                <span className="text-xs sm:text-sm text-[#6B8C7B] sm:text-center flex items-center justify-center gap-1">
                  <Heart className="w-3 h-3" /> {likeNum}
                </span>
              </Link>
            );
          })}
        </div>

        {/* 글쓰기 버튼 */}
        <div className="flex justify-end mt-6">
          <BoardWriteButton category={category} />
        </div>
      </section>
    </div>
  );
}
