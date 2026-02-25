import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "내 글" };

const MY_POSTS = [
  { id: "1", type: "mindtalk", title: "직장 스트레스가 너무 심해요", date: "2025-02-20", is_answered: true },
  { id: "2", type: "review", title: "상담 후기 — 성인 상담을 받고 나서", date: "2025-02-16", category: "review" },
  { id: "3", type: "mindtalk", title: "불안감이 일상생활을 방해해요", date: "2025-02-10", is_answered: false },
];

export default function MyPostsPage() {
  return (
    <div className="bg-[#FBF8F3] min-h-screen">
      <div className="max-w-[1200px] mx-auto px-6 py-12">
        <h1 className="font-heading text-3xl font-bold text-[#3A2E26] mb-8">내 글</h1>

        <div className="space-y-4">
          {MY_POSTS.map((post) => (
            <Link
              key={`${post.type}-${post.id}`}
              href={post.type === "mindtalk" ? `/mindtalk/${post.id}` : `/board/${post.category}`}
            >
              <Card className="border-[#E8DDD0] rounded-2xl hover:border-[#C4A882] transition-colors cursor-pointer">
                <CardContent className="flex items-center justify-between p-6">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="outline" className="border-[#E8DDD0] text-xs">
                        {post.type === "mindtalk" ? "마음톡" : "상담후기"}
                      </Badge>
                      <p className="font-medium text-[#3A2E26]">{post.title}</p>
                    </div>
                    <p className="text-sm text-[#8C7B6B]">{post.date}</p>
                  </div>
                  {post.type === "mindtalk" && (
                    <Badge className={post.is_answered ? "bg-[#8B6B4E]" : "border-[#E8DDD0] text-[#8C7B6B]"} variant={post.is_answered ? "default" : "outline"}>
                      {post.is_answered ? "답변완료" : "답변대기"}
                    </Badge>
                  )}
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
