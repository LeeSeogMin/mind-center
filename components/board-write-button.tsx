"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth-context";

interface BoardWriteButtonProps {
  category: "notice" | "review" | "column" | "qna";
}

export default function BoardWriteButton({ category }: BoardWriteButtonProps) {
  const { user, profile } = useAuth();

  if (!user) return null;

  const isAdmin = profile?.role === "counselor" || profile?.role === "admin";
  if (!isAdmin && category !== "review" && category !== "qna") return null;

  return (
    <Link href={`/board/write?category=${category}`}>
      <Button className="bg-[#8B6B4E] hover:bg-[#7A5D42] text-white rounded-xl">
        글쓰기
      </Button>
    </Link>
  );
}
