import type { Metadata } from "next";
import Image from "next/image";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "연구진 소개",
};

export default function CounselorsPage() {
  return (
    <div className="bg-[#F0FAF3]">
      {/* 페이지 헤더 */}
      <section className="bg-[#2D5A3D] border-b border-[#D0E8D8]">
        <div className="max-w-[1200px] mx-auto px-6 py-12 text-center">
          <h1 className="font-heading text-4xl font-bold text-white mb-4">
            연구진 소개
          </h1>
          <p className="text-white/80 text-lg">
            공감터의 모든 연구진은 각 분야별 경력 10년 이상의
            석·박사로 구성된 <span className="text-[#E8863A] font-bold">베테랑 상담전문가</span>입니다
          </p>
        </div>
      </section>

      {/* 연구진 카드 */}
      <section className="max-w-[1200px] mx-auto px-6 pt-10 pb-20 space-y-10">
        {/* 첫 번째 연구진 */}
        <Card className="rounded-2xl bg-white border-[#2C3E6B] overflow-hidden">
          <div className="grid md:grid-cols-[320px_1fr]">
            <div className="bg-[#F0FAF3] p-10 flex flex-col items-center text-center border-r border-[#D0E8D8]">
              <div className="w-40 h-40 rounded-full overflow-hidden mb-6 relative">
                <Image
                  src="/정선이(센터용).png"
                  alt="정선이 상담학 박사"
                  fill
                  className="object-cover object-top"
                />
              </div>
              <h2 className="font-heading text-2xl font-bold text-[#1E3A26] mb-2">
                정선이
              </h2>
              <p className="text-[#6B8C7B] text-base">
                상담학 박사 / 공감터 대표
              </p>
              <p className="text-[#6B8C7B] text-base">
                부부·가족 치료상담 전문
              </p>
            </div>
            <div className="p-10">
              {/* 상세 정보 영역 */}
            </div>
          </div>
        </Card>

        {/* 두 번째 연구진 */}
        <Card className="rounded-2xl bg-white border-[#2C3E6B] overflow-hidden">
          <div className="grid md:grid-cols-[320px_1fr]">
            <div className="bg-[#F0FAF3] p-10 flex flex-col items-center text-center border-r border-[#D0E8D8]">
              <div className="w-40 h-40 rounded-full overflow-hidden mb-6 relative bg-[#D0E8D8]">
              </div>
              <h2 className="font-heading text-2xl font-bold text-[#1E3A26] mb-2">
                연구진 이름
              </h2>
              <p className="text-[#6B8C7B] text-base">
                직함 / 소속
              </p>
              <p className="text-[#6B8C7B] text-base">
                전문 분야
              </p>
            </div>
            <div className="p-10">
              {/* 상세 정보 영역 */}
            </div>
          </div>
        </Card>

        {/* 세 번째 연구진 */}
        <Card className="rounded-2xl bg-white border-[#2C3E6B] overflow-hidden">
          <div className="grid md:grid-cols-[320px_1fr]">
            <div className="bg-[#F0FAF3] p-10 flex flex-col items-center text-center border-r border-[#D0E8D8]">
              <div className="w-40 h-40 rounded-full overflow-hidden mb-6 relative bg-[#D0E8D8]">
              </div>
              <h2 className="font-heading text-2xl font-bold text-[#1E3A26] mb-2">
                연구진 이름
              </h2>
              <p className="text-[#6B8C7B] text-base">
                직함 / 소속
              </p>
              <p className="text-[#6B8C7B] text-base">
                전문 분야
              </p>
            </div>
            <div className="p-10">
              {/* 상세 정보 영역 */}
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
}
