"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/lib/auth-context";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { CalendarDays, Clock, User, CreditCard } from "lucide-react";
import { toast } from "sonner";

const COUNSELING_TYPES = ["아동청소년", "성인", "부부·가족", "직장인·기업"];

const TIME_SLOTS = [
  "09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00",
];

export default function OfflineReservationPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [selectedType, setSelectedType] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [memo, setMemo] = useState("");

  if (!user) {
    return (
      <div className="max-w-[1200px] mx-auto px-6 py-20 text-center">
        <h1 className="font-heading text-3xl font-bold text-[#1E3A26] mb-4">대면상담 예약</h1>
        <p className="text-[#6B8C7B] mb-2">예약을 위해 로그인이 필요합니다.</p>
        <p className="text-[#6B8C7B] text-sm mb-8">
          대면상담은 병점역 한신대학교 인근 지정 장소에서 진행됩니다.
        </p>
        <Link href="/login">
          <Button className="bg-[#4A8C5E] hover:bg-[#3D7A4E]">로그인하기</Button>
        </Link>
      </div>
    );
  }

  const handleSubmit = async () => {
    if (!user || !selectedDate || !selectedTime) return;
    setSubmitting(true);

    try {
      const supabase = createClient();

      // 첫 번째 활성 상담사 조회 (1인 상담연구소)
      const { data: counselor } = await supabase
        .from("counselors")
        .select("id")
        .eq("is_active", true)
        .limit(1)
        .single();

      if (!counselor) {
        toast.error("상담사 정보를 불러올 수 없습니다. 관리자에게 문의해 주세요.");
        return;
      }

      const { error } = await supabase.from("reservations").insert({
        user_id: user.id,
        counselor_id: counselor.id,
        type: "offline",
        status: "pending",
        memo: memo || null,
      });

      if (error) throw error;

      toast.success("예약 신청이 완료되었습니다. 상담사 확정 후 결제 안내가 발송됩니다.");
      router.push("/mypage");
    } catch {
      toast.error("예약 신청에 실패했습니다. 다시 시도해 주세요.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-[#F0FAF3] min-h-screen">
      <div className="max-w-[1200px] mx-auto px-6 py-12">
        <h1 className="font-heading text-3xl font-bold text-[#1E3A26] mb-2">대면상담 예약</h1>
        <p className="text-[#6B8C7B] mb-6">편안한 상담을 위해 예약 정보를 입력해 주세요.</p>

        {/* 대면상담 장소 안내 배너 */}
        <div className="bg-white border border-[#D0E8D8] rounded-2xl p-6 mb-8">
          <h3 className="font-medium text-[#1E3A26] mb-2">대면상담 장소 안내</h3>
          <ul className="text-sm text-[#6B8C7B] space-y-1">
            <li>• 대면상담은 <span className="text-[#1E3A26] font-medium">병점역 한신대학교 인근 지정 장소</span>에서 진행됩니다.</li>
            <li>• 예약 확정 후 구체적인 상담 장소를 개별 안내드립니다.</li>
            <li>• 화상상담을 원하시면 <a href="/reservation/online" className="text-[#4A85D4] hover:underline">화상상담 예약</a>을 이용해 주세요.</li>
          </ul>
        </div>

        {/* Progress steps */}
        <div className="flex items-center gap-2 mb-10">
          {[
            { n: 1, label: "유형 선택", icon: User },
            { n: 2, label: "일정 선택", icon: CalendarDays },
            { n: 3, label: "추가 정보", icon: Clock },
            { n: 4, label: "예약 확인", icon: CreditCard },
          ].map(({ n, label, icon: Icon }) => (
            <div key={n} className="flex items-center gap-2">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                  step >= n ? "bg-[#4A8C5E] text-white" : "bg-[#D0E8D8] text-[#6B8C7B]"
                }`}
              >
                {n}
              </div>
              <span className={`text-sm hidden sm:inline ${step >= n ? "text-[#1E3A26]" : "text-[#6B8C7B]"}`}>
                {label}
              </span>
              {n < 4 && <div className="w-8 h-px bg-[#D0E8D8] mx-1" />}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Step 1: 상담 유형 */}
            {step === 1 && (
              <Card className="border-[#D0E8D8] rounded-2xl">
                <CardHeader>
                  <CardTitle className="font-heading text-xl">상담 유형을 선택해 주세요</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    {COUNSELING_TYPES.map((type) => (
                      <button
                        key={type}
                        onClick={() => setSelectedType(type)}
                        className={`p-4 rounded-xl border-2 text-left transition-all ${
                          selectedType === type
                            ? "border-[#4A8C5E] bg-[#F0FAF3]"
                            : "border-[#D0E8D8] hover:border-[#8CC4A0]"
                        }`}
                      >
                        <span className="font-medium text-[#1E3A26]">{type}</span>
                      </button>
                    ))}
                  </div>
                  <Button
                    onClick={() => setStep(2)}
                    disabled={!selectedType}
                    className="mt-6 bg-[#4A8C5E] hover:bg-[#3D7A4E]"
                  >
                    다음 단계
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Step 2: 날짜·시간 */}
            {step === 2 && (
              <Card className="border-[#D0E8D8] rounded-2xl">
                <CardHeader>
                  <CardTitle className="font-heading text-xl">날짜와 시간을 선택해 주세요</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        disabled={(date) => date < new Date() || date.getDay() === 0}
                        className="rounded-xl border border-[#D0E8D8]"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[#1E3A26] mb-3">시간 선택</p>
                      <div className="grid grid-cols-3 gap-2">
                        {TIME_SLOTS.map((time) => (
                          <button
                            key={time}
                            onClick={() => setSelectedTime(time)}
                            className={`py-2 px-3 rounded-lg text-sm border transition-all ${
                              selectedTime === time
                                ? "border-[#4A8C5E] bg-[#4A8C5E] text-white"
                                : "border-[#D0E8D8] hover:border-[#8CC4A0] text-[#1E3A26]"
                            }`}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-3 mt-6">
                    <Button variant="outline" onClick={() => setStep(1)} className="border-[#D0E8D8]">
                      이전
                    </Button>
                    <Button
                      onClick={() => setStep(3)}
                      disabled={!selectedDate || !selectedTime}
                      className="bg-[#4A8C5E] hover:bg-[#3D7A4E]"
                    >
                      다음 단계
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 3: 추가 정보 */}
            {step === 3 && (
              <Card className="border-[#D0E8D8] rounded-2xl">
                <CardHeader>
                  <CardTitle className="font-heading text-xl">추가 정보</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-[#1E3A26] mb-2 block">
                        상담 메모 (선택)
                      </label>
                      <Textarea
                        value={memo}
                        onChange={(e) => setMemo(e.target.value)}
                        placeholder="상담 시 참고할 내용을 자유롭게 적어주세요."
                        className="border-[#D0E8D8] rounded-xl min-h-[120px]"
                      />
                    </div>
                  </div>
                  <div className="flex gap-3 mt-6">
                    <Button variant="outline" onClick={() => setStep(2)} className="border-[#D0E8D8]">
                      이전
                    </Button>
                    <Button onClick={() => setStep(4)} className="bg-[#4A8C5E] hover:bg-[#3D7A4E]">
                      다음 단계
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 4: 확인 */}
            {step === 4 && (
              <Card className="border-[#D0E8D8] rounded-2xl">
                <CardHeader>
                  <CardTitle className="font-heading text-xl">예약 정보 확인</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 bg-[#F0FAF3] rounded-xl p-6">
                    <div className="flex justify-between">
                      <span className="text-[#6B8C7B]">상담 유형</span>
                      <span className="font-medium text-[#1E3A26]">{selectedType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#6B8C7B]">상담사</span>
                      <span className="font-medium text-[#1E3A26]">정선이 박사</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#6B8C7B]">날짜</span>
                      <span className="font-medium text-[#1E3A26]">
                        {selectedDate?.toLocaleDateString("ko-KR")}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#6B8C7B]">시간</span>
                      <span className="font-medium text-[#1E3A26]">{selectedTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#6B8C7B]">상담 방식</span>
                      <Badge className="bg-[#4A8C5E]">대면 상담</Badge>
                    </div>
                    {memo && (
                      <div>
                        <span className="text-[#6B8C7B] block mb-1">메모</span>
                        <p className="text-sm text-[#1E3A26]">{memo}</p>
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-[#6B8C7B] mt-4">
                    * 예약 신청 후 상담사가 일정을 확인하고 확정합니다.<br />
                    * 확정 후 토스페이먼츠 결제 링크가 카카오톡/이메일로 발송됩니다.
                  </p>
                  <div className="flex gap-3 mt-6">
                    <Button variant="outline" onClick={() => setStep(3)} className="border-[#D0E8D8]">
                      이전
                    </Button>
                    <Button
                      onClick={handleSubmit}
                      disabled={submitting}
                      className="bg-[#4A85D4] hover:bg-[#C47A52] text-white"
                    >
                      {submitting ? "신청 중..." : "예약 신청하기"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar summary */}
          <div className="hidden lg:block">
            <Card className="border-[#D0E8D8] rounded-2xl sticky top-32">
              <CardHeader>
                <CardTitle className="font-heading text-lg">예약 요약</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-[#6B8C7B]">상담 방식</span>
                  <span className="text-[#1E3A26]">대면 상담</span>
                </div>
                {selectedType && (
                  <div className="flex justify-between">
                    <span className="text-[#6B8C7B]">유형</span>
                    <span className="text-[#1E3A26]">{selectedType}</span>
                  </div>
                )}
                {selectedDate && (
                  <div className="flex justify-between">
                    <span className="text-[#6B8C7B]">날짜</span>
                    <span className="text-[#1E3A26]">{selectedDate.toLocaleDateString("ko-KR")}</span>
                  </div>
                )}
                {selectedTime && (
                  <div className="flex justify-between">
                    <span className="text-[#6B8C7B]">시간</span>
                    <span className="text-[#1E3A26]">{selectedTime}</span>
                  </div>
                )}
                <div className="pt-3 border-t border-[#D0E8D8]">
                  <div className="flex justify-between font-bold">
                    <span className="text-[#1E3A26]">상담 비용</span>
                    <span className="text-[#4A85D4]">상담사 확정 후 안내</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
