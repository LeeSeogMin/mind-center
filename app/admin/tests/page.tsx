"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import type { PsychologicalTest } from "@/lib/types";

interface TestForm {
  name: string;
  description: string;
  duration_min: string;
  price: string;
  tags: string;
  is_active: boolean;
}

const emptyForm: TestForm = {
  name: "",
  description: "",
  duration_min: "",
  price: "0",
  tags: "",
  is_active: true,
};

export default function AdminTestsPage() {
  const [tests, setTests] = useState<PsychologicalTest[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState<TestForm>(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchTests();
  }, []);

  async function fetchTests() {
    const supabase = createClient();
    const { data } = await supabase
      .from("psychological_tests")
      .select("*")
      .order("created_at", { ascending: true });
    setTests(data ?? []);
    setLoading(false);
  }

  function openCreate() {
    setEditId(null);
    setForm(emptyForm);
    setDialogOpen(true);
  }

  function openEdit(test: PsychologicalTest) {
    setEditId(test.id);
    setForm({
      name: test.name,
      description: test.description ?? "",
      duration_min: String(test.duration_min ?? ""),
      price: String(test.price ?? 0),
      tags: (test.tags ?? []).join(", "),
      is_active: test.is_active,
    });
    setDialogOpen(true);
  }

  async function handleSubmit() {
    if (!form.name.trim()) {
      toast.error("검사명을 입력해 주세요.");
      return;
    }

    setSubmitting(true);
    try {
      const supabase = createClient();
      const payload = {
        name: form.name.trim(),
        description: form.description.trim(),
        duration_min: parseInt(form.duration_min) || 0,
        price: parseInt(form.price) || 0,
        tags: form.tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        is_active: form.is_active,
      };

      if (editId) {
        const { error } = await supabase
          .from("psychological_tests")
          .update(payload)
          .eq("id", editId);
        if (error) throw error;
        toast.success("검사가 수정되었습니다.");
      } else {
        const { error } = await supabase
          .from("psychological_tests")
          .insert(payload);
        if (error) throw error;
        toast.success("검사가 추가되었습니다.");
      }

      setDialogOpen(false);
      await fetchTests();
    } catch {
      toast.error("저장에 실패했습니다.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleToggleActive(test: PsychologicalTest) {
    const supabase = createClient();
    const { error } = await supabase
      .from("psychological_tests")
      .update({ is_active: !test.is_active })
      .eq("id", test.id);
    if (error) {
      toast.error("변경에 실패했습니다.");
      return;
    }
    setTests((prev) =>
      prev.map((t) => (t.id === test.id ? { ...t, is_active: !t.is_active } : t))
    );
  }

  async function handleDelete() {
    if (!deleteId) return;
    setDeleting(true);
    try {
      const supabase = createClient();
      const { error } = await supabase
        .from("psychological_tests")
        .delete()
        .eq("id", deleteId);
      if (error) throw error;
      toast.success("삭제되었습니다.");
      setTests((prev) => prev.filter((t) => t.id !== deleteId));
    } catch {
      toast.error("삭제에 실패했습니다.");
    } finally {
      setDeleting(false);
      setDeleteId(null);
    }
  }

  return (
    <div className="p-6 md:p-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-heading text-2xl font-bold text-[#1E3A26]">심리검사 관리</h1>
        <Button onClick={openCreate} className="bg-[#4A85D4] hover:bg-[#C47A52] text-white rounded-xl">
          <Plus className="w-4 h-4 mr-1" /> 검사 추가
        </Button>
      </div>

      {loading ? (
        <div className="text-center py-12 text-[#6B8C7B]">로딩 중...</div>
      ) : tests.length === 0 ? (
        <Card className="border-[#D0E8D8] rounded-2xl">
          <CardContent className="p-8 text-center text-[#6B8C7B]">등록된 심리검사가 없습니다.</CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {tests.map((test) => (
            <Card key={test.id} className="border-[#D0E8D8] rounded-2xl">
              <CardContent className="flex items-center justify-between p-4 sm:p-6">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge
                      className={test.is_active ? "bg-[#4A8C5E] text-white" : "bg-[#D0E8D8] text-[#6B8C7B]"}
                    >
                      {test.is_active ? "활성" : "비활성"}
                    </Badge>
                    <p className="font-medium text-[#1E3A26] truncate">{test.name}</p>
                  </div>
                  <p className="text-xs text-[#6B8C7B]">
                    {test.duration_min}분 · {test.price === 0 ? "문의" : `${test.price.toLocaleString()}원`}
                    {test.tags && test.tags.length > 0 && ` · ${test.tags.join(", ")}`}
                  </p>
                </div>
                <div className="flex gap-2 shrink-0 ml-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleToggleActive(test)}
                    className="border-[#D0E8D8] text-[#6B8C7B] text-xs"
                  >
                    {test.is_active ? "비활성화" : "활성화"}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openEdit(test)}
                    className="border-[#D0E8D8] text-[#6B8C7B]"
                  >
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setDeleteId(test.id)}
                    className="border-[#D0E8D8] text-red-500 hover:text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* 추가/수정 Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{editId ? "검사 수정" : "검사 추가"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-[#1E3A26] mb-1 block">검사명</label>
              <Input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="검사명"
                className="border-[#D0E8D8] rounded-xl"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-[#1E3A26] mb-1 block">설명</label>
              <Textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="검사 설명"
                className="border-[#D0E8D8] rounded-xl min-h-[100px]"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-[#1E3A26] mb-1 block">소요시간 (분)</label>
                <Input
                  type="number"
                  value={form.duration_min}
                  onChange={(e) => setForm({ ...form, duration_min: e.target.value })}
                  placeholder="60"
                  className="border-[#D0E8D8] rounded-xl"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-[#1E3A26] mb-1 block">가격 (원)</label>
                <Input
                  type="number"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  placeholder="0"
                  className="border-[#D0E8D8] rounded-xl"
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-[#1E3A26] mb-1 block">태그 (쉼표 구분)</label>
              <Input
                value={form.tags}
                onChange={(e) => setForm({ ...form, tags: e.target.value })}
                placeholder="종합평가, 인지, 정서"
                className="border-[#D0E8D8] rounded-xl"
              />
            </div>
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="is_active"
                checked={form.is_active}
                onChange={(e) => setForm({ ...form, is_active: e.target.checked })}
                className="w-4 h-4 rounded border-[#D0E8D8]"
              />
              <label htmlFor="is_active" className="text-sm text-[#1E3A26]">활성화</label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)} className="border-[#D0E8D8]">
              취소
            </Button>
            <Button onClick={handleSubmit} disabled={submitting} className="bg-[#4A85D4] hover:bg-[#C47A52] text-white">
              {submitting ? "저장 중..." : "저장"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 삭제 확인 Dialog */}
      <Dialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>검사 삭제</DialogTitle>
            <DialogDescription>정말로 이 검사를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteId(null)} className="border-[#D0E8D8]">
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
