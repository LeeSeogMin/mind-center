import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "예약 내역" };

const SAMPLE_RESERVATIONS = [
  { id: "1", type: "대면", counseling: "성인 상담", date: "2025-03-05", time: "14:00", status: "confirmed", payment: "paid" },
  { id: "2", type: "화상", counseling: "부부·가족 상담", date: "2025-03-12", time: "10:00", status: "pending", payment: "unpaid" },
  { id: "3", type: "대면", counseling: "아동청소년 상담", date: "2025-02-15", time: "11:00", status: "completed", payment: "paid" },
];

const STATUS_MAP: Record<string, { label: string; color: string }> = {
  pending: { label: "대기", color: "border-[#E8DDD0] text-[#8C7B6B]" },
  confirmed: { label: "확정", color: "bg-[#8B6B4E] text-white" },
  completed: { label: "완료", color: "bg-[#C4A882] text-white" },
  cancelled: { label: "취소", color: "bg-red-100 text-red-600" },
};

export default function ReservationsPage() {
  return (
    <div className="bg-[#FBF8F3] min-h-screen">
      <div className="max-w-[1200px] mx-auto px-6 py-12">
        <h1 className="font-heading text-3xl font-bold text-[#3A2E26] mb-8">예약 내역</h1>

        <div className="space-y-4">
          {SAMPLE_RESERVATIONS.map((r) => {
            const s = STATUS_MAP[r.status] || STATUS_MAP.pending;
            return (
              <Card key={r.id} className="border-[#E8DDD0] rounded-2xl">
                <CardContent className="flex items-center justify-between p-6">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-medium text-[#3A2E26]">{r.counseling}</p>
                      <Badge variant="outline" className="border-[#E8DDD0] text-xs">{r.type}</Badge>
                    </div>
                    <p className="text-sm text-[#8C7B6B]">{r.date} {r.time} · 정선이 박사</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className={s.color} variant={r.status === "pending" ? "outline" : "default"}>
                      {s.label}
                    </Badge>
                    {r.status === "confirmed" && r.type === "화상" && (
                      <span className="text-xs text-[#D4845A] font-medium">미트 링크 확인</span>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
