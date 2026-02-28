export default function Loading() {
  return (
    <div className="bg-[#F0FAF3] min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-4 border-[#D0E8D8] border-t-[#4A8C5E] rounded-full animate-spin" />
        <p className="text-sm text-[#6B8C7B]">로딩 중...</p>
      </div>
    </div>
  );
}
