import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function NotFound() {
  return (
    <div className="bg-[#F0FAF3] min-h-screen flex items-center justify-center px-6">
      <Card className="w-full max-w-md rounded-2xl border-[#D0E8D8] text-center">
        <CardContent className="py-12 space-y-4">
          <div className="text-6xl font-heading font-bold text-[#D0E8D8]">404</div>
          <h2 className="font-heading text-2xl font-bold text-[#1E3A26]">
            페이지를 찾을 수 없습니다
          </h2>
          <p className="text-sm text-[#6B8C7B]">
            요청하신 페이지가 존재하지 않거나 이동되었습니다.
          </p>
          <Link href="/">
            <Button className="bg-[#4A8C5E] hover:bg-[#3D7A4E] text-white rounded-xl mt-2">
              홈으로 이동
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
