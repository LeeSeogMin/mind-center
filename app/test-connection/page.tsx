"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TestConnectionPage() {
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("");
  const [tables, setTables] = useState<string[]>([]);

  useEffect(() => {
    async function testConnection() {
      try {
        const supabase = createClient();

        // 간단한 쿼리로 연결 확인
        const { data, error } = await supabase.from("users").select("id").limit(1);

        if (error) {
          // 테이블이 없을 수 있음 — relation does not exist
          if (error.message.includes("does not exist")) {
            setStatus("error");
            setMessage("Supabase 연결은 성공했지만, 테이블이 아직 생성되지 않았습니다. SQL Editor에서 supabase-schema.sql을 실행해 주세요.");
            return;
          }
          throw error;
        }

        setStatus("success");
        setMessage("Supabase 연결 성공!");

        // 주요 테이블 존재 여부 확인
        const tableNames = ["users", "counselors", "reservations", "mindtalk_posts", "mindtalk_comments", "board_posts", "psychological_tests", "news_posts"];
        const foundTables: string[] = [];
        for (const table of tableNames) {
          const { error: tableError } = await supabase.from(table).select("id").limit(1);
          if (!tableError) {
            foundTables.push(table);
          }
        }
        setTables(foundTables);
      } catch (err) {
        setStatus("error");
        setMessage(`연결 실패: ${err instanceof Error ? err.message : String(err)}`);
      }
    }

    testConnection();
  }, []);

  return (
    <div className="bg-[#F0FAF3] min-h-screen flex items-center justify-center px-6">
      <Card className="w-full max-w-lg rounded-2xl border-[#D0E8D8]">
        <CardHeader>
          <CardTitle className="font-heading text-2xl text-center">Supabase 연결 테스트</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {status === "loading" && (
            <p className="text-center text-[#6B8C7B]">연결 확인 중...</p>
          )}
          {status === "success" && (
            <>
              <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
                <p className="text-green-700 font-medium text-lg">{message}</p>
              </div>
              {tables.length > 0 && (
                <div className="bg-white border border-[#D0E8D8] rounded-xl p-4">
                  <p className="text-sm font-medium text-[#1E3A26] mb-2">확인된 테이블 ({tables.length}개):</p>
                  <ul className="text-sm text-[#6B8C7B] space-y-1">
                    {tables.map((t) => (
                      <li key={t}>&#10003; {t}</li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}
          {status === "error" && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4">
              <p className="text-red-700 text-sm">{message}</p>
            </div>
          )}
          <div className="bg-[#F0FAF3] border border-[#D0E8D8] rounded-xl p-4 text-xs text-[#6B8C7B] space-y-1">
            <p><strong>다음 단계:</strong></p>
            <p>1. Supabase Dashboard → SQL Editor 열기</p>
            <p>2. supabase-schema.sql 내용 붙여넣기 → Run</p>
            <p>3. 이 페이지 새로고침하여 테이블 확인</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
