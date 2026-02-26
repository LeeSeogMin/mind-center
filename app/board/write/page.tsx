"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/lib/auth-context";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { toast } from "sonner";

const categoryLabels: Record<string, string> = {
  notice: "공지사항",
  review: "상담후기",
  column: "칼럼",
  qna: "Q&A",
};

export default function BoardWritePage() {
  const { user, profile } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const defaultCategory = searchParams.get("category") || "review";
  const isAdmin = profile?.role === "counselor" || profile?.role === "admin";

  const [category, setCategory] = useState(defaultCategory);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  if (!user) {
    return (
      <div className="max-w-[1200px] mx-auto px-6 py-20 text-center">
        <h1 className="font-heading text-3xl font-bold text-[#3A2E26] mb-4">글쓰기</h1>
        <p className="text-[#8C7B6B] mb-8">글쓰기를 위해 로그인이 필요합니다.</p>
        <Link href="/login">
          <Button className="bg-[#8B6B4E] hover:bg-[#7A5D42]">로그인하기</Button>
        </Link>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      toast.error("제목을 입력해 주세요.");
      return;
    }
    if (!content.trim()) {
      toast.error("내용을 입력해 주세요.");
      return;
    }

    setLoading(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.from("board_posts").insert({
        author_id: user.id,
        category,
        title: title.trim(),
        content: content.trim(),
      });

      if (error) throw error;

      toast.success("글이 등록되었습니다.");
      router.push(`/board/${category}`);
    } catch {
      toast.error("글 등록에 실패했습니다. 다시 시도해 주세요.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#FBF8F3] min-h-screen">
      <div className="max-w-[800px] mx-auto px-6 py-12">
        <h1 className="font-heading text-3xl font-bold text-[#3A2E26] mb-8">게시판 글쓰기</h1>

        <Card className="border-[#E8DDD0] rounded-2xl">
          <CardHeader>
            <CardTitle className="font-heading text-xl">새 글 작성</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="text-sm font-medium text-[#3A2E26] mb-2 block">카테고리</label>
                {isAdmin ? (
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger className="border-[#E8DDD0] rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="notice">공지사항</SelectItem>
                      <SelectItem value="review">상담후기</SelectItem>
                      <SelectItem value="column">칼럼</SelectItem>
                      <SelectItem value="qna">Q&A</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <p className="text-sm text-[#8C7B6B] border border-[#E8DDD0] rounded-xl px-3 py-2">
                    {categoryLabels[category] ?? "상담후기"}
                  </p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-[#3A2E26] mb-2 block">제목</label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="제목을 입력해 주세요"
                  className="border-[#E8DDD0] rounded-xl"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium text-[#3A2E26] mb-2 block">내용</label>
                <Textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="내용을 입력해 주세요"
                  className="border-[#E8DDD0] rounded-xl min-h-[200px]"
                  required
                />
              </div>

              <div className="flex gap-3">
                <Link href={`/board/${category}`}>
                  <Button type="button" variant="outline" className="border-[#E8DDD0]">취소</Button>
                </Link>
                <Button
                  type="submit"
                  disabled={loading}
                  className="bg-[#D4845A] hover:bg-[#C47A52] text-white"
                >
                  {loading ? "등록 중..." : "등록하기"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
