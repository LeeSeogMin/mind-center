"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { createClient } from "@/lib/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

interface MyPost {
  id: string;
  type: "mindtalk" | "board";
  title: string;
  created_at: string;
  category?: string;
  is_answered?: boolean;
}

export default function MyPostsPage() {
  const { user } = useAuth();
  const [posts, setPosts] = useState<MyPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    async function fetch() {
      const supabase = createClient();
      const [mindtalkRes, boardRes] = await Promise.all([
        supabase
          .from("mindtalk_posts")
          .select("id, title, created_at, is_answered")
          .eq("user_id", user!.id)
          .order("created_at", { ascending: false }),
        supabase
          .from("board_posts")
          .select("id, title, created_at, category")
          .eq("author_id", user!.id)
          .order("created_at", { ascending: false }),
      ]);

      const mindtalks: MyPost[] = (mindtalkRes.data ?? []).map((p) => ({
        ...p,
        type: "mindtalk" as const,
      }));
      const boards: MyPost[] = (boardRes.data ?? []).map((p) => ({
        ...p,
        type: "board" as const,
      }));

      const merged = [...mindtalks, ...boards].sort(
        (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
      setPosts(merged);
      setLoading(false);
    }
    fetch();
  }, [user]);

  if (loading) {
    return (
      <div className="bg-[#F0FAF3] min-h-screen flex items-center justify-center">
        <p className="text-[#6B8C7B]">로딩 중...</p>
      </div>
    );
  }

  function getPostLink(post: MyPost) {
    if (post.type === "mindtalk") return `/mindtalk/${post.id}`;
    return `/board/${post.category ?? "review"}/${post.id}`;
  }

  function getTypeLabel(post: MyPost) {
    if (post.type === "mindtalk") return "마음톡";
    if (post.category === "review") return "상담후기";
    if (post.category === "column") return "칼럼";
    return "게시판";
  }

  return (
    <div className="bg-[#F0FAF3] min-h-screen">
      <div className="max-w-[1200px] mx-auto px-6 py-12">
        <h1 className="font-heading text-3xl font-bold text-[#1E3A26] mb-8">내 글</h1>

        {posts.length === 0 ? (
          <Card className="border-[#D0E8D8] rounded-2xl">
            <CardContent className="p-8 text-center text-[#6B8C7B]">
              작성한 글이 없습니다.
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <Link key={`${post.type}-${post.id}`} href={getPostLink(post)}>
                <Card className="border-[#D0E8D8] rounded-2xl hover:border-[#8CC4A0] transition-colors cursor-pointer">
                  <CardContent className="flex items-center justify-between p-6">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline" className="border-[#D0E8D8] text-xs">
                          {getTypeLabel(post)}
                        </Badge>
                        <p className="font-medium text-[#1E3A26]">{post.title}</p>
                      </div>
                      <p className="text-sm text-[#6B8C7B]">
                        {new Date(post.created_at).toLocaleDateString("ko-KR")}
                      </p>
                    </div>
                    {post.type === "mindtalk" && (
                      <Badge
                        className={post.is_answered ? "bg-[#4A8C5E]" : "border-[#D0E8D8] text-[#6B8C7B]"}
                        variant={post.is_answered ? "default" : "outline"}
                      >
                        {post.is_answered ? "답변완료" : "답변대기"}
                      </Badge>
                    )}
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
