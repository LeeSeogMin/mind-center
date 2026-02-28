"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { CalendarDays, Clock, CheckCircle, CreditCard } from "lucide-react";

interface DashboardStats {
  total: number;
  pending: number;
  todayCount: number;
  paidCount: number;
}

interface PendingReservation {
  id: string;
  type: "offline" | "online";
  status: string;
  created_at: string;
  memo?: string;
  user?: { name: string; email: string; phone?: string };
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({ total: 0, pending: 0, todayCount: 0, paidCount: 0 });
  const [pendingList, setPendingList] = useState<PendingReservation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const supabase = createClient();
    const today = new Date().toISOString().split("T")[0];

    const [totalRes, pendingRes, todayRes, paidRes, pendingListRes] = await Promise.all([
      supabase.from("reservations").select("*", { count: "exact", head: true }),
      supabase.from("reservations").select("*", { count: "exact", head: true }).eq("status", "pending"),
      supabase.from("reservations").select("*", { count: "exact", head: true })
        .gte("created_at", `${today}T00:00:00`)
        .lte("created_at", `${today}T23:59:59`),
      supabase.from("reservations").select("*", { count: "exact", head: true }).eq("payment_status", "paid"),
      supabase.from("reservations")
        .select("id, type, status, created_at, memo, user:user_id(name, email, phone)")
        .eq("status", "pending")
        .order("created_at", { ascending: false })
        .limit(5),
    ]);

    setStats({
      total: totalRes.count ?? 0,
      pending: pendingRes.count ?? 0,
      todayCount: todayRes.count ?? 0,
      paidCount: paidRes.count ?? 0,
    });
    setPendingList((pendingListRes.data as unknown as PendingReservation[]) ?? []);
    setLoading(false);
  }

  const statCards = [
    { label: "전체 예약", value: stats.total, icon: CalendarDays, color: "text-[#4A8C5E]" },
    { label: "대기 중", value: stats.pending, icon: Clock, color: "text-[#4A85D4]" },
    { label: "오늘 상담", value: stats.todayCount, icon: CheckCircle, color: "text-[#4A8C5E]" },
    { label: "결제 완료", value: stats.paidCount, icon: CreditCard, color: "text-[#8CC4A0]" },
  ];

  return (
    <div className="p-6 md:p-10 max-w-[1200px]">
      <h1 className="font-heading text-2xl font-bold text-[#1E3A26] mb-8">관리자 대시보드</h1>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {statCards.map(({ label, value, icon: Icon, color }) => (
          <Card key={label} className="border-[#D0E8D8] rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-3">
                <Icon className={`w-6 h-6 ${color}`} />
              </div>
              <p className="text-2xl font-bold text-[#1E3A26]">{loading ? "—" : value}</p>
              <p className="text-sm text-[#6B8C7B]">{label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pending list */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-heading text-lg font-bold text-[#1E3A26]">대기 중 예약</h2>
        <Link href="/admin/reservations" className="text-sm text-[#4A8C5E] hover:underline">
          전체 보기
        </Link>
      </div>

      {loading ? (
        <p className="text-sm text-[#6B8C7B]">불러오는 중...</p>
      ) : pendingList.length === 0 ? (
        <Card className="border-[#D0E8D8] rounded-2xl">
          <CardContent className="p-6 text-center text-[#6B8C7B]">
            대기 중인 예약이 없습니다.
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {pendingList.map((r) => (
            <Card key={r.id} className="border-[#D0E8D8] rounded-2xl">
              <CardContent className="flex items-center justify-between p-5">
                <div>
                  <p className="font-medium text-[#1E3A26]">
                    {(r.user as unknown as { name: string })?.name ?? "이름 없음"}
                  </p>
                  <p className="text-sm text-[#6B8C7B]">
                    {r.type === "online" ? "화상" : "대면"} · {new Date(r.created_at).toLocaleDateString("ko-KR")}
                  </p>
                </div>
                <Badge variant="outline" className="border-[#D0E8D8] text-[#6B8C7B]">대기</Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
