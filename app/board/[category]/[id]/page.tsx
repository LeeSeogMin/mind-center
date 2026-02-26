"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";
import { ArrowLeft, Pencil, Trash2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/lib/auth-context";
import { toast } from "sonner";

interface Post {
  id: string;
  author_id: string;
  category: string;
  title: string;
  content: string;
  view_count: number;
  created_at: string;
  users: { name: string; role: string } | null;
}

export default function BoardDetailPage() {
  const params = useParams();
  const router = useRouter();
  const postId = params.id as string;
  const category = params.category as string;
  const { user } = useAuth();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const fetchPost = useCallback(async () => {
    const supabase = createClient();
    const { data } = await supabase
      .from("board_posts")
      .select("*, users:author_id(name, role)")
      .eq("id", postId)
      .single();
    setPost(data);
  }, [postId]);

  useEffect(() => {
    async function load() {
      await fetchPost();
      const supabase = createClient();
      await supabase.rpc("increment_view_count", { post_id: postId });
      setLoading(false);
    }
    load();
  }, [fetchPost, postId]);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      const supabase = createClient();
      const { error } = await supabase
        .from("board_posts")
        .delete()
        .eq("id", postId);
      if (error) throw error;
      toast.success("게시글이 삭제되었습니다.");
      router.push(`/board/${category}`);
    } catch {
      toast.error("삭제에 실패했습니다.");
    } finally {
      setDeleting(false);
      setDialogOpen(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-[#FBF8F3] min-h-screen flex items-center justify-center">
        <p className="text-[#8C7B6B]">로딩 중...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="bg-[#FBF8F3] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-[#3A2E26] font-medium mb-2">게시글을 찾을 수 없습니다.</p>
          <Link href={`/board/${category}`} className="text-sm text-[#8B6B4E] hover:underline">
            목록으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  const isOwner = user?.id === post.author_id;
  const authorName = post.users?.name ?? "익명";

  return (
    <div className="bg-[#FBF8F3] min-h-screen">
      <div className="max-w-[800px] mx-auto px-6 py-12">
        <Link
          href={`/board/${category}`}
          className="inline-flex items-center gap-2 text-sm text-[#8C7B6B] hover:text-[#8B6B4E] mb-6"
        >
          <ArrowLeft className="w-4 h-4" /> 목록으로 돌아가기
        </Link>

        <Card className="border-[#E8DDD0] rounded-2xl">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="font-heading text-2xl">{post.title}</CardTitle>
              {isOwner && (
                <div className="flex gap-2">
                  <Link href={`/board/${category}/${postId}/edit`}>
                    <Button variant="outline" size="sm" className="border-[#E8DDD0] text-[#8C7B6B]">
                      <Pencil className="w-4 h-4 mr-1" /> 수정
                    </Button>
                  </Link>
                  <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="border-[#E8DDD0] text-red-500 hover:text-red-600">
                        <Trash2 className="w-4 h-4 mr-1" /> 삭제
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>게시글 삭제</DialogTitle>
                        <DialogDescription>정말로 이 게시글을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.</DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setDialogOpen(false)} className="border-[#E8DDD0]">
                          취소
                        </Button>
                        <Button onClick={handleDelete} disabled={deleting} className="bg-red-500 hover:bg-red-600 text-white">
                          {deleting ? "삭제 중..." : "삭제"}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              )}
            </div>
            <p className="text-sm text-[#8C7B6B]">
              {authorName} · {new Date(post.created_at).toLocaleDateString("ko-KR")} · 조회 {post.view_count}
            </p>
          </CardHeader>
          <CardContent>
            <p className="text-[#3A2E26] leading-relaxed whitespace-pre-line">{post.content}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
