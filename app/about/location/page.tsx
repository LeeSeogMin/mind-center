import type { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: "오시는 길",
};

export default function LocationPage() {
  return (
    <div className="bg-[#FBF8F3]">
      {/* 페이지 헤더 */}
      <section className="bg-white border-b border-[#E8DDD0]">
        <div className="max-w-[1200px] mx-auto px-6 py-16 text-center">
          <h1 className="font-heading text-4xl font-bold text-[#3A2E26] mb-4">
            오시는 길
          </h1>
          <p className="text-[#8C7B6B] text-lg">
            {SITE_NAME} 위치 및 교통 안내
          </p>
        </div>
      </section>

      <section className="max-w-[1200px] mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-[1fr_400px] gap-10">
          {/* 지도 영역 */}
          <div className="w-full aspect-[4/3] lg:aspect-auto lg:min-h-[500px] bg-[#E8DDD0] rounded-2xl border border-[#E8DDD0] flex items-center justify-center">
            <div className="text-center text-[#8C7B6B]">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/60 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-[#C4A882]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <p className="text-lg font-medium">지도 영역</p>
              <p className="text-sm mt-1">카카오맵 또는 네이버 지도가 표시됩니다</p>
            </div>
          </div>

          {/* 정보 영역 */}
          <div className="space-y-6">
            {/* 주소 */}
            <Card className="rounded-2xl bg-white border-[#E8DDD0]">
              <CardContent className="p-6">
                <h3 className="font-heading text-lg font-bold text-[#3A2E26] mb-4">
                  센터 위치
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex gap-3">
                    <span className="text-[#8C7B6B] w-16 shrink-0">주소</span>
                    <span className="text-[#3A2E26]">
                      서울특별시 OO구 OO로 123, 4층
                    </span>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-[#8C7B6B] w-16 shrink-0">전화</span>
                    <span className="text-[#3A2E26]">02-1234-5678</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-[#8C7B6B] w-16 shrink-0">이메일</span>
                    <span className="text-[#3A2E26]">contact@gongamteo.kr</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 운영 시간 */}
            <Card className="rounded-2xl bg-white border-[#E8DDD0]">
              <CardContent className="p-6">
                <h3 className="font-heading text-lg font-bold text-[#3A2E26] mb-4">
                  운영 시간
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex gap-3">
                    <span className="text-[#8C7B6B] w-20 shrink-0">평일</span>
                    <span className="text-[#3A2E26]">09:00 ~ 21:00</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-[#8C7B6B] w-20 shrink-0">토요일</span>
                    <span className="text-[#3A2E26]">10:00 ~ 18:00</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-[#8C7B6B] w-20 shrink-0">일·공휴일</span>
                    <span className="text-[#D4845A]">휴무</span>
                  </div>
                  <p className="text-xs text-[#8C7B6B] mt-2 pt-2 border-t border-[#E8DDD0]">
                    * 상담 예약제로 운영되며, 방문 전 예약을 권장드립니다.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* 교통 안내 */}
            <Card className="rounded-2xl bg-white border-[#E8DDD0]">
              <CardContent className="p-6">
                <h3 className="font-heading text-lg font-bold text-[#3A2E26] mb-4">
                  교통 안내
                </h3>
                <div className="space-y-4 text-sm">
                  <div>
                    <p className="font-medium text-[#8B6B4E] mb-1.5">지하철</p>
                    <p className="text-[#3A2E26]">
                      OO역 O번 출구에서 도보 5분
                    </p>
                    <p className="text-[#8C7B6B] text-xs mt-1">
                      (O호선, O호선 환승역)
                    </p>
                  </div>
                  <div className="border-t border-[#E8DDD0] pt-4">
                    <p className="font-medium text-[#8B6B4E] mb-1.5">버스</p>
                    <p className="text-[#3A2E26]">
                      OO정류장 하차
                    </p>
                    <p className="text-[#8C7B6B] text-xs mt-1">
                      간선: 100, 200, 300 | 지선: 1100, 2200
                    </p>
                  </div>
                  <div className="border-t border-[#E8DDD0] pt-4">
                    <p className="font-medium text-[#8B6B4E] mb-1.5">자가용</p>
                    <p className="text-[#3A2E26]">
                      건물 지하 주차장 이용 가능 (2시간 무료)
                    </p>
                    <p className="text-[#8C7B6B] text-xs mt-1">
                      네비게이션: &quot;{SITE_NAME}&quot; 검색
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
