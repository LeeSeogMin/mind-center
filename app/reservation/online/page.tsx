"use client";

import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/lib/auth-context";
import Link from "next/link";
import { Video, CalendarDays, Clock, CreditCard } from "lucide-react";

const COUNSELING_TYPES = ["아동청소년", "성인", "부부·가족", "직장인·기업"];
const TIME_SLOTS = ["09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00"];

export default function OnlineReservationPage() {
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [selectedType, setSelectedType] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState("");
  const [memo, setMemo] = useState("");

  if (!user) {
    return (
      <div className="max-w-[1200px] mx-auto px-6 py-20 text-center">
        <h1 className="font-heading text-3xl font-bold text-[#3A2E26] mb-4">화상상담 예약</h1>
        <p className="text-[#8C7B6B] mb-8">예약을 위해 로그인이 필요합니다.</p>
        <Link href="/login">
          <Button className="bg-[#8B6B4E] hover:bg-[#7A5D42]">로그인하기</Button>
        </Link>
      </div>
    );
  }

  const handleSubmit = async () => {
    alert("화상상담 예약 신청이 완료되었습니다.\n상담사 확정 후 결제 링크와 구글 미트 링크가 발송됩니다.");
  };

  return (
    <div className="bg-[#FBF8F3] min-h-screen">
      <div className="max-w-[1200px] mx-auto px-6 py-12">
        <div className="flex items-center gap-3 mb-2">
          <Video className="w-7 h-7 text-[#8B6B4E]" />
          <h1 className="font-heading text-3xl font-bold text-[#3A2E26]">화상상담 예약</h1>
        </div>
        <p className="text-[#8C7B6B] mb-10">구글 미트(Google Meet)를 통한 화상 상담을 예약합니다.</p>

        {/* Info banner */}
        <div className="bg-white border border-[#E8DDD0] rounded-2xl p-6 mb-8">
          <h3 className="font-medium text-[#3A2E26] mb-2">화상상담 안내</h3>
          <ul className="text-sm text-[#8C7B6B] space-y-1">
            <li>• 결제 완료 후 구글 미트 링크가 안내됩니다.</li>
            <li>• 상담 시간 5분 전에 링크에 접속해 주세요.</li>
            <li>• 조용한 장소에서 이어폰 착용을 권장합니다.</li>
            <li>• 카메라·마이크가 작동하는 PC 또는 스마트폰이 필요합니다.</li>
          </ul>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
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
                  <Button onClick={() => setStep(2)} disabled={!selectedType} className="mt-6 bg-[#8B6B4E] hover:bg-[#7A5D42]">
                    다음 단계
                  </Button>
                </CardContent>
              </Card>
            )}

            {step === 2 && (
              <Card className="border-[#E8DDD0] rounded-2xl">
                <CardHeader>
                  <CardTitle className="font-heading text-xl">날짜와 시간을 선택해 주세요</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      disabled={(date) => date < new Date() || date.getDay() === 0}
                      className="rounded-xl border border-[#E8DDD0]"
                    />
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
                    <Button variant="outline" onClick={() => setStep(1)} className="border-[#E8DDD0]">이전</Button>
                    <Button onClick={() => setStep(3)} disabled={!selectedDate || !selectedTime} className="bg-[#8B6B4E] hover:bg-[#7A5D42]">다음 단계</Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {step === 3 && (
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
                      <span className="font-medium text-[#3A2E26]">{selectedDate?.toLocaleDateString("ko-KR")}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#8C7B6B]">시간</span>
                      <span className="font-medium text-[#3A2E26]">{selectedTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#8C7B6B]">상담 방식</span>
                      <Badge className="bg-[#D4845A]">화상 상담 (Google Meet)</Badge>
                    </div>
                  </div>
                  <Textarea
                    value={memo}
                    onChange={(e) => setMemo(e.target.value)}
                    placeholder="상담 시 참고할 내용을 자유롭게 적어주세요. (선택)"
                    className="mt-4 border-[#E8DDD0] rounded-xl min-h-[100px]"
                  />
                  <p className="text-sm text-[#8C7B6B] mt-4">
                    * 예약 신청 후 상담사가 일정을 확인하고 확정합니다.<br />
                    * 확정 후 결제 링크와 구글 미트 링크가 발송됩니다.
                  </p>
                  <div className="flex gap-3 mt-6">
                    <Button variant="outline" onClick={() => setStep(2)} className="border-[#E8DDD0]">이전</Button>
                    <Button onClick={handleSubmit} className="bg-[#D4845A] hover:bg-[#C47A52] text-white">예약 신청하기</Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          <div className="hidden lg:block">
            <Card className="border-[#E8DDD0] rounded-2xl sticky top-32">
              <CardHeader>
                <CardTitle className="font-heading text-lg">예약 요약</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-[#8C7B6B]">상담 방식</span>
                  <span className="text-[#3A2E26]">화상 상담</span>
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
