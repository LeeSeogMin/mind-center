import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, PenLine, Lock } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "마음톡" };

export default async function MindtalkPage() {
  const supabase = await createClient();
  const { data: posts } = await supabase
    .from("mindtalk_posts")
    .select("id, title, is_private, is_answered, created_at, users(name)")
    .order("created_at", { ascending: false });

  const postList = posts ?? [];

  return (
    <div className="bg-[#FBF8F3] min-h-screen">
      <div className="max-w-[1200px] mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-heading text-3xl font-bold text-[#3A2E26] mb-2">마음톡</h1>
            <p className="text-[#8C7B6B]">마음 속 이야기를 나누고, 전문 상담사의 답변을 받아보세요.</p>
          </div>
          <Link href="/mindtalk/new">
            <Button className="bg-[#D4845A] hover:bg-[#C47A52] text-white gap-2">
              <PenLine className="w-4 h-4" />
              글쓰기
            </Button>
          </Link>
        </div>

        {/* Info */}
        <div className="bg-white border border-[#E8DDD0] rounded-2xl p-6 mb-8">
          <div className="flex items-start gap-3">
            <MessageCircle className="w-5 h-5 text-[#8B6B4E] mt-0.5" />
            <div className="text-sm text-[#8C7B6B]">
              <p className="font-medium text-[#3A2E26] mb-1">마음톡 이용 안내</p>
              <p>• 상담 내용을 글로 남기면 전문 상담사가 댓글로 답변해 드립니다.</p>
              <p>• 비공개 글은 본인과 상담사만 열람할 수 있습니다.</p>
              <p>• 글쓰기를 위해서는 로그인이 필요합니다.</p>
            </div>
          </div>
        </div>

        {/* Post list */}
        <div className="space-y-3">
          {postList.length === 0 && (
            <div className="text-center py-12 text-[#8C7B6B]">
              <p>아직 작성된 글이 없습니다.</p>
              <p className="text-sm mt-1">첫 번째 마음톡을 작성해 보세요.</p>
            </div>
          )}
          {postList.map((post) => {
            const users = post.users as unknown as { name: string } | null;
            const userName = users?.name ?? "익명";
            const maskedName = userName.length > 1
              ? userName[0] + "O".repeat(userName.length - 1)
              : userName;

            return (
              <Link key={post.id} href={`/mindtalk/${post.id}`}>
                <Card className="border-[#E8DDD0] rounded-xl hover:border-[#C4A882] transition-colors cursor-pointer">
                  <CardContent className="flex items-center justify-between p-5">
                    <div className="flex items-center gap-3">
                      {post.is_private && <Lock className="w-4 h-4 text-[#8C7B6B]" />}
                      <div>
                        <p className="font-medium text-[#3A2E26]">
                          {post.is_private ? "비공개 상담입니다" : post.title}
                        </p>
                        <p className="text-xs text-[#8C7B6B] mt-1">
                          {maskedName} · {new Date(post.created_at).toLocaleDateString("ko-KR")}
                        </p>
                      </div>
                    </div>
                    <Badge
                      variant={post.is_answered ? "default" : "outline"}
                      className={post.is_answered ? "bg-[#8B6B4E]" : "border-[#E8DDD0] text-[#8C7B6B]"}
                    >
                      {post.is_answered ? "답변완료" : "답변대기"}
                    </Badge>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
