import type { Metadata } from "next";
import BoardList from "@/components/board-list";

export const metadata: Metadata = {
  title: "공지사항",
};

export default function NoticePage() {
  return <BoardList category="notice" title="공지사항" />;
}
