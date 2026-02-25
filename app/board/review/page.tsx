import type { Metadata } from "next";
import BoardList from "@/components/board-list";

export const metadata: Metadata = {
  title: "상담후기",
};

export default function ReviewPage() {
  return <BoardList category="review" title="상담후기" />;
}
