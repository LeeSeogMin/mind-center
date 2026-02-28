"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
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
import { ArrowLeft, Heart, MessageCircle, Pencil, Trash2 } from "lucide-react";
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

interface Comment {
  id: string;
  content: string;
  created_at: string;
  author_id: string;
  users: { name: string; role: string } | null;
}

export default function BoardDetailPage() {
  const params = useParams();
  const router = useRouter();
  const postId = params.id as string;
  const category = params.category as string;
  const { user, profile } = useAuth();
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deletingCommentId, setDeletingCommentId] = useState<string | null>(null);
  const [likeCount, setLikeCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const fetchPost = useCallback(async () => {
    const supabase = createClient();
    const { data } = await supabase
      .from("board_posts")
      .select("*, users:author_id(name, role)")
      .eq("id", postId)
      .single();
    setPost(data);
  }, [postId]);

  const fetchComments = useCallback(async () => {
    const supabase = createClient();
    const { data } = await supabase
      .from("board_comments")
      .select("*, users:author_id(name, role)")
      .eq("post_id", postId)
      .order("created_at", { ascending: true });
    setComments(data ?? []);
  }, [postId]);

  const fetchLikes = useCallback(async () => {
    const supabase = createClient();
    const { count } = await supabase
      .from("board_likes")
      .select("*", { count: "exact", head: true })
      .eq("post_id", postId);
    setLikeCount(count ?? 0);

    if (user) {
      const { data } = await supabase
        .from("board_likes")
        .select("id")
        .eq("post_id", postId)
        .eq("user_id", user.id)
        .maybeSingle();
      setIsLiked(!!data);
    }
  }, [postId, user]);

  useEffect(() => {
    async function load() {
      await Promise.all([fetchPost(), fetchComments(), fetchLikes()]);
      const supabase = createClient();
      await supabase.rpc("increment_view_count", { post_id: postId });
      setLoading(false);
    }
    load();
  }, [fetchPost, fetchComments, fetchLikes, postId]);

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

  const handleCommentSubmit = async () => {
    if (!comment.trim() || !user) return;

    setSubmitting(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.from("board_comments").insert({
        post_id: postId,
        author_id: user.id,
        content: comment.trim(),
      });

      if (error) throw error;

      toast.success("댓글이 등록되었습니다.");
      setComment("");
      await fetchComments();
    } catch {
      toast.error("댓글 등록에 실패했습니다.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    setDeletingCommentId(commentId);
    try {
      const supabase = createClient();
      const { error } = await supabase
        .from("board_comments")
        .delete()
        .eq("id", commentId);
      if (error) throw error;
      toast.success("댓글이 삭제되었습니다.");
      await fetchComments();
    } catch {
      toast.error("댓글 삭제에 실패했습니다.");
    } finally {
      setDeletingCommentId(null);
    }
  };

  const handleToggleLike = async () => {
    if (!user) {
      toast.error("로그인이 필요합니다.");
      return;
    }
    try {
      const supabase = createClient();
      if (isLiked) {
        const { error } = await supabase
          .from("board_likes")
          .delete()
          .eq("post_id", postId)
          .eq("user_id", user.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("board_likes")
          .insert({ post_id: postId, user_id: user.id });
        if (error) throw error;
      }
      await fetchLikes();
    } catch {
      toast.error("좋아요 처리에 실패했습니다.");
    }
  };

  if (loading) {
    return (
      <div className="bg-[#F0FAF3] min-h-screen flex items-center justify-center">
        <p className="text-[#6B8C7B]">로딩 중...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="bg-[#F0FAF3] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-[#1E3A26] font-medium mb-2">게시글을 찾을 수 없습니다.</p>
          <Link href={`/board/${category}`} className="text-sm text-[#4A8C5E] hover:underline">
            목록으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  const isOwner = user?.id === post.author_id;
  const authorName = post.users?.name ?? "익명";

  return (
    <div className="bg-[#F0FAF3] min-h-screen">
      <div className="max-w-[800px] mx-auto px-6 py-12">
        <Link
          href={`/board/${category}`}
          className="inline-flex items-center gap-2 text-sm text-[#6B8C7B] hover:text-[#4A8C5E] mb-6"
        >
          <ArrowLeft className="w-4 h-4" /> 목록으로 돌아가기
        </Link>

        <Card className="border-[#D0E8D8] rounded-2xl">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="font-heading text-2xl">{post.title}</CardTitle>
              {isOwner && (
                <div className="flex gap-2">
                  <Link href={`/board/${category}/${postId}/edit`}>
                    <Button variant="outline" size="sm" className="border-[#D0E8D8] text-[#6B8C7B]">
                      <Pencil className="w-4 h-4 mr-1" /> 수정
                    </Button>
                  </Link>
                  <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="border-[#D0E8D8] text-red-500 hover:text-red-600">
                        <Trash2 className="w-4 h-4 mr-1" /> 삭제
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>게시글 삭제</DialogTitle>
                        <DialogDescription>정말로 이 게시글을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.</DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setDialogOpen(false)} className="border-[#D0E8D8]">
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
            <p className="text-sm text-[#6B8C7B]">
              {authorName} · {new Date(post.created_at).toLocaleDateString("ko-KR")} · 조회 {post.view_count}
            </p>
          </CardHeader>
          <CardContent>
            <p className="text-[#1E3A26] leading-relaxed whitespace-pre-line">{post.content}</p>
            <div className="mt-6 pt-4 border-t border-[#D0E8D8] flex items-center gap-2">
              <button
                onClick={handleToggleLike}
                className="flex items-center gap-1.5 text-sm transition-colors hover:opacity-80"
              >
                <Heart
                  className={`w-5 h-5 ${isLiked ? "fill-red-500 text-red-500" : "text-[#6B8C7B]"}`}
                />
                <span className={isLiked ? "text-red-500" : "text-[#6B8C7B]"}>{likeCount}</span>
              </button>
            </div>
          </CardContent>
        </Card>

        {/* 댓글 섹션 */}
        <div className="mt-8 space-y-4">
          <div className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-[#4A8C5E]" />
            <h3 className="font-heading text-lg font-bold text-[#1E3A26]">
              댓글 ({comments.length})
            </h3>
          </div>

          {comments.length === 0 && (
            <p className="text-sm text-[#6B8C7B] py-4">아직 댓글이 없습니다.</p>
          )}

          {comments.map((c) => {
            const isCounselor = c.users?.role === "counselor" || c.users?.role === "admin";
            return (
              <Card key={c.id} className={`rounded-2xl bg-white ${isCounselor ? "border-[#8CC4A0]" : "border-[#D0E8D8]"}`}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Avatar className="w-10 h-10">
                      <AvatarFallback className={`text-white text-sm ${isCounselor ? "bg-[#4A8C5E]" : "bg-[#8CC4A0]"}`}>
                        {(c.users?.name ?? "?")[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-[#1E3A26]">{c.users?.name ?? "익명"}</p>
                      <p className="text-xs text-[#6B8C7B]">{new Date(c.created_at).toLocaleDateString("ko-KR")}</p>
                    </div>
                    {isCounselor && (
                      <Badge className="bg-[#8CC4A0] text-white ml-auto">상담사</Badge>
                    )}
                    {(user?.id === c.author_id || profile?.role === "counselor" || profile?.role === "admin") && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteComment(c.id)}
                        disabled={deletingCommentId === c.id}
                        className="text-red-400 hover:text-red-500 ml-auto"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                  <p className="text-[#1E3A26] leading-relaxed whitespace-pre-line">{c.content}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* 댓글 작성 폼 */}
        {user ? (
          <>
            <Separator className="my-8 bg-[#D0E8D8]" />
            <Card className="border-[#D0E8D8] rounded-2xl">
              <CardContent className="p-6">
                <Textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="댓글을 작성해 주세요..."
                  className="border-[#D0E8D8] rounded-xl min-h-[100px] mb-4"
                />
                <Button
                  onClick={handleCommentSubmit}
                  disabled={submitting || !comment.trim()}
                  className="bg-[#4A8C5E] hover:bg-[#3D7A4E]"
                >
                  {submitting ? "등록 중..." : "댓글 등록"}
                </Button>
              </CardContent>
            </Card>
          </>
        ) : (
          <>
            <Separator className="my-8 bg-[#D0E8D8]" />
            <div className="text-center py-4">
              <p className="text-sm text-[#6B8C7B] mb-2">댓글을 작성하려면 로그인이 필요합니다.</p>
              <Link href="/login">
                <Button variant="outline" className="border-[#D0E8D8]">로그인하기</Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
