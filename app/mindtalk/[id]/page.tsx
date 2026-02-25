"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { ArrowLeft, MessageCircle } from "lucide-react";

// Sample data
const SAMPLE_POST = {
  id: "1",
  title: "직장 스트레스가 너무 심해요",
  content:
    "최근 업무량이 너무 많아져서 매일 야근을 하고 있습니다. 주말에도 쉬지 못하고 일하는 날이 많아요. 최근에는 출근할 때마다 가슴이 답답하고 불안한 느낌이 듭니다. 잠도 잘 못 자고 있어요. 이런 상태가 계속되면 어떻게 해야 할까요?",
  is_private: false,
  is_answered: true,
  created_at: "2025-02-20",
  user: "김OO",
  comments: [
    {
      id: "c1",
      author: "정선이 상담사",
      content:
        "안녕하세요, 김OO님. 말씀해주신 증상들 — 업무 과부하, 출근 시 답답함과 불안, 수면 장애 — 은 직무 스트레스가 상당히 누적된 상태를 나타내는 신호입니다.\n\n먼저, 이런 어려움을 표현해 주셔서 감사합니다. 혼자 견디지 않으시길 바랍니다.\n\n현재 상태에서 가능한 첫 단계로:\n1. 하루 중 짧은 시간이라도 '완전한 휴식' 시간을 확보해 보세요\n2. 수면 전 스마트폰·업무 관련 활동을 줄여보세요\n3. 보다 전문적인 대면 상담을 통해 스트레스 관리 방법을 함께 찾아볼 수 있습니다\n\n대면 또는 화상 상담 예약을 권해드립니다. 편하신 시간에 예약해 주세요.",
      created_at: "2025-02-21",
      is_counselor: true,
    },
  ],
};

export default function MindtalkDetailPage() {
  const [comment, setComment] = useState("");
  const post = SAMPLE_POST;

  return (
    <div className="bg-[#FBF8F3] min-h-screen">
      <div className="max-w-[800px] mx-auto px-6 py-12">
        <Link href="/mindtalk" className="inline-flex items-center gap-2 text-sm text-[#8C7B6B] hover:text-[#8B6B4E] mb-6">
          <ArrowLeft className="w-4 h-4" /> 목록으로 돌아가기
        </Link>

        {/* Post */}
        <Card className="border-[#E8DDD0] rounded-2xl mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="font-heading text-2xl">{post.title}</CardTitle>
              <Badge className={post.is_answered ? "bg-[#8B6B4E]" : "border-[#E8DDD0] text-[#8C7B6B]"}>
                {post.is_answered ? "답변완료" : "답변대기"}
              </Badge>
            </div>
            <p className="text-sm text-[#8C7B6B]">{post.user} · {post.created_at}</p>
          </CardHeader>
          <CardContent>
            <p className="text-[#3A2E26] leading-relaxed whitespace-pre-line">{post.content}</p>
          </CardContent>
        </Card>

        {/* Comments */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-[#8B6B4E]" />
            <h3 className="font-heading text-lg font-bold text-[#3A2E26]">
              상담사 답변 ({post.comments.length})
            </h3>
          </div>

          {post.comments.map((c) => (
            <Card key={c.id} className="border-[#C4A882] rounded-2xl bg-white">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Avatar className="w-10 h-10">
                    <AvatarFallback className="bg-[#8B6B4E] text-white text-sm">정</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-[#3A2E26]">{c.author}</p>
                    <p className="text-xs text-[#8C7B6B]">{c.created_at}</p>
                  </div>
                  <Badge className="bg-[#C4A882] text-white ml-auto">상담사</Badge>
                </div>
                <p className="text-[#3A2E26] leading-relaxed whitespace-pre-line">{c.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Reply form */}
        <Separator className="my-8 bg-[#E8DDD0]" />
        <Card className="border-[#E8DDD0] rounded-2xl">
          <CardContent className="p-6">
            <Textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="답글을 작성해 주세요..."
              className="border-[#E8DDD0] rounded-xl min-h-[100px] mb-4"
            />
            <Button className="bg-[#8B6B4E] hover:bg-[#7A5D42]">답글 등록</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
