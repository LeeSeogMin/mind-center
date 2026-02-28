"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import type { PsychologicalTest } from "@/lib/types";

export default function TestPage() {
  const [tests, setTests] = useState<PsychologicalTest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTests() {
      const supabase = createClient();
      const { data } = await supabase
        .from("psychological_tests")
        .select("*")
        .eq("is_active", true)
        .order("created_at", { ascending: true });
      setTests(data ?? []);
      setLoading(false);
    }
    fetchTests();
  }, []);

  function formatDuration(min: number): string {
    if (min >= 60) {
      const hours = Math.floor(min / 60);
      const remaining = min % 60;
      return remaining > 0 ? `약 ${hours}~${hours + 1}시간` : `약 ${hours}시간`;
    }
    return `약 ${min}분`;
  }

  function formatPrice(price: number): string {
    if (price === 0) return "문의";
    return `${price.toLocaleString()}원`;
  }

  return (
    <div className="bg-[#F0FAF3]">
      {/* 페이지 헤더 */}
      <section className="bg-white border-b border-[#D0E8D8]">
        <div className="max-w-[1200px] mx-auto px-6 py-16 text-center">
          <h1 className="font-heading text-4xl font-bold text-[#1E3A26] mb-4">
            심리검사
          </h1>
          <p className="text-[#6B8C7B] text-lg">
            과학적이고 체계적인 심리검사로 자신을 더 깊이 이해해 보세요
          </p>
        </div>
      </section>

      {/* 안내 */}
      <section className="max-w-[1200px] mx-auto px-6 pt-20 pb-10">
        <div className="bg-white rounded-2xl border border-[#D0E8D8] p-8 max-w-3xl mx-auto text-center">
          <h2 className="font-heading text-xl font-bold text-[#1E3A26] mb-3">
            심리검사 안내
          </h2>
          <p className="text-[#6B8C7B] leading-relaxed text-sm">
            심리검사는 전문 상담사의 안내 하에 실시되며, 검사 결과는 개별 해석 상담을 통해
            상세히 설명드립니다. 검사 종류와 목적에 따라 소요 시간과 비용이 달라질 수 있으며,
            상담 시 함께 결정하실 수 있습니다.
          </p>
        </div>
      </section>

      {/* 검사 목록 */}
      <section className="max-w-[1200px] mx-auto px-6 pb-20">
        <div className="space-y-6 mt-10">
          {loading ? (
            <div className="text-center py-12 text-[#6B8C7B]">로딩 중...</div>
          ) : tests.length === 0 ? (
            <div className="text-center py-12 text-[#6B8C7B]">등록된 심리검사가 없습니다.</div>
          ) : (
            tests.map((test) => (
              <Card
                key={test.id}
                className="rounded-2xl bg-white border-[#D0E8D8] hover:border-[#8CC4A0] transition-colors"
              >
                <div className="grid md:grid-cols-[1fr_200px]">
                  <div>
                    <CardHeader>
                      <h3 className="font-heading text-xl font-bold text-[#1E3A26]">
                        {test.name}
                      </h3>
                      {test.tags && test.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {test.tags.map((tag) => (
                            <Badge
                              key={tag}
                              variant="secondary"
                              className="bg-[#F0FAF3] border border-[#D0E8D8] text-[#4A8C5E] text-xs"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-[#6B8C7B] leading-relaxed">
                        {test.description}
                      </p>
                    </CardContent>
                  </div>

                  {/* 오른쪽: 시간/가격 */}
                  <div className="flex md:flex-col items-center justify-center gap-4 p-6 md:border-l border-t md:border-t-0 border-[#D0E8D8] bg-[#F0FAF3] md:rounded-r-2xl">
                    <div className="text-center">
                      <p className="text-xs text-[#6B8C7B] mb-1">소요 시간</p>
                      <p className="text-sm font-medium text-[#1E3A26]">
                        {formatDuration(test.duration_min)}
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-[#6B8C7B] mb-1">검사 비용</p>
                      <p className="text-sm font-medium text-[#4A85D4]">
                        {formatPrice(test.price)}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white border-y border-[#D0E8D8]">
        <div className="max-w-[1200px] mx-auto px-6 py-16 text-center">
          <h2 className="font-heading text-2xl font-bold text-[#1E3A26] mb-4">
            심리검사를 받고 싶으신가요?
          </h2>
          <p className="text-[#6B8C7B] mb-8 max-w-md mx-auto text-sm">
            어떤 검사가 적합한지 상담사와 함께 상의하실 수 있습니다.
            편하게 문의해 주세요.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/reservation/offline">
              <Button className="bg-[#4A85D4] hover:bg-[#3B73C4] text-white px-8 h-12 text-base rounded-xl">
                상담 예약하기
              </Button>
            </Link>
            <a href="tel:010-2739-6432">
              <Button
                variant="outline"
                className="border-[#D0E8D8] text-[#4A8C5E] hover:bg-[#F0FAF3] px-8 h-12 text-base rounded-xl"
              >
                전화 문의: 010-2739-6432
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
