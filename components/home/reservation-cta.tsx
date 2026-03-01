import Link from "next/link";

export default function ReservationCTA() {
  return (
    <section className="bg-[#2C3E6B]">
      <div className="max-w-[1200px] mx-auto px-6 py-10 md:py-12">
        <div className="flex flex-col items-center text-center space-y-3">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-white">
            지금 바로 예약하세요
          </h2>
          <p className="text-[#C8D6E5] max-w-md leading-relaxed">
            정선이 박사와 함께 마음의 변화를 시작하세요.
            Google Meet 화상상담으로 어디서든 편안하게 상담받으실 수 있습니다.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <Link
              href="/reservation/offline"
              className="inline-flex items-center justify-center rounded-xl bg-[#4A6FA5] px-8 py-3.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#5A82B8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
            >
              대면상담 예약
            </Link>
            <Link
              href="/reservation/online"
              className="inline-flex items-center justify-center rounded-xl border border-white/80 px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
            >
              화상상담 예약
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
