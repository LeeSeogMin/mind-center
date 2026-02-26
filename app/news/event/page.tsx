"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

interface EventItem {
  id: string;
  title: string;
  content: string;
  thumbnail: string | null;
  starts_at: string | null;
  ends_at: string | null;
  created_at: string;
}

function getEventStatus(starts_at: string | null, ends_at: string | null): string {
  const now = new Date();
  if (!starts_at || !ends_at) return "진행중";
  const start = new Date(starts_at);
  const end = new Date(ends_at);
  if (now < start) return "예정";
  if (now > end) return "종료";
  return "진행중";
}

function getStatusColor(status: string) {
  switch (status) {
    case "진행중":
      return "bg-[#D4845A] text-white";
    case "예정":
      return "bg-[#C4A882] text-white";
    case "종료":
      return "bg-[#E8DDD0] text-[#8C7B6B]";
    default:
      return "bg-[#E8DDD0] text-[#8C7B6B]";
  }
}

function formatDateRange(starts_at: string | null, ends_at: string | null): string {
  if (!starts_at || !ends_at) return "";
  const start = new Date(starts_at).toLocaleDateString("ko-KR");
  const end = new Date(ends_at).toLocaleDateString("ko-KR");
  return `${start} ~ ${end}`;
}

export default function EventPage() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      const supabase = createClient();
      const { data } = await supabase
        .from("news_posts")
        .select("id, title, content, thumbnail, starts_at, ends_at, created_at")
        .eq("category", "event")
        .order("created_at", { ascending: false });
      setEvents(data ?? []);
      setLoading(false);
    }
    fetchEvents();
  }, []);

  return (
    <div className="bg-[#FBF8F3]">
      {/* 페이지 헤더 */}
      <section className="bg-white border-b border-[#E8DDD0]">
        <div className="max-w-[1200px] mx-auto px-6 py-16 text-center">
          <h1 className="font-heading text-4xl font-bold text-[#3A2E26] mb-4">
            이벤트
          </h1>
          <p className="text-[#8C7B6B] text-lg">
            공감터 심리상담연구소의 특별한 이벤트를 만나보세요
          </p>
        </div>
      </section>

      <section className="max-w-[1200px] mx-auto px-6 py-20">
        {/* 탭 네비게이션 */}
        <div className="flex gap-2 mb-10 border-b border-[#E8DDD0] pb-4">
          <Link
            href="/news/center"
            className="px-5 py-2.5 rounded-xl text-sm font-medium bg-white text-[#8C7B6B] border border-[#E8DDD0] hover:border-[#C4A882] hover:text-[#8B6B4E] transition-colors"
          >
            센터소식
          </Link>
          <Link
            href="/news/event"
            className="px-5 py-2.5 rounded-xl text-sm font-medium bg-[#8B6B4E] text-white"
          >
            이벤트
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-12 text-[#8C7B6B]">로딩 중...</div>
        ) : events.length === 0 ? (
          <div className="text-center py-12 text-[#8C7B6B]">등록된 이벤트가 없습니다.</div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {events.map((event) => {
              const status = getEventStatus(event.starts_at, event.ends_at);
              return (
                <Card
                  key={event.id}
                  className="rounded-2xl bg-white border-[#E8DDD0] hover:border-[#C4A882] hover:shadow-md transition-all cursor-pointer group overflow-hidden"
                >
                  {/* 썸네일 */}
                  <div className="h-48 bg-[#F3EDE5] flex items-center justify-center relative overflow-hidden">
                    {event.thumbnail ? (
                      <img src={event.thumbnail} alt={event.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="text-center text-[#C4A882]">
                        <svg className="w-10 h-10 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <p className="text-xs">이벤트 이미지</p>
                      </div>
                    )}
                    <Badge className={`absolute top-4 right-4 ${getStatusColor(status)}`}>
                      {status}
                    </Badge>
                  </div>

                  <CardHeader className="pb-2">
                    <p className="text-xs text-[#D4845A] font-medium">
                      {formatDateRange(event.starts_at, event.ends_at)}
                    </p>
                    <h3 className="font-heading text-lg font-bold text-[#3A2E26] group-hover:text-[#8B6B4E] transition-colors leading-snug">
                      {event.title}
                    </h3>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-[#8C7B6B] leading-relaxed line-clamp-2">
                      {event.content.length > 150 ? event.content.slice(0, 150) + "..." : event.content}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
