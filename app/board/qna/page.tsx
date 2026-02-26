import type { Metadata } from "next";
import BoardList from "@/components/board-list";

export const metadata: Metadata = { title: "Q&A" };

export default function QnaPage() {
  return <BoardList category="qna" title="Q&A" />;
}
