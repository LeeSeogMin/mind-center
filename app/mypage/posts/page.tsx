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
      <div className="bg-[#FBF8F3] min-h-screen flex items-center justify-center">
        <p className="text-[#8C7B6B]">로딩 중...</p>
      </div>
    );
  }

  function getPostLink(post: MyPost) {
    if (post.type === "mindtalk") return `/mindtalk/${post.id}`;
    return `/board/${post.category ?? "review"}`;
  }

  function getTypeLabel(post: MyPost) {
    if (post.type === "mindtalk") return "마음톡";
    if (post.category === "review") return "상담후기";
    if (post.category === "column") return "칼럼";
    return "게시판";
  }

  return (
    <div className="bg-[#FBF8F3] min-h-screen">
      <div className="max-w-[1200px] mx-auto px-6 py-12">
        <h1 className="font-heading text-3xl font-bold text-[#3A2E26] mb-8">내 글</h1>

        {posts.length === 0 ? (
          <Card className="border-[#E8DDD0] rounded-2xl">
            <CardContent className="p-8 text-center text-[#8C7B6B]">
              작성한 글이 없습니다.
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <Link key={`${post.type}-${post.id}`} href={getPostLink(post)}>
                <Card className="border-[#E8DDD0] rounded-2xl hover:border-[#C4A882] transition-colors cursor-pointer">
                  <CardContent className="flex items-center justify-between p-6">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline" className="border-[#E8DDD0] text-xs">
                          {getTypeLabel(post)}
                        </Badge>
                        <p className="font-medium text-[#3A2E26]">{post.title}</p>
                      </div>
                      <p className="text-sm text-[#8C7B6B]">
                        {new Date(post.created_at).toLocaleDateString("ko-KR")}
                      </p>
                    </div>
                    {post.type === "mindtalk" && (
                      <Badge
                        className={post.is_answered ? "bg-[#8B6B4E]" : "border-[#E8DDD0] text-[#8C7B6B]"}
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
