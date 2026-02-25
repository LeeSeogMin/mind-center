"use client";

import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/lib/auth-context";
import Link from "next/link";
import { CalendarDays, Clock, User, CreditCard } from "lucide-react";

const COUNSELING_TYPES = ["아동청소년", "성인", "부부·가족", "직장인·기업"];

const TIME_SLOTS = [
  "09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00",
];

export default function OfflineReservationPage() {
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [selectedType, setSelectedType] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [memo, setMemo] = useState("");

  if (!user) {
    return (
      <div className="max-w-[1200px] mx-auto px-6 py-20 text-center">
        <h1 className="font-heading text-3xl font-bold text-[#3A2E26] mb-4">대면상담 예약</h1>
        <p className="text-[#8C7B6B] mb-8">예약을 위해 로그인이 필요합니다.</p>
        <Link href="/login">
          <Button className="bg-[#8B6B4E] hover:bg-[#7A5D42]">로그인하기</Button>
        </Link>
      </div>
    );
  }

  const handleSubmit = async () => {
    // 예약 신청 → status: pending → 상담사 확정 후 결제 링크 발송
    alert("예약 신청이 완료되었습니다.\n상담사 확정 후 결제 링크가 발송됩니다.");
  };

  return (
    <div className="bg-[#FBF8F3] min-h-screen">
      <div className="max-w-[1200px] mx-auto px-6 py-12">
        <h1 className="font-heading text-3xl font-bold text-[#3A2E26] mb-2">대면상담 예약</h1>
        <p className="text-[#8C7B6B] mb-10">편안한 상담을 위해 예약 정보를 입력해 주세요.</p>

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
                  step >= n ? "bg-[#8B6B4E] text-white" : "bg-[#E8DDD0] text-[#8C7B6B]"
                }`}
              >
                {n}
              </div>
              <span className={`text-sm hidden sm:inline ${step >= n ? "text-[#3A2E26]" : "text-[#8C7B6B]"}`}>
                {label}
              </span>
              {n < 4 && <div className="w-8 h-px bg-[#E8DDD0] mx-1" />}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Step 1: 상담 유형 */}
            {step === 1 && (
              <Card className="border-[#E8DDD0] rounded-2xl">
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
                            ? "border-[#8B6B4E] bg-[#FBF8F3]"
                            : "border-[#E8DDD0] hover:border-[#C4A882]"
                        }`}
                      >
                        <span className="font-medium text-[#3A2E26]">{type}</span>
                      </button>
                    ))}
                  </div>
                  <Button
                    onClick={() => setStep(2)}
                    disabled={!selectedType}
                    className="mt-6 bg-[#8B6B4E] hover:bg-[#7A5D42]"
                  >
                    다음 단계
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Step 2: 날짜·시간 */}
            {step === 2 && (
              <Card className="border-[#E8DDD0] rounded-2xl">
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
                        className="rounded-xl border border-[#E8DDD0]"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[#3A2E26] mb-3">시간 선택</p>
                      <div className="grid grid-cols-3 gap-2">
                        {TIME_SLOTS.map((time) => (
                          <button
                            key={time}
                            onClick={() => setSelectedTime(time)}
                            className={`py-2 px-3 rounded-lg text-sm border transition-all ${
                              selectedTime === time
                                ? "border-[#8B6B4E] bg-[#8B6B4E] text-white"
                                : "border-[#E8DDD0] hover:border-[#C4A882] text-[#3A2E26]"
                            }`}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-3 mt-6">
                    <Button variant="outline" onClick={() => setStep(1)} className="border-[#E8DDD0]">
                      이전
                    </Button>
                    <Button
                      onClick={() => setStep(3)}
                      disabled={!selectedDate || !selectedTime}
                      className="bg-[#8B6B4E] hover:bg-[#7A5D42]"
                    >
                      다음 단계
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 3: 추가 정보 */}
            {step === 3 && (
              <Card className="border-[#E8DDD0] rounded-2xl">
                <CardHeader>
                  <CardTitle className="font-heading text-xl">추가 정보</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-[#3A2E26] mb-2 block">
                        상담 메모 (선택)
                      </label>
                      <Textarea
                        value={memo}
                        onChange={(e) => setMemo(e.target.value)}
                        placeholder="상담 시 참고할 내용을 자유롭게 적어주세요."
                        className="border-[#E8DDD0] rounded-xl min-h-[120px]"
                      />
                    </div>
                  </div>
                  <div className="flex gap-3 mt-6">
                    <Button variant="outline" onClick={() => setStep(2)} className="border-[#E8DDD0]">
                      이전
                    </Button>
                    <Button onClick={() => setStep(4)} className="bg-[#8B6B4E] hover:bg-[#7A5D42]">
                      다음 단계
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 4: 확인 */}
            {step === 4 && (
              <Card className="border-[#E8DDD0] rounded-2xl">
                <CardHeader>
                  <CardTitle className="font-heading text-xl">예약 정보 확인</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 bg-[#FBF8F3] rounded-xl p-6">
                    <div className="flex justify-between">
                      <span className="text-[#8C7B6B]">상담 유형</span>
                      <span className="font-medium text-[#3A2E26]">{selectedType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#8C7B6B]">상담사</span>
                      <span className="font-medium text-[#3A2E26]">정선이 박사</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#8C7B6B]">날짜</span>
                      <span className="font-medium text-[#3A2E26]">
                        {selectedDate?.toLocaleDateString("ko-KR")}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#8C7B6B]">시간</span>
                      <span className="font-medium text-[#3A2E26]">{selectedTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#8C7B6B]">상담 방식</span>
                      <Badge className="bg-[#8B6B4E]">대면 상담</Badge>
                    </div>
                    {memo && (
                      <div>
                        <span className="text-[#8C7B6B] block mb-1">메모</span>
                        <p className="text-sm text-[#3A2E26]">{memo}</p>
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-[#8C7B6B] mt-4">
                    * 예약 신청 후 상담사가 일정을 확인하고 확정합니다.<br />
                    * 확정 후 토스페이먼츠 결제 링크가 카카오톡/이메일로 발송됩니다.
                  </p>
                  <div className="flex gap-3 mt-6">
                    <Button variant="outline" onClick={() => setStep(3)} className="border-[#E8DDD0]">
                      이전
                    </Button>
                    <Button onClick={handleSubmit} className="bg-[#D4845A] hover:bg-[#C47A52] text-white">
                      예약 신청하기
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar summary */}
          <div className="hidden lg:block">
            <Card className="border-[#E8DDD0] rounded-2xl sticky top-32">
              <CardHeader>
                <CardTitle className="font-heading text-lg">예약 요약</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-[#8C7B6B]">상담 방식</span>
                  <span className="text-[#3A2E26]">대면 상담</span>
                </div>
                {selectedType && (
                  <div className="flex justify-between">
                    <span className="text-[#8C7B6B]">유형</span>
                    <span className="text-[#3A2E26]">{selectedType}</span>
                  </div>
                )}
                {selectedDate && (
                  <div className="flex justify-between">
                    <span className="text-[#8C7B6B]">날짜</span>
                    <span className="text-[#3A2E26]">{selectedDate.toLocaleDateString("ko-KR")}</span>
                  </div>
                )}
                {selectedTime && (
                  <div className="flex justify-between">
                    <span className="text-[#8C7B6B]">시간</span>
                    <span className="text-[#3A2E26]">{selectedTime}</span>
                  </div>
                )}
                <div className="pt-3 border-t border-[#E8DDD0]">
                  <div className="flex justify-between font-bold">
                    <span className="text-[#3A2E26]">상담 비용</span>
                    <span className="text-[#D4845A]">상담사 확정 후 안내</span>
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
