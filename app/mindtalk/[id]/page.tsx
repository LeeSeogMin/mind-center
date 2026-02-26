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
import { ArrowLeft, MessageCircle, Pencil, Trash2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/lib/auth-context";
import { toast } from "sonner";

interface Post {
  id: string;
  title: string;
  content: string;
  is_private: boolean;
  is_answered: boolean;
  created_at: string;
  user_id: string;
  users: { name: string } | null;
}

interface Comment {
  id: string;
  content: string;
  created_at: string;
  author_id: string;
  users: { name: string; role: string } | null;
}

export default function MindtalkDetailPage() {
  const params = useParams();
  const router = useRouter();
  const postId = params.id as string;
  const { user, profile } = useAuth();
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deletingCommentId, setDeletingCommentId] = useState<string | null>(null);

  const fetchPost = useCallback(async () => {
    const supabase = createClient();
    const { data } = await supabase
      .from("mindtalk_posts")
      .select("*, users(name)")
      .eq("id", postId)
      .single();
    setPost(data);
  }, [postId]);

  const fetchComments = useCallback(async () => {
    const supabase = createClient();
    const { data } = await supabase
      .from("mindtalk_comments")
      .select("*, users:author_id(name, role)")
      .eq("post_id", postId)
      .order("created_at", { ascending: true });
    setComments(data ?? []);
  }, [postId]);

  useEffect(() => {
    async function load() {
      await Promise.all([fetchPost(), fetchComments()]);
      setLoading(false);
    }
    load();
  }, [fetchPost, fetchComments]);

  const handleCommentSubmit = async () => {
    if (!comment.trim() || !user) return;

    setSubmitting(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.from("mindtalk_comments").insert({
        post_id: postId,
        author_id: user.id,
        content: comment.trim(),
      });

      if (error) throw error;

      toast.success("답글이 등록되었습니다.");
      setComment("");
      await fetchComments();
    } catch {
      toast.error("답글 등록에 실패했습니다.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeletePost = async () => {
    setDeleting(true);
    try {
      const supabase = createClient();
      const { error } = await supabase
        .from("mindtalk_posts")
        .delete()
        .eq("id", postId);
      if (error) throw error;
      toast.success("글이 삭제되었습니다.");
      router.push("/mindtalk");
    } catch {
      toast.error("삭제에 실패했습니다.");
    } finally {
      setDeleting(false);
      setDeleteDialogOpen(false);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    setDeletingCommentId(commentId);
    try {
      const supabase = createClient();
      const { error } = await supabase
        .from("mindtalk_comments")
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
          <p className="text-[#3A2E26] font-medium mb-2">글을 찾을 수 없습니다.</p>
          <Link href="/mindtalk" className="text-sm text-[#8B6B4E] hover:underline">
            목록으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  const userName = post.users?.name ?? "익명";
  const maskedName = userName.length > 1
    ? userName[0] + "O".repeat(userName.length - 1)
    : userName;

  return (
    <div className="bg-[#FBF8F3] min-h-screen">
      <div className="max-w-[800px] mx-auto px-6 py-12">
        <Link href="/mindtalk" className="inline-flex items-center gap-2 text-sm text-[#8C7B6B] hover:text-[#8B6B4E] mb-6">
          <ArrowLeft className="w-4 h-4" /> 목록으로 돌아가기
        </Link>

        {/* Post */}
        <Card className="border-[#E8DDD0] rounded-2xl mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="font-heading text-2xl">{post.title}</CardTitle>
              <Badge className={post.is_answered ? "bg-[#8B6B4E]" : "border-[#E8DDD0] text-[#8C7B6B]"}>
                {post.is_answered ? "답변완료" : "답변대기"}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm text-[#8C7B6B]">
                {maskedName} · {new Date(post.created_at).toLocaleDateString("ko-KR")}
              </p>
              {user?.id === post.user_id && (
                <div className="flex gap-2">
                  <Link href={`/mindtalk/${postId}/edit`}>
                    <Button variant="outline" size="sm" className="border-[#E8DDD0] text-[#8C7B6B]">
                      <Pencil className="w-4 h-4 mr-1" /> 수정
                    </Button>
                  </Link>
                  <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="border-[#E8DDD0] text-red-500 hover:text-red-600">
                        <Trash2 className="w-4 h-4 mr-1" /> 삭제
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>글 삭제</DialogTitle>
                        <DialogDescription>정말로 이 글을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.</DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setDeleteDialogOpen(false)} className="border-[#E8DDD0]">
                          취소
                        </Button>
                        <Button onClick={handleDeletePost} disabled={deleting} className="bg-red-500 hover:bg-red-600 text-white">
                          {deleting ? "삭제 중..." : "삭제"}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-[#3A2E26] leading-relaxed whitespace-pre-line">{post.content}</p>
          </CardContent>
        </Card>

        {/* Comments */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-[#8B6B4E]" />
            <h3 className="font-heading text-lg font-bold text-[#3A2E26]">
              답변 ({comments.length})
            </h3>
          </div>

          {comments.length === 0 && (
            <p className="text-sm text-[#8C7B6B] py-4">아직 답변이 없습니다.</p>
          )}

          {comments.map((c) => {
            const isCounselor = c.users?.role === "counselor" || c.users?.role === "admin";
            return (
              <Card key={c.id} className={`rounded-2xl bg-white ${isCounselor ? "border-[#C4A882]" : "border-[#E8DDD0]"}`}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Avatar className="w-10 h-10">
                      <AvatarFallback className={`text-white text-sm ${isCounselor ? "bg-[#8B6B4E]" : "bg-[#C4A882]"}`}>
                        {(c.users?.name ?? "?")[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-[#3A2E26]">{c.users?.name ?? "익명"}</p>
                      <p className="text-xs text-[#8C7B6B]">{new Date(c.created_at).toLocaleDateString("ko-KR")}</p>
                    </div>
                    {isCounselor && (
                      <Badge className="bg-[#C4A882] text-white ml-auto">상담사</Badge>
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
                  <p className="text-[#3A2E26] leading-relaxed whitespace-pre-line">{c.content}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Reply form */}
        {user && (
          <>
            <Separator className="my-8 bg-[#E8DDD0]" />
            <Card className="border-[#E8DDD0] rounded-2xl">
              <CardContent className="p-6">
                <Textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="답글을 작성해 주세요..."
                  className="border-[#E8DDD0] rounded-xl min-h-[100px] mb-4"
                />
                <Button
                  onClick={handleCommentSubmit}
                  disabled={submitting || !comment.trim()}
                  className="bg-[#8B6B4E] hover:bg-[#7A5D42]"
                >
                  {submitting ? "등록 중..." : "답글 등록"}
                </Button>
              </CardContent>
            </Card>
          </>
        )}

        {!user && (
          <>
            <Separator className="my-8 bg-[#E8DDD0]" />
            <div className="text-center py-4">
              <p className="text-sm text-[#8C7B6B] mb-2">답글을 작성하려면 로그인이 필요합니다.</p>
              <Link href="/login">
                <Button variant="outline" className="border-[#E8DDD0]">로그인하기</Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
