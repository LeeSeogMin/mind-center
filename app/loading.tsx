export default function Loading() {
  return (
    <div className="bg-[#FBF8F3] min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-4 border-[#E8DDD0] border-t-[#8B6B4E] rounded-full animate-spin" />
        <p className="text-sm text-[#8C7B6B]">로딩 중...</p>
      </div>
    </div>
  );
}
