import Link from "next/link";
import {
  Baby,
  User,
  Heart,
  Briefcase,
  Store,
  Building2,
  Puzzle,
} from "lucide-react";
import { COUNSELING_SERVICES } from "@/lib/constants";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Baby,
  User,
  Heart,
  Briefcase,
  Store,
  Building2,
  Puzzle,
};

const EXTRA_SERVICES = [
  {
    slug: "small-business",
    title: "소상공인 상담",
    icon: "Store",
  },
  {
    slug: "organization",
    title: "기업·단체 상담",
    icon: "Building2",
  },
  {
    slug: "play-therapy",
    title: "놀이치료",
    icon: "Puzzle",
  },
];

export default function ServiceSection() {
  const allServices = [
    ...COUNSELING_SERVICES.map((s) => ({
      slug: s.slug,
      title: s.title,
      icon: s.icon,
    })),
    ...EXTRA_SERVICES,
  ];

  return (
    <section className="bg-white py-20 md:py-24">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-[#1E3A26]">
            상담 서비스
          </h2>
          <p className="mt-3 text-[#6B8C7B]">
            다양한 분야의 전문 상담 서비스를 제공합니다
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {allServices.map((service) => {
            const IconComponent = ICON_MAP[service.icon];

            return (
              <Link
                key={service.slug}
                href={`/counseling/${service.slug}`}
                className="group flex flex-col items-center gap-4 rounded-2xl border border-[#D0E8D8] bg-[#F0FAF3] p-6 md:p-8 transition-all hover:shadow-md hover:border-[#8CC4A0]"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#D0E8D8] text-[#4A8C5E] transition-colors group-hover:bg-[#8CC4A0] group-hover:text-white">
                  {IconComponent && <IconComponent className="h-6 w-6" />}
                </div>
                <span className="text-sm md:text-base font-medium text-[#1E3A26] text-center">
                  {service.title}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
