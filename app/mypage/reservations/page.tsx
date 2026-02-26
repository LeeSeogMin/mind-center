"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { createClient } from "@/lib/supabase/client";
import type { Reservation } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Video } from "lucide-react";

const STATUS_MAP: Record<string, { label: string; color: string }> = {
  pending: { label: "대기", color: "border-[#E8DDD0] text-[#8C7B6B]" },
  confirmed: { label: "확정", color: "bg-[#8B6B4E] text-white" },
  completed: { label: "완료", color: "bg-[#C4A882] text-white" },
  cancelled: { label: "취소", color: "bg-red-100 text-red-600" },
};

const STATUS_MESSAGE: Record<string, string> = {
  pending: "상담사 확인 후 확정 안내가 발송됩니다.",
  confirmed: "결제를 완료하시면 상담이 진행됩니다.",
  completed: "상담이 완료되었습니다. 감사합니다.",
  cancelled: "예약이 취소되었습니다.",
};

export default function ReservationsPage() {
  const { user } = useAuth();
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    async function fetch() {
      const supabase = createClient();
      const { data } = await supabase
        .from("reservations")
        .select("*")
        .eq("user_id", user!.id)
        .order("created_at", { ascending: false });
      setReservations((data as Reservation[]) ?? []);
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

  return (
    <div className="bg-[#FBF8F3] min-h-screen">
      <div className="max-w-[1200px] mx-auto px-6 py-12">
        <h1 className="font-heading text-3xl font-bold text-[#3A2E26] mb-8">예약 내역</h1>

        {reservations.length === 0 ? (
          <Card className="border-[#E8DDD0] rounded-2xl">
            <CardContent className="p-8 text-center text-[#8C7B6B]">
              예약 내역이 없습니다.
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {reservations.map((r) => {
              const s = STATUS_MAP[r.status] || STATUS_MAP.pending;
              const showMeetLink = r.type === "online" && r.payment_status === "paid" && r.meet_link;
              return (
                <Card key={r.id} className="border-[#E8DDD0] rounded-2xl">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-[#3A2E26]">
                          {r.type === "online" ? "화상 상담" : "대면 상담"}
                        </p>
                        <Badge variant="outline" className="border-[#E8DDD0] text-xs">
                          {r.type === "online" ? "화상" : "대면"}
                        </Badge>
                      </div>
                      <Badge className={s.color} variant={r.status === "pending" ? "outline" : "default"}>
                        {s.label}
                      </Badge>
                    </div>
                    <p className="text-sm text-[#8C7B6B]">
                      신청일: {new Date(r.created_at).toLocaleDateString("ko-KR")}
                      {r.amount > 0 && ` · ${r.amount.toLocaleString()}원`}
                      {r.payment_status === "paid" && " · 결제완료"}
                    </p>
                    {r.memo && <p className="text-sm text-[#8C7B6B] mt-1">메모: {r.memo}</p>}
                    <p className="text-xs text-[#C4A882] mt-2">{STATUS_MESSAGE[r.status]}</p>

                    {showMeetLink && (
                      <a
                        href={r.meet_link!}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-3"
                      >
                        <Button size="sm" className="bg-[#D4845A] hover:bg-[#C27549] text-white gap-2">
                          <Video className="w-4 h-4" /> 구글 미트 입장
                        </Button>
                      </a>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
