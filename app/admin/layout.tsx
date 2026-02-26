"use client";

import { useAuth } from "@/lib/auth-context";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { LayoutDashboard, CalendarDays, ClipboardCheck, Users, ArrowLeft } from "lucide-react";

const ADMIN_NAV = [
  { href: "/admin", icon: LayoutDashboard, label: "대시보드" },
  { href: "/admin/reservations", icon: CalendarDays, label: "예약 관리" },
  { href: "/admin/tests", icon: ClipboardCheck, label: "심리검사 관리" },
  { href: "/admin/users", icon: Users, label: "회원 관리" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { profile, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && profile?.role !== "admin" && profile?.role !== "counselor") {
      router.push("/");
    }
  }, [loading, profile, router]);

  if (loading) {
    return (
      <div className="bg-[#FBF8F3] min-h-screen flex items-center justify-center">
        <p className="text-[#8C7B6B]">로딩 중...</p>
      </div>
    );
  }

  if (profile?.role !== "admin" && profile?.role !== "counselor") {
    return null;
  }

  return (
    <div className="bg-[#FBF8F3] min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-60 border-r border-[#E8DDD0] bg-white hidden md:block">
        <div className="p-6 border-b border-[#E8DDD0]">
          <h2 className="font-heading text-lg font-bold text-[#8B6B4E]">관리자</h2>
        </div>
        <nav className="p-4 space-y-1">
          {ADMIN_NAV.map(({ href, icon: Icon, label }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  active
                    ? "bg-[#FBF8F3] text-[#8B6B4E]"
                    : "text-[#8C7B6B] hover:bg-[#FBF8F3] hover:text-[#8B6B4E]"
                }`}
              >
                <Icon className="w-5 h-5" />
                {label}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 mt-auto border-t border-[#E8DDD0]">
          <Link
            href="/"
            className="flex items-center gap-2 px-4 py-2 text-sm text-[#8C7B6B] hover:text-[#8B6B4E]"
          >
            <ArrowLeft className="w-4 h-4" /> 사이트로 돌아가기
          </Link>
        </div>
      </aside>

      {/* Mobile nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-[#E8DDD0] flex">
        {ADMIN_NAV.map(({ href, icon: Icon, label }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex-1 flex flex-col items-center gap-1 py-3 text-xs ${
                active ? "text-[#8B6B4E]" : "text-[#8C7B6B]"
              }`}
            >
              <Icon className="w-5 h-5" />
              {label}
            </Link>
          );
        })}
      </div>

      {/* Main content */}
      <main className="flex-1 min-h-screen pb-20 md:pb-0">{children}</main>
    </div>
  );
}
