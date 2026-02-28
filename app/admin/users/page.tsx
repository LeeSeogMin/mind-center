"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/lib/auth-context";
import { toast } from "sonner";
import type { User } from "@/lib/types";

const roleLabels: Record<string, string> = {
  user: "일반 회원",
  counselor: "상담사",
  admin: "관리자",
};

const roleBadgeColors: Record<string, string> = {
  user: "bg-[#D0E8D8] text-[#6B8C7B]",
  counselor: "bg-[#8CC4A0] text-white",
  admin: "bg-[#4A8C5E] text-white",
};

export default function AdminUsersPage() {
  const { profile } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [changeTarget, setChangeTarget] = useState<{ user: User; newRole: string } | null>(null);
  const [changing, setChanging] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    const supabase = createClient();
    const { data } = await supabase
      .from("users")
      .select("*")
      .order("created_at", { ascending: false });
    setUsers(data ?? []);
    setLoading(false);
  }

  const filtered = users.filter((u) => {
    if (roleFilter !== "all" && u.role !== roleFilter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        u.name.toLowerCase().includes(q) ||
        (u.email?.toLowerCase().includes(q) ?? false)
      );
    }
    return true;
  });

  function handleRoleSelect(user: User, newRole: string) {
    if (newRole === user.role) return;
    setChangeTarget({ user, newRole });
  }

  async function confirmRoleChange() {
    if (!changeTarget) return;
    setChanging(true);
    try {
      const supabase = createClient();
      const { error } = await supabase
        .from("users")
        .update({ role: changeTarget.newRole })
        .eq("id", changeTarget.user.id);
      if (error) throw error;
      toast.success(`${changeTarget.user.name}님의 역할이 변경되었습니다.`);
      setUsers((prev) =>
        prev.map((u) =>
          u.id === changeTarget.user.id ? { ...u, role: changeTarget.newRole as User["role"] } : u
        )
      );
    } catch {
      toast.error("역할 변경에 실패했습니다.");
    } finally {
      setChanging(false);
      setChangeTarget(null);
    }
  }

  const isAdmin = profile?.role === "admin";

  return (
    <div className="p-6 md:p-10">
      <h1 className="font-heading text-2xl font-bold text-[#1E3A26] mb-8">회원 관리</h1>

      {/* 필터 + 검색 */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="flex gap-2">
          {(["all", "user", "counselor", "admin"] as const).map((r) => (
            <button
              key={r}
              onClick={() => setRoleFilter(r)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                roleFilter === r
                  ? "bg-[#4A8C5E] text-white"
                  : "bg-white text-[#6B8C7B] border border-[#D0E8D8] hover:border-[#8CC4A0]"
              }`}
            >
              {r === "all" ? "전체" : roleLabels[r]}
            </button>
          ))}
        </div>
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B8C7B]" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="이름 또는 이메일 검색"
            className="pl-10 border-[#D0E8D8] rounded-xl"
          />
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12 text-[#6B8C7B]">로딩 중...</div>
      ) : filtered.length === 0 ? (
        <Card className="border-[#D0E8D8] rounded-2xl">
          <CardContent className="p-8 text-center text-[#6B8C7B]">
            {search ? "검색 결과가 없습니다." : "등록된 회원이 없습니다."}
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {filtered.map((u) => (
            <Card key={u.id} className="border-[#D0E8D8] rounded-2xl">
              <CardContent className="flex items-center justify-between p-4 sm:p-6">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge className={roleBadgeColors[u.role]}>{roleLabels[u.role]}</Badge>
                    <p className="font-medium text-[#1E3A26] truncate">{u.name}</p>
                  </div>
                  <p className="text-xs text-[#6B8C7B]">
                    {u.email} · 가입일 {new Date(u.created_at).toLocaleDateString("ko-KR")}
                  </p>
                </div>
                {isAdmin && (
                  <div className="shrink-0 ml-4">
                    <Select value={u.role} onValueChange={(v) => handleRoleSelect(u, v)}>
                      <SelectTrigger className="w-[120px] border-[#D0E8D8] rounded-xl text-sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="user">일반 회원</SelectItem>
                        <SelectItem value="counselor">상담사</SelectItem>
                        <SelectItem value="admin">관리자</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* 역할 변경 확인 Dialog */}
      <Dialog open={!!changeTarget} onOpenChange={(open) => !open && setChangeTarget(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>역할 변경</DialogTitle>
            <DialogDescription>
              {changeTarget && (
                <>
                  <strong>{changeTarget.user.name}</strong>님의 역할을{" "}
                  <strong>{roleLabels[changeTarget.user.role]}</strong>에서{" "}
                  <strong>{roleLabels[changeTarget.newRole]}</strong>(으)로 변경하시겠습니까?
                </>
              )}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setChangeTarget(null)} className="border-[#D0E8D8]">
              취소
            </Button>
            <Button onClick={confirmRoleChange} disabled={changing} className="bg-[#4A8C5E] hover:bg-[#3D7A4E] text-white">
              {changing ? "변경 중..." : "변경"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
