import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function NotFound() {
  return (
    <div className="bg-[#FBF8F3] min-h-screen flex items-center justify-center px-6">
      <Card className="w-full max-w-md rounded-2xl border-[#E8DDD0] text-center">
        <CardContent className="py-12 space-y-4">
          <div className="text-6xl font-heading font-bold text-[#E8DDD0]">404</div>
          <h2 className="font-heading text-2xl font-bold text-[#3A2E26]">
            페이지를 찾을 수 없습니다
          </h2>
          <p className="text-sm text-[#8C7B6B]">
            요청하신 페이지가 존재하지 않거나 이동되었습니다.
          </p>
          <Link href="/">
            <Button className="bg-[#8B6B4E] hover:bg-[#7A5D42] text-white rounded-xl mt-2">
              홈으로 이동
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
