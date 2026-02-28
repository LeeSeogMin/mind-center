"use client";

import { useEffect, useState, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Reservation } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter,
} from "@/components/ui/dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { CheckCircle, XCircle, Video, RefreshCw } from "lucide-react";

type StatusFilter = "all" | "pending" | "confirmed" | "completed" | "cancelled";
type TypeFilter = "all" | "offline" | "online";
type PaymentFilter = "all" | "unpaid" | "paid";

const STATUS_MAP: Record<string, { label: string; color: string }> = {
  pending: { label: "대기", color: "border-[#D0E8D8] text-[#6B8C7B]" },
  confirmed: { label: "확정", color: "bg-[#4A8C5E] text-white" },
  completed: { label: "완료", color: "bg-[#8CC4A0] text-white" },
  cancelled: { label: "취소", color: "bg-red-100 text-red-600" },
};

const PAYMENT_MAP: Record<string, { label: string; color: string }> = {
  unpaid: { label: "미결제", color: "border-[#D0E8D8] text-[#6B8C7B]" },
  paid: { label: "결제완료", color: "bg-[#4A8C5E] text-white" },
  refunded: { label: "환불", color: "bg-red-100 text-red-600" },
};

export default function AdminReservationsPage() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("all");
  const [paymentFilter, setPaymentFilter] = useState<PaymentFilter>("all");

  // Dialog state
  const [dialogType, setDialogType] = useState<"confirm" | "cancel" | "complete" | null>(null);
  const [selectedRes, setSelectedRes] = useState<Reservation | null>(null);
  const [confirmAmount, setConfirmAmount] = useState("");
  const [meetLink, setMeetLink] = useState("");
  const [actionLoading, setActionLoading] = useState(false);

  const fetchReservations = useCallback(async () => {
    setLoading(true);
    const supabase = createClient();
    let query = supabase
      .from("reservations")
      .select("*, user:user_id(id, name, email, phone)")
      .order("created_at", { ascending: false });

    if (statusFilter !== "all") query = query.eq("status", statusFilter);
    if (typeFilter !== "all") query = query.eq("type", typeFilter);
    if (paymentFilter !== "all") query = query.eq("payment_status", paymentFilter);

    const { data } = await query;
    setReservations((data as unknown as Reservation[]) ?? []);
    setLoading(false);
  }, [statusFilter, typeFilter, paymentFilter]);

  useEffect(() => {
    fetchReservations();
  }, [fetchReservations]);

  function openDialog(type: "confirm" | "cancel" | "complete", res: Reservation) {
    setDialogType(type);
    setSelectedRes(res);
    setConfirmAmount(res.amount ? String(res.amount) : "");
    setMeetLink(res.meet_link ?? "");
  }

  function closeDialog() {
    setDialogType(null);
    setSelectedRes(null);
    setConfirmAmount("");
    setMeetLink("");
  }

  async function handleConfirm() {
    if (!selectedRes) return;
    const amount = parseInt(confirmAmount, 10);
    if (!amount || amount <= 0) return alert("금액을 입력해주세요.");
    if (selectedRes.type === "online" && meetLink && !meetLink.startsWith("https://meet.google.com/")) {
      return alert("구글 미트 링크는 https://meet.google.com/ 으로 시작해야 합니다.");
    }

    setActionLoading(true);
    const supabase = createClient();
    const updateData: Record<string, unknown> = { status: "confirmed", amount };
    if (selectedRes.type === "online" && meetLink) {
      updateData.meet_link = meetLink;
    }

    const { error } = await supabase.from("reservations").update(updateData).eq("id", selectedRes.id);
    setActionLoading(false);
    if (error) return alert("오류: " + error.message);

    closeDialog();
    fetchReservations();
  }

  async function handleStatusChange(newStatus: "cancelled" | "completed") {
    if (!selectedRes) return;
    setActionLoading(true);
    const supabase = createClient();
    const { error } = await supabase.from("reservations").update({ status: newStatus }).eq("id", selectedRes.id);
    setActionLoading(false);
    if (error) return alert("오류: " + error.message);

    closeDialog();
    fetchReservations();
  }

  const userName = (res: Reservation) => (res.user as unknown as { name: string })?.name ?? "이름 없음";
  const userEmail = (res: Reservation) => (res.user as unknown as { email: string })?.email ?? "";
  const userPhone = (res: Reservation) => (res.user as unknown as { phone?: string })?.phone ?? "";

  return (
    <div className="p-6 md:p-10 max-w-[1200px]">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-heading text-2xl font-bold text-[#1E3A26]">예약 관리</h1>
        <Button variant="ghost" onClick={fetchReservations} className="text-[#6B8C7B]">
          <RefreshCw className="w-4 h-4 mr-2" /> 새로고침
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as StatusFilter)}>
          <SelectTrigger className="border-[#D0E8D8]">
            <SelectValue placeholder="상태" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">전체 상태</SelectItem>
            <SelectItem value="pending">대기</SelectItem>
            <SelectItem value="confirmed">확정</SelectItem>
            <SelectItem value="completed">완료</SelectItem>
            <SelectItem value="cancelled">취소</SelectItem>
          </SelectContent>
        </Select>

        <Select value={typeFilter} onValueChange={(v) => setTypeFilter(v as TypeFilter)}>
          <SelectTrigger className="border-[#D0E8D8]">
            <SelectValue placeholder="유형" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">전체 유형</SelectItem>
            <SelectItem value="offline">대면</SelectItem>
            <SelectItem value="online">화상</SelectItem>
          </SelectContent>
        </Select>

        <Select value={paymentFilter} onValueChange={(v) => setPaymentFilter(v as PaymentFilter)}>
          <SelectTrigger className="border-[#D0E8D8]">
            <SelectValue placeholder="결제" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">전체 결제</SelectItem>
            <SelectItem value="unpaid">미결제</SelectItem>
            <SelectItem value="paid">결제완료</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* List */}
      {loading ? (
        <p className="text-sm text-[#6B8C7B]">불러오는 중...</p>
      ) : reservations.length === 0 ? (
        <Card className="border-[#D0E8D8] rounded-2xl">
          <CardContent className="p-8 text-center text-[#6B8C7B]">
            해당하는 예약이 없습니다.
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {reservations.map((res) => {
            const st = STATUS_MAP[res.status] ?? STATUS_MAP.pending;
            const pt = PAYMENT_MAP[res.payment_status] ?? PAYMENT_MAP.unpaid;
            return (
              <Card key={res.id} className="border-[#D0E8D8] rounded-2xl">
                <CardContent className="p-5">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    {/* Info */}
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-[#1E3A26]">{userName(res)}</p>
                        <Badge variant="outline" className="border-[#D0E8D8] text-xs">
                          {res.type === "online" ? "화상" : "대면"}
                        </Badge>
                      </div>
                      <p className="text-sm text-[#6B8C7B]">
                        {userEmail(res)}{userPhone(res) && ` · ${userPhone(res)}`}
                      </p>
                      <p className="text-sm text-[#6B8C7B]">
                        신청일: {new Date(res.created_at).toLocaleDateString("ko-KR")}
                        {res.amount > 0 && ` · ${res.amount.toLocaleString()}원`}
                      </p>
                      {res.memo && <p className="text-xs text-[#6B8C7B]">메모: {res.memo}</p>}
                      {res.meet_link && (
                        <p className="text-xs text-[#4A85D4] flex items-center gap-1">
                          <Video className="w-3 h-3" /> 미트 링크 설정됨
                        </p>
                      )}
                    </div>

                    {/* Status + Actions */}
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge className={st.color} variant={res.status === "pending" ? "outline" : "default"}>
                        {st.label}
                      </Badge>
                      <Badge className={pt.color} variant={res.payment_status === "unpaid" ? "outline" : "default"}>
                        {pt.label}
                      </Badge>

                      {res.status === "pending" && (
                        <>
                          <Button
                            size="sm"
                            onClick={() => openDialog("confirm", res)}
                            className="bg-[#4A8C5E] hover:bg-[#3D7A4E] text-white"
                          >
                            <CheckCircle className="w-4 h-4 mr-1" /> 확정
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => openDialog("cancel", res)}
                            className="border-red-300 text-red-500 hover:bg-red-50"
                          >
                            <XCircle className="w-4 h-4 mr-1" /> 취소
                          </Button>
                        </>
                      )}
                      {res.status === "confirmed" && (
                        <Button
                          size="sm"
                          onClick={() => openDialog("complete", res)}
                          className="bg-[#8CC4A0] hover:bg-[#B09772] text-white"
                        >
                          완료 처리
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Confirm Dialog */}
      <Dialog open={dialogType === "confirm"} onOpenChange={(open) => !open && closeDialog()}>
        <DialogContent className="border-[#D0E8D8]">
          <DialogHeader>
            <DialogTitle className="font-heading">예약 확정</DialogTitle>
            <DialogDescription>
              {selectedRes && `${userName(selectedRes)}님의 ${selectedRes.type === "online" ? "화상" : "대면"} 상담을 확정합니다.`}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <label className="text-sm font-medium text-[#1E3A26] mb-1 block">상담 금액 (원)</label>
              <Input
                type="number"
                placeholder="예: 80000"
                value={confirmAmount}
                onChange={(e) => setConfirmAmount(e.target.value)}
                className="border-[#D0E8D8]"
              />
            </div>
            {selectedRes?.type === "online" && (
              <div>
                <label className="text-sm font-medium text-[#1E3A26] mb-1 block">구글 미트 링크</label>
                <Input
                  placeholder="https://meet.google.com/xxx-xxxx-xxx"
                  value={meetLink}
                  onChange={(e) => setMeetLink(e.target.value)}
                  className="border-[#D0E8D8]"
                />
                <p className="text-xs text-[#6B8C7B] mt-1">화상 상담 시 필수. 결제 완료 후 사용자에게 노출됩니다.</p>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={closeDialog} className="border-[#D0E8D8]">취소</Button>
            <Button
              onClick={handleConfirm}
              disabled={actionLoading}
              className="bg-[#4A8C5E] hover:bg-[#3D7A4E] text-white"
            >
              {actionLoading ? "처리 중..." : "확정하기"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Cancel Dialog */}
      <Dialog open={dialogType === "cancel"} onOpenChange={(open) => !open && closeDialog()}>
        <DialogContent className="border-[#D0E8D8]">
          <DialogHeader>
            <DialogTitle className="font-heading">예약 취소</DialogTitle>
            <DialogDescription>
              {selectedRes && `${userName(selectedRes)}님의 예약을 취소하시겠습니까? 이 작업은 되돌릴 수 없습니다.`}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={closeDialog} className="border-[#D0E8D8]">돌아가기</Button>
            <Button
              onClick={() => handleStatusChange("cancelled")}
              disabled={actionLoading}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              {actionLoading ? "처리 중..." : "취소 확인"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Complete Dialog */}
      <Dialog open={dialogType === "complete"} onOpenChange={(open) => !open && closeDialog()}>
        <DialogContent className="border-[#D0E8D8]">
          <DialogHeader>
            <DialogTitle className="font-heading">상담 완료</DialogTitle>
            <DialogDescription>
              {selectedRes && `${userName(selectedRes)}님의 상담을 완료 처리하시겠습니까?`}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={closeDialog} className="border-[#D0E8D8]">돌아가기</Button>
            <Button
              onClick={() => handleStatusChange("completed")}
              disabled={actionLoading}
              className="bg-[#8CC4A0] hover:bg-[#B09772] text-white"
            >
              {actionLoading ? "처리 중..." : "완료 처리"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
