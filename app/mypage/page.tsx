"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { createClient } from "@/lib/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CalendarDays, CreditCard, FileText, LogOut } from "lucide-react";

const STATUS_MAP: Record<string, { label: string; color: string; variant: "default" | "outline" }> = {
  pending: { label: "대기", color: "border-[#E8DDD0] text-[#8C7B6B]", variant: "outline" },
  confirmed: { label: "확정", color: "bg-[#C4A882]", variant: "default" },
  completed: { label: "완료", color: "bg-[#8B6B4E]", variant: "default" },
  cancelled: { label: "취소", color: "bg-red-100 text-red-600", variant: "default" },
};

interface RecentReservation {
  id: string;
  type: "offline" | "online";
  status: string;
  memo?: string;
  created_at: string;
}

export default function MyPage() {
  const { user, profile, signOut, loading } = useAuth();
  const router = useRouter();
  const [counts, setCounts] = useState({ reservations: 0, payments: 0, posts: 0 });
  const [recentReservations, setRecentReservations] = useState<RecentReservation[]>([]);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [loading, user, router]);

  useEffect(() => {
    if (!user) return;
    const supabase = createClient();

    async function fetchCounts() {
      const [resCount, paidCount, mindtalkCount, boardCount] = await Promise.all([
        supabase.from("reservations").select("*", { count: "exact", head: true }).eq("user_id", user!.id),
        supabase.from("reservations").select("*", { count: "exact", head: true }).eq("user_id", user!.id).eq("payment_status", "paid"),
        supabase.from("mindtalk_posts").select("*", { count: "exact", head: true }).eq("user_id", user!.id),
        supabase.from("board_posts").select("*", { count: "exact", head: true }).eq("author_id", user!.id),
      ]);
      setCounts({
        reservations: resCount.count ?? 0,
        payments: paidCount.count ?? 0,
        posts: (mindtalkCount.count ?? 0) + (boardCount.count ?? 0),
      });
    }

    async function fetchRecent() {
      const { data } = await supabase
        .from("reservations")
        .select("id, type, status, memo, created_at")
        .eq("user_id", user!.id)
        .order("created_at", { ascending: false })
        .limit(3);
      setRecentReservations((data as RecentReservation[]) ?? []);
    }

    fetchCounts();
    fetchRecent();
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FBF8F3] flex items-center justify-center">
        <p className="text-[#8C7B6B]">로딩 중...</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const menuItems = [
    { href: "/mypage/reservations", icon: CalendarDays, label: "예약 내역", count: counts.reservations },
    { href: "/mypage/payments", icon: CreditCard, label: "결제 내역", count: counts.payments },
    { href: "/mypage/posts", icon: FileText, label: "내 글", count: counts.posts },
  ];

  return (
    <div className="bg-[#FBF8F3] min-h-screen">
      <div className="max-w-[1200px] mx-auto px-6 py-12">
        <h1 className="font-heading text-3xl font-bold text-[#3A2E26] mb-8">마이페이지</h1>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Profile card */}
          <div>
            <Card className="border-[#E8DDD0] rounded-2xl">
              <CardContent className="p-6 text-center">
                <Avatar className="w-20 h-20 mx-auto mb-4">
                  <AvatarFallback className="bg-[#8B6B4E] text-white text-2xl">
                    {profile?.name?.[0] || user.email?.[0]?.toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
                <h2 className="font-heading text-xl font-bold text-[#3A2E26]">
                  {profile?.name || "회원"}
                </h2>
                <p className="text-sm text-[#8C7B6B] mt-1">{user.email}</p>
                <Badge className="mt-2 bg-[#C4A882]">일반 회원</Badge>

                <Separator className="my-4 bg-[#E8DDD0]" />

                <Button
                  variant="ghost"
                  onClick={signOut}
                  className="w-full text-[#8C7B6B] hover:text-[#D4845A] gap-2"
                >
                  <LogOut className="w-4 h-4" /> 로그아웃
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Menu & quick info */}
          <div className="md:col-span-2 space-y-6">
            <div className="grid sm:grid-cols-3 gap-4">
              {menuItems.map(({ href, icon: Icon, label, count }) => (
                <Link key={href} href={href}>
                  <Card className="border-[#E8DDD0] rounded-2xl hover:border-[#C4A882] transition-colors cursor-pointer">
                    <CardContent className="p-6 text-center">
                      <Icon className="w-8 h-8 text-[#8B6B4E] mx-auto mb-3" />
                      <p className="font-medium text-[#3A2E26]">{label}</p>
                      <p className="text-2xl font-bold text-[#D4845A] mt-1">{count}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            {/* Recent reservations */}
            <Card className="border-[#E8DDD0] rounded-2xl">
              <CardHeader>
                <CardTitle className="font-heading text-lg">최근 예약</CardTitle>
              </CardHeader>
              <CardContent>
                {recentReservations.length === 0 ? (
                  <p className="text-sm text-[#8C7B6B] text-center py-4">예약 내역이 없습니다.</p>
                ) : (
                  <div className="space-y-3">
                    {recentReservations.map((r) => {
                      const st = STATUS_MAP[r.status] ?? STATUS_MAP.pending;
                      return (
                        <div key={r.id} className="flex items-center justify-between p-4 bg-[#FBF8F3] rounded-xl">
                          <div>
                            <p className="font-medium text-[#3A2E26]">
                              {r.type === "online" ? "화상 상담" : "대면 상담"}
                            </p>
                            <p className="text-sm text-[#8C7B6B]">
                              {new Date(r.created_at).toLocaleDateString("ko-KR")}
                            </p>
                          </div>
                          <Badge className={st.color} variant={st.variant}>{st.label}</Badge>
                        </div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
