"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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

export default function AdminNewsNewPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [category, setCategory] = useState<"center" | "event">("center");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [startsAt, setStartsAt] = useState("");
  const [endsAt, setEndsAt] = useState("");
  const [loading, setLoading] = useState(false);

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
      const { error } = await supabase.from("news_posts").insert({
        author_id: user!.id,
        category,
        title: title.trim(),
        content: content.trim(),
        thumbnail: thumbnail.trim() || null,
        starts_at: category === "event" && startsAt ? startsAt : null,
        ends_at: category === "event" && endsAt ? endsAt : null,
      });

      if (error) throw error;

      toast.success("소식이 등록되었습니다.");
      router.push("/admin/news");
    } catch {
      toast.error("등록에 실패했습니다. 다시 시도해 주세요.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 md:p-10">
      <h1 className="font-heading text-2xl font-bold text-[#3A2E26] mb-8">새 소식 작성</h1>

      <Card className="border-[#E8DDD0] rounded-2xl max-w-[800px]">
        <CardHeader>
          <CardTitle className="font-heading text-xl">소식 작성</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="text-sm font-medium text-[#3A2E26] mb-2 block">카테고리</label>
              <Select value={category} onValueChange={(v) => setCategory(v as "center" | "event")}>
                <SelectTrigger className="border-[#E8DDD0] rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="center">센터소식</SelectItem>
                  <SelectItem value="event">이벤트</SelectItem>
                </SelectContent>
              </Select>
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

            <div>
              <label className="text-sm font-medium text-[#3A2E26] mb-2 block">썸네일 URL (선택)</label>
              <Input
                value={thumbnail}
                onChange={(e) => setThumbnail(e.target.value)}
                placeholder="https://example.com/image.jpg"
                className="border-[#E8DDD0] rounded-xl"
              />
            </div>

            {category === "event" && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-[#3A2E26] mb-2 block">시작일</label>
                  <Input
                    type="date"
                    value={startsAt}
                    onChange={(e) => setStartsAt(e.target.value)}
                    className="border-[#E8DDD0] rounded-xl"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-[#3A2E26] mb-2 block">종료일</label>
                  <Input
                    type="date"
                    value={endsAt}
                    onChange={(e) => setEndsAt(e.target.value)}
                    className="border-[#E8DDD0] rounded-xl"
                  />
                </div>
              </div>
            )}

            <div className="flex gap-3">
              <Link href="/admin/news">
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
  );
}
