import type { Metadata } from "next";
import BoardList from "@/components/board-list";

export const metadata: Metadata = {
  title: "칼럼",
};

export default function ColumnPage() {
  return <BoardList category="column" title="칼럼" />;
}
