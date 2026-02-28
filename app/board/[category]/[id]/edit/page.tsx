"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth-context";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { toast } from "sonner";

export default function BoardEditPage() {
  const params = useParams();
  const router = useRouter();
  const postId = params.id as string;
  const category = params.category as string;
  const { user } = useAuth();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const fetchPost = useCallback(async () => {
    const supabase = createClient();
    const { data } = await supabase
      .from("board_posts")
      .select("*")
      .eq("id", postId)
      .single();

    if (!data) {
      toast.error("게시글을 찾을 수 없습니다.");
      router.push(`/board/${category}`);
      return;
    }

    if (user && data.author_id !== user.id) {
      toast.error("수정 권한이 없습니다.");
      router.push(`/board/${category}/${postId}`);
      return;
    }

    setTitle(data.title);
    setContent(data.content);
    setLoading(false);
  }, [postId, category, user, router]);

  useEffect(() => {
    if (user) fetchPost();
  }, [user, fetchPost]);

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

    setSubmitting(true);
    try {
      const supabase = createClient();
      const { error } = await supabase
        .from("board_posts")
        .update({ title: title.trim(), content: content.trim() })
        .eq("id", postId);

      if (error) throw error;

      toast.success("게시글이 수정되었습니다.");
      router.push(`/board/${category}/${postId}`);
    } catch {
      toast.error("수정에 실패했습니다. 다시 시도해 주세요.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-[#F0FAF3] min-h-screen flex items-center justify-center">
        <p className="text-[#6B8C7B]">로딩 중...</p>
      </div>
    );
  }

  return (
    <div className="bg-[#F0FAF3] min-h-screen">
      <div className="max-w-[800px] mx-auto px-6 py-12">
        <h1 className="font-heading text-3xl font-bold text-[#1E3A26] mb-8">게시글 수정</h1>

        <Card className="border-[#D0E8D8] rounded-2xl">
          <CardHeader>
            <CardTitle className="font-heading text-xl">글 수정</CardTitle>
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
                  placeholder="내용을 입력해 주세요"
                  className="border-[#D0E8D8] rounded-xl min-h-[200px]"
                  required
                />
              </div>

              <div className="flex gap-3">
                <Link href={`/board/${category}/${postId}`}>
                  <Button type="button" variant="outline" className="border-[#D0E8D8]">취소</Button>
                </Link>
                <Button
                  type="submit"
                  disabled={submitting}
                  className="bg-[#4A85D4] hover:bg-[#C47A52] text-white"
                >
                  {submitting ? "수정 중..." : "수정하기"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
