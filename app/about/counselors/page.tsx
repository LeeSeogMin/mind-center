import type { Metadata } from "next";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { COUNSELOR_NAME, COUNSELOR_TITLE, SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: "상담사 소개",
};

const specialties = [
  "우울·불안",
  "자존감",
  "대인관계",
  "부부·가족",
  "아동청소년",
  "트라우마",
  "진로·적성",
  "스트레스 관리",
];

const education = [
  "OO대학교 상담심리학과 박사 수료",
  "OO대학교 상담심리학과 석사 졸업",
  "OO대학교 심리학과 학사 졸업",
];

const certifications = [
  "상담심리사 1급 (한국상담심리학회)",
  "전문상담사 1급 (한국상담학회)",
  "임상심리전문가 (한국임상심리학회)",
  "정신건강임상심리사 1급 (보건복지부)",
];

const experience = [
  `${SITE_NAME} 대표 (현)`,
  "OO대학교 학생상담센터 전임상담원",
  "OO심리상담센터 수석 상담사",
  "OO종합병원 정신건강의학과 임상심리사",
  "OO시 청소년상담복지센터 상담팀장",
];

export default function CounselorsPage() {
  return (
    <div className="bg-[#F0FAF3]">
      {/* 페이지 헤더 */}
      <section className="bg-white border-b border-[#D0E8D8]">
        <div className="max-w-[1200px] mx-auto px-6 py-16 text-center">
          <h1 className="font-heading text-4xl font-bold text-[#1E3A26] mb-4">
            상담사 소개
          </h1>
          <p className="text-[#6B8C7B] text-lg">
            전문성과 따뜻한 공감으로 함께하는 상담사를 소개합니다
          </p>
        </div>
      </section>

      {/* 상담사 카드 */}
      <section className="max-w-[1200px] mx-auto px-6 py-20">
        <Card className="rounded-2xl bg-white border-[#D0E8D8] overflow-hidden">
          <div className="grid md:grid-cols-[320px_1fr]">
            {/* 프로필 영역 */}
            <div className="bg-[#F0FAF3] p-10 flex flex-col items-center justify-start border-r border-[#D0E8D8]">
              <Avatar className="w-40 h-40 mb-6">
                <AvatarFallback className="bg-[#D0E8D8] text-[#4A8C5E] text-5xl font-heading">
                  {COUNSELOR_NAME.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <h2 className="font-heading text-2xl font-bold text-[#1E3A26] mb-1">
                {COUNSELOR_NAME}
              </h2>
              <p className="text-[#6B8C7B] text-sm mb-6">
                {COUNSELOR_TITLE} / 심리상담사
              </p>

              {/* 전문 분야 뱃지 */}
              <div className="flex flex-wrap gap-2 justify-center">
                {specialties.map((specialty) => (
                  <Badge
                    key={specialty}
                    variant="secondary"
                    className="bg-white border border-[#D0E8D8] text-[#4A8C5E] text-xs"
                  >
                    {specialty}
                  </Badge>
                ))}
              </div>
            </div>

            {/* 상세 정보 */}
            <div className="p-10">
              <CardHeader className="p-0 mb-8">
                <p className="text-[#1E3A26] leading-relaxed">
                  {COUNSELOR_NAME} {COUNSELOR_TITLE}는 다년간의 임상 경험과 학문적 연구를 바탕으로
                  내담자 한 분 한 분에게 맞춤화된 전문 상담을 제공하고 있습니다.
                  인지행동치료(CBT), 정서중심치료(EFT), 정신역동 상담 등 다양한 상담 기법을 활용하여
                  내담자의 심리적 어려움을 깊이 이해하고, 건강한 변화를 이끌어 나갑니다.
                </p>
              </CardHeader>

              <CardContent className="p-0 space-y-8">
                {/* 학력 */}
                <div>
                  <h3 className="font-heading text-lg font-bold text-[#1E3A26] mb-3 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#4A85D4]" />
                    학력
                  </h3>
                  <ul className="space-y-2 text-[#1E3A26] text-sm">
                    {education.map((item) => (
                      <li key={item} className="pl-4 relative before:content-['·'] before:absolute before:left-0 before:text-[#8CC4A0]">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 자격 */}
                <div>
                  <h3 className="font-heading text-lg font-bold text-[#1E3A26] mb-3 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#4A85D4]" />
                    자격 및 면허
                  </h3>
                  <ul className="space-y-2 text-[#1E3A26] text-sm">
                    {certifications.map((item) => (
                      <li key={item} className="pl-4 relative before:content-['·'] before:absolute before:left-0 before:text-[#8CC4A0]">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 경력 */}
                <div>
                  <h3 className="font-heading text-lg font-bold text-[#1E3A26] mb-3 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#4A85D4]" />
                    주요 경력
                  </h3>
                  <ul className="space-y-2 text-[#1E3A26] text-sm">
                    {experience.map((item) => (
                      <li key={item} className="pl-4 relative before:content-['·'] before:absolute before:left-0 before:text-[#8CC4A0]">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
}
