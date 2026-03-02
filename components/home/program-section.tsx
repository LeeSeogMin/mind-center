"use client";

import Link from "next/link";
import {
  Brain,
  Building2,
  ClipboardCheck,
  UsersRound,
  GraduationCap,
} from "lucide-react";

const PROGRAMS = [
  { title: "심리상담", desc: "아동·청소년, 성인\n커플·부부·가족, 노인", icon: Brain, href: "/counseling", bg: "#8BBF8B", hover: "#7AAF7A" },
  { title: "심리검사", desc: "MMPI-2, SCT\nTCI, WISC", icon: ClipboardCheck, href: "/test", bg: "#6BA86B", hover: "#5A985A" },
  { title: "기업상담", desc: "임직원, 배우자, 자녀", icon: Building2, href: "/counseling/corporate", bg: "#4C8F4C", hover: "#3C7F3C" },
  { title: "집단 프로그램", desc: "부모교육, 의사소통\n미술치료", icon: UsersRound, href: "/group-program", bg: "#3C7544", hover: "#2C6534" },
  { title: "논문 컨설팅", desc: "통계분석, 질적연구\n논문특강 및 코칭", icon: GraduationCap, href: "/consulting", bg: "#2D5A3D", hover: "#3D7A4E" },
];

export default function ProgramSection() {
  return (
    <section className="bg-[#FBF8F3] pt-10 pb-14 md:pt-12 md:pb-16">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex justify-center gap-4 md:gap-6">
          {PROGRAMS.map((item) => {
            const IconComponent = item.icon;
            return (
              <Link
                key={item.title}
                href={item.href}
                className="group flex flex-col items-center"
              >
                <div
                  className="flex h-36 w-36 md:h-40 md:w-40 flex-col items-center justify-center rounded-full text-white shadow-lg gap-1 transition-colors border-[5px] border-[#C4A870]"
                  style={{ backgroundColor: item.bg }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = item.hover}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = item.bg}
                >
                  <IconComponent className="h-8 w-8 mb-0.5" />
                  <span className="text-base md:text-lg font-bold leading-tight">
                    {item.title}
                  </span>
                  <span className="text-sm leading-tight text-center whitespace-pre-line text-white">
                    {item.desc}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
