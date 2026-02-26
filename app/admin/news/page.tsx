"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Link from "next/link";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";

interface NewsItem {
  id: string;
  category: "center" | "event";
  title: string;
  created_at: string;
  starts_at: string | null;
  ends_at: string | null;
}

const categoryLabels: Record<string, string> = {
  center: "센터소식",
  event: "이벤트",
};

export default function AdminNewsPage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "center" | "event">("all");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchNews();
  }, []);

  async function fetchNews() {
    const supabase = createClient();
    const { data } = await supabase
      .from("news_posts")
      .select("id, category, title, created_at, starts_at, ends_at")
      .order("created_at", { ascending: false });
    setNews(data ?? []);
    setLoading(false);
  }

  const filtered = filter === "all" ? news : news.filter((n) => n.category === filter);

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.from("news_posts").delete().eq("id", deleteId);
      if (error) throw error;
      toast.success("삭제되었습니다.");
      setNews((prev) => prev.filter((n) => n.id !== deleteId));
    } catch {
      toast.error("삭제에 실패했습니다.");
    } finally {
      setDeleting(false);
      setDeleteId(null);
    }
  };

  return (
    <div className="p-6 md:p-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-heading text-2xl font-bold text-[#3A2E26]">센터소식 관리</h1>
        <Link href="/admin/news/new">
          <Button className="bg-[#D4845A] hover:bg-[#C47A52] text-white rounded-xl">
            <Plus className="w-4 h-4 mr-1" /> 새 소식 작성
          </Button>
        </Link>
      </div>

      {/* 필터 */}
      <div className="flex gap-2 mb-6">
        {(["all", "center", "event"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
              filter === f
                ? "bg-[#8B6B4E] text-white"
                : "bg-white text-[#8C7B6B] border border-[#E8DDD0] hover:border-[#C4A882]"
            }`}
          >
            {f === "all" ? "전체" : categoryLabels[f]}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-12 text-[#8C7B6B]">로딩 중...</div>
      ) : filtered.length === 0 ? (
        <Card className="border-[#E8DDD0] rounded-2xl">
          <CardContent className="p-8 text-center text-[#8C7B6B]">등록된 소식이 없습니다.</CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {filtered.map((item) => (
            <Card key={item.id} className="border-[#E8DDD0] rounded-2xl">
              <CardContent className="flex items-center justify-between p-4 sm:p-6">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="outline" className="border-[#E8DDD0] text-xs shrink-0">
                      {categoryLabels[item.category]}
                    </Badge>
                    <p className="font-medium text-[#3A2E26] truncate">{item.title}</p>
                  </div>
                  <p className="text-xs text-[#8C7B6B]">
                    {new Date(item.created_at).toLocaleDateString("ko-KR")}
                  </p>
                </div>
                <div className="flex gap-2 shrink-0 ml-4">
                  <Link href={`/admin/news/${item.id}/edit`}>
                    <Button variant="outline" size="sm" className="border-[#E8DDD0] text-[#8C7B6B]">
                      <Pencil className="w-4 h-4" />
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setDeleteId(item.id)}
                    className="border-[#E8DDD0] text-red-500 hover:text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* 삭제 확인 Dialog */}
      <Dialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>소식 삭제</DialogTitle>
            <DialogDescription>정말로 이 소식을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteId(null)} className="border-[#E8DDD0]">
              취소
            </Button>
            <Button onClick={handleDelete} disabled={deleting} className="bg-red-500 hover:bg-red-600 text-white">
              {deleting ? "삭제 중..." : "삭제"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
