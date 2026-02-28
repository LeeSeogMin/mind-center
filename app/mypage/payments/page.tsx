"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { createClient } from "@/lib/supabase/client";
import type { Reservation } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function PaymentsPage() {
  const { user } = useAuth();
  const [payments, setPayments] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    async function fetch() {
      const supabase = createClient();
      const { data } = await supabase
        .from("reservations")
        .select("*")
        .eq("user_id", user!.id)
        .eq("payment_status", "paid")
        .order("created_at", { ascending: false });
      setPayments((data as Reservation[]) ?? []);
      setLoading(false);
    }
    fetch();
  }, [user]);

  if (loading) {
    return (
      <div className="bg-[#F0FAF3] min-h-screen flex items-center justify-center">
        <p className="text-[#6B8C7B]">로딩 중...</p>
      </div>
    );
  }

  return (
    <div className="bg-[#F0FAF3] min-h-screen">
      <div className="max-w-[1200px] mx-auto px-6 py-12">
        <h1 className="font-heading text-3xl font-bold text-[#1E3A26] mb-8">결제 내역</h1>

        {payments.length === 0 ? (
          <Card className="border-[#D0E8D8] rounded-2xl">
            <CardContent className="p-8 text-center text-[#6B8C7B]">
              결제 내역이 없습니다.
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {payments.map((p) => (
              <Card key={p.id} className="border-[#D0E8D8] rounded-2xl">
                <CardContent className="flex items-center justify-between p-6">
                  <div>
                    <p className="font-medium text-[#1E3A26]">
                      {p.type === "online" ? "화상 상담" : "대면 상담"}
                    </p>
                    <p className="text-sm text-[#6B8C7B]">
                      {new Date(p.created_at).toLocaleDateString("ko-KR")}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-[#1E3A26]">{p.amount.toLocaleString()}원</p>
                    <Badge className="bg-[#4A8C5E] mt-1">결제완료</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
