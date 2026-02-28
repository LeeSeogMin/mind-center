"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="bg-[#F0FAF3] min-h-screen flex items-center justify-center px-6">
      <Card className="w-full max-w-md rounded-2xl border-[#D0E8D8] text-center">
        <CardContent className="py-12 space-y-4">
          <div className="text-4xl">&#128172;</div>
          <h2 className="font-heading text-2xl font-bold text-[#1E3A26]">
            문제가 발생했습니다
          </h2>
          <p className="text-sm text-[#6B8C7B]">
            페이지를 불러오는 중 오류가 발생했습니다.
            <br />
            잠시 후 다시 시도해 주세요.
          </p>
          {process.env.NODE_ENV === "development" && (
            <p className="text-xs text-red-500 bg-red-50 rounded-xl p-3 text-left break-all">
              {error.message}
            </p>
          )}
          <div className="flex gap-3 justify-center pt-2">
            <Button
              onClick={reset}
              className="bg-[#4A8C5E] hover:bg-[#3D7A4E] text-white rounded-xl"
            >
              다시 시도
            </Button>
            <Button
              variant="outline"
              onClick={() => (window.location.href = "/")}
              className="border-[#D0E8D8] rounded-xl"
            >
              홈으로 이동
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
