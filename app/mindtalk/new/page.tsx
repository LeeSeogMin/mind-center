"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth-context";
import Link from "next/link";

export default function MindtalkNewPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);

  if (!user) {
    return (
      <div className="max-w-[1200px] mx-auto px-6 py-20 text-center">
        <h1 className="font-heading text-3xl font-bold text-[#3A2E26] mb-4">마음톡 글쓰기</h1>
        <p className="text-[#8C7B6B] mb-8">글쓰기를 위해 로그인이 필요합니다.</p>
        <Link href="/login">
          <Button className="bg-[#8B6B4E] hover:bg-[#7A5D42]">로그인하기</Button>
        </Link>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Supabase insert
    alert("글이 등록되었습니다.");
    router.push("/mindtalk");
  };

  return (
    <div className="bg-[#FBF8F3] min-h-screen">
      <div className="max-w-[800px] mx-auto px-6 py-12">
        <h1 className="font-heading text-3xl font-bold text-[#3A2E26] mb-8">마음톡 글쓰기</h1>

        <Card className="border-[#E8DDD0] rounded-2xl">
          <CardHeader>
            <CardTitle className="font-heading text-xl">마음 속 이야기를 나눠주세요</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
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
                  placeholder="상담받고 싶은 내용을 자유롭게 적어주세요."
                  className="border-[#E8DDD0] rounded-xl min-h-[200px]"
                  required
                />
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="private"
                  checked={isPrivate}
                  onChange={(e) => setIsPrivate(e.target.checked)}
                  className="w-4 h-4 rounded border-[#E8DDD0]"
                />
                <label htmlFor="private" className="text-sm text-[#3A2E26]">
                  비공개 (본인과 상담사만 열람 가능)
                </label>
              </div>

              <div className="flex gap-3">
                <Link href="/mindtalk">
                  <Button type="button" variant="outline" className="border-[#E8DDD0]">취소</Button>
                </Link>
                <Button type="submit" className="bg-[#D4845A] hover:bg-[#C47A52] text-white">등록하기</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
