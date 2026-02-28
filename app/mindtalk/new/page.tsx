"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth-context";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { toast } from "sonner";

export default function MindtalkNewPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!user) {
    return (
      <div className="max-w-[1200px] mx-auto px-6 py-20 text-center">
        <h1 className="font-heading text-3xl font-bold text-[#1E3A26] mb-4">마음톡 글쓰기</h1>
        <p className="text-[#6B8C7B] mb-8">글쓰기를 위해 로그인이 필요합니다.</p>
        <Link href="/login">
          <Button className="bg-[#4A8C5E] hover:bg-[#3D7A4E]">로그인하기</Button>
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
      const { error } = await supabase.from("mindtalk_posts").insert({
        user_id: user.id,
        title: title.trim(),
        content: content.trim(),
        is_private: isPrivate,
      });

      if (error) throw error;

      toast.success("글이 등록되었습니다.");
      router.push("/mindtalk");
    } catch {
      toast.error("글 등록에 실패했습니다. 다시 시도해 주세요.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#F0FAF3] min-h-screen">
      <div className="max-w-[800px] mx-auto px-6 py-12">
        <h1 className="font-heading text-3xl font-bold text-[#1E3A26] mb-8">마음톡 글쓰기</h1>

        <Card className="border-[#D0E8D8] rounded-2xl">
          <CardHeader>
            <CardTitle className="font-heading text-xl">마음 속 이야기를 나눠주세요</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="text-sm font-medium text-[#1E3A26] mb-2 block">제목</label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="제목을 입력해 주세요"
                  className="border-[#D0E8D8] rounded-xl"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium text-[#1E3A26] mb-2 block">내용</label>
                <Textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="상담받고 싶은 내용을 자유롭게 적어주세요."
                  className="border-[#D0E8D8] rounded-xl min-h-[200px]"
                  required
                />
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="private"
                  checked={isPrivate}
                  onChange={(e) => setIsPrivate(e.target.checked)}
                  className="w-4 h-4 rounded border-[#D0E8D8]"
                />
                <label htmlFor="private" className="text-sm text-[#1E3A26]">
                  비공개 (본인과 상담사만 열람 가능)
                </label>
              </div>

              <div className="flex gap-3">
                <Link href="/mindtalk">
                  <Button type="button" variant="outline" className="border-[#D0E8D8]">취소</Button>
                </Link>
                <Button
                  type="submit"
                  disabled={loading}
                  className="bg-[#4A85D4] hover:bg-[#C47A52] text-white"
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
