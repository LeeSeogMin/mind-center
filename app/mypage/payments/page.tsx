import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "결제 내역" };

const SAMPLE_PAYMENTS = [
  { id: "p1", description: "성인 상담 — 대면", amount: 80000, date: "2025-03-01", status: "paid" },
  { id: "p2", description: "아동청소년 상담 — 대면", amount: 100000, date: "2025-02-10", status: "paid" },
];

export default function PaymentsPage() {
  return (
    <div className="bg-[#FBF8F3] min-h-screen">
      <div className="max-w-[1200px] mx-auto px-6 py-12">
        <h1 className="font-heading text-3xl font-bold text-[#3A2E26] mb-8">결제 내역</h1>

        <div className="space-y-4">
          {SAMPLE_PAYMENTS.map((p) => (
            <Card key={p.id} className="border-[#E8DDD0] rounded-2xl">
              <CardContent className="flex items-center justify-between p-6">
                <div>
                  <p className="font-medium text-[#3A2E26]">{p.description}</p>
                  <p className="text-sm text-[#8C7B6B]">{p.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-[#3A2E26]">{p.amount.toLocaleString()}원</p>
                  <Badge className="bg-[#8B6B4E] mt-1">결제완료</Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
