import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getSupabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
  );
}

// 토스페이먼츠 웹훅 — 결제 상태 변경 시 호출됨
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { eventType, data } = body;

    if (eventType === "PAYMENT_STATUS_CHANGED") {
      const { orderId, status, paymentKey } = data;
      const reservationId = orderId.replace("reservation_", "");

      let paymentStatus = "unpaid";
      if (status === "DONE") paymentStatus = "paid";
      if (status === "CANCELED") paymentStatus = "refunded";

      const supabaseAdmin = getSupabaseAdmin();
      await supabaseAdmin
        .from("reservations")
        .update({ payment_status: paymentStatus, payment_id: paymentKey })
        .eq("id", reservationId);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Webhook 처리 실패" }, { status: 500 });
  }
}
