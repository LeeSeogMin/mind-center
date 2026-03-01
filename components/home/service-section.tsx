import Link from "next/link";
import {
  Baby,
  User,
  Heart,
  PersonStanding,
  Users,
  Building2,
} from "lucide-react";
import { COUNSELING_SERVICES } from "@/lib/constants";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Baby,
  User,
  Heart,
  PersonStanding,
  Users,
  Building2,
};

export default function ServiceSection() {
  const allServices = COUNSELING_SERVICES.map((s) => ({
    slug: s.slug,
    title: s.title,
    icon: s.icon,
  }));

  return (
    <section className="bg-[#FBF8F3] pt-12 pb-6 md:pt-14 md:pb-8">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-8">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-[#1E3A26]">
            상담 서비스
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-6">
          {allServices.map((service) => {
            const IconComponent = ICON_MAP[service.icon];

            return (
              <Link
                key={service.slug}
                href={`/counseling/${service.slug}`}
                className="group flex flex-col items-center gap-4 rounded-2xl border border-[#C8D6E5] bg-white p-6 md:p-8 transition-all hover:shadow-md hover:border-[#4A6FA5]"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#C8D6E5] text-[#2C3E6B] transition-colors group-hover:bg-[#4A6FA5] group-hover:text-white">
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
