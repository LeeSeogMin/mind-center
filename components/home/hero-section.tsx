import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative bg-[#FBF8F3] border-b border-[#C8D6E5] overflow-hidden">
      {/* 배경 일러스트 */}
      <div className="absolute inset-0">
        <Image
          src="/about-illustration.jpg"
          alt="꽃밭 일러스트"
          fill
          className="object-cover opacity-30"
          priority
        />
      </div>
      <div className="relative max-w-[1200px] mx-auto px-6 py-20 text-center space-y-3">
        <h1 className="font-heading text-2xl md:text-3xl font-bold text-[#C48B8B] leading-relaxed">
          당신의 마음은 안녕하신가요?
        </h1>
        <p className="font-heading text-lg md:text-xl font-bold text-[#5C3A1E] leading-relaxed">
          깊은 이해와 마음에 닿는 진심
        </p>
        <p className="font-heading text-lg md:text-xl font-bold text-[#5C3A1E] leading-relaxed">
          삶을 바꾸는 상담
        </p>
        <p className="font-heading text-lg md:text-xl font-bold text-[#5C3A1E] leading-relaxed">
          공감터와의 만남은 당신을 새롭게 합니다
        </p>
        <div className="flex flex-wrap justify-center gap-3 pt-4">
          <Link
            href="/reservation/offline"
            className="inline-flex items-center justify-center rounded-xl bg-[#2C3E6B] px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#3B5068] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2C3E6B]/50"
          >
            상담예약하기
          </Link>
          <Link
            href="/about"
            className="inline-flex items-center justify-center rounded-xl border border-[#C8D6E5] bg-white/70 px-7 py-3.5 text-sm font-semibold text-[#2C3E6B] transition-colors hover:bg-[#F3EDE5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2C3E6B]/30"
          >
            연구소 둘러보기
          </Link>
        </div>
      </div>
    </section>
  );
}
