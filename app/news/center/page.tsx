"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

interface NewsItem {
  id: string;
  title: string;
  content: string;
  thumbnail: string | null;
  created_at: string;
}

export default function CenterNewsPage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNews() {
      const supabase = createClient();
      const { data } = await supabase
        .from("news_posts")
        .select("id, title, content, thumbnail, created_at")
        .eq("category", "center")
        .order("created_at", { ascending: false });
      setNews(data ?? []);
      setLoading(false);
    }
    fetchNews();
  }, []);

  return (
    <div className="bg-[#FBF8F3]">
      {/* 페이지 헤더 */}
      <section className="bg-white border-b border-[#E8DDD0]">
        <div className="max-w-[1200px] mx-auto px-6 py-16 text-center">
          <h1 className="font-heading text-4xl font-bold text-[#3A2E26] mb-4">
            센터소식
          </h1>
          <p className="text-[#8C7B6B] text-lg">
            공감터 심리상담연구소의 새로운 소식을 전합니다
          </p>
        </div>
      </section>

      <section className="max-w-[1200px] mx-auto px-6 py-20">
        {/* 탭 네비게이션 */}
        <div className="flex gap-2 mb-10 border-b border-[#E8DDD0] pb-4">
          <Link
            href="/news/center"
            className="px-5 py-2.5 rounded-xl text-sm font-medium bg-[#8B6B4E] text-white"
          >
            센터소식
          </Link>
          <Link
            href="/news/event"
            className="px-5 py-2.5 rounded-xl text-sm font-medium bg-white text-[#8C7B6B] border border-[#E8DDD0] hover:border-[#C4A882] hover:text-[#8B6B4E] transition-colors"
          >
            이벤트
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-12 text-[#8C7B6B]">로딩 중...</div>
        ) : news.length === 0 ? (
          <div className="text-center py-12 text-[#8C7B6B]">등록된 소식이 없습니다.</div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {news.map((item) => (
              <Card
                key={item.id}
                className="rounded-2xl bg-white border-[#E8DDD0] hover:border-[#C4A882] hover:shadow-md transition-all cursor-pointer group"
              >
                {/* 썸네일 */}
                <div className="h-48 bg-[#F3EDE5] rounded-t-2xl flex items-center justify-center overflow-hidden">
                  {item.thumbnail ? (
                    <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-center text-[#C4A882]">
                      <svg className="w-10 h-10 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                      </svg>
                      <p className="text-xs">이미지</p>
                    </div>
                  )}
                </div>
                <CardHeader className="pb-2">
                  <p className="text-xs text-[#8C7B6B]">
                    {new Date(item.created_at).toLocaleDateString("ko-KR")}
                  </p>
                  <h3 className="font-heading text-lg font-bold text-[#3A2E26] group-hover:text-[#8B6B4E] transition-colors leading-snug">
                    {item.title}
                  </h3>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-[#8C7B6B] leading-relaxed line-clamp-2">
                    {item.content.length > 150 ? item.content.slice(0, 150) + "..." : item.content}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
