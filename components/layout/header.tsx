"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Search, ChevronDown, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { NAV_ITEMS, SITE_NAME } from "@/lib/constants";
import { useAuth } from "@/lib/auth-context";
import Logo from "@/components/ui/logo";

export default function Header() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const { user, profile, loading } = useAuth();

  return (
    <header className="sticky top-0 z-50 bg-[#E8EDF5] backdrop-blur border-b border-[#C8D6E5]">
      {/* Main nav */}
      <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <Logo size={36} />
          <span className="text-2xl font-bold text-[#4A8C5E]">
            <span className="font-heading" style={{ color: '#2D5A3D' }}>공감</span>
            <span style={{ fontFamily: "'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif", fontSize: '1.65rem', color: '#B8964A', fontWeight: 600 }}>터</span>
            {' '}
            <span style={{ fontFamily: "'DOSSaemmul', sans-serif", fontSize: '1.1rem', color: '#5C3A1E' }}>심리상담연구소</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {NAV_ITEMS.map((item) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => setOpenDropdown(item.label)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <Link
                href={item.href}
                className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-[#1E3A26] hover:text-[#4A8C5E] transition-colors"
              >
                {item.label}
                {item.children && <ChevronDown className="w-3.5 h-3.5" />}
              </Link>
              {item.children && openDropdown === item.label && (
                <div className="absolute top-full left-0 bg-white border border-[#D0E8D8] rounded-xl shadow-lg py-2 min-w-[180px]">
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="block px-4 py-2 text-sm text-[#1E3A26] hover:bg-[#F0FAF3] hover:text-[#4A8C5E]"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="text-[#6B8C7B]">
            <Search className="w-5 h-5" />
          </Button>

          {!loading && (
            user ? (
              <div className="flex items-center gap-2">
                {(profile?.role === "admin" || profile?.role === "counselor") && (
                  <Link href="/admin">
                    <Button variant="outline" size="sm" className="border-[#4A85D4] text-[#4A85D4] hover:bg-[#F0FAF3] gap-1">
                      <Shield className="w-3.5 h-3.5" /> 관리자
                    </Button>
                  </Link>
                )}
                <Link href="/mypage">
                  <Button variant="outline" size="sm" className="border-[#D0E8D8] text-[#4A8C5E] hover:bg-[#F0FAF3]">
                    마이페이지
                  </Button>
                </Link>
              </div>
            ) : (
              <Link href="/login">
                <Button size="sm" className="bg-[#4A8C5E] hover:bg-[#3D7A4E] text-white">
                  로그인
                </Button>
              </Link>
            )
          )}

          {/* Mobile menu */}
          <Sheet>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] bg-white p-0">
              <div className="p-6 border-b border-[#D0E8D8] flex items-center gap-2.5">
                <Logo size={30} />
                <span className="text-xl font-bold text-[#4A8C5E]">
                  <span className="font-heading" style={{ color: '#2D5A3D' }}>공감</span>
                  <span style={{ fontFamily: "'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif", fontSize: '1.35rem', color: '#B8964A', fontWeight: 600 }}>터</span>
                  {' '}
                  <span style={{ fontFamily: "'DOSSaemmul', sans-serif", fontSize: '0.9rem', color: '#5C3A1E' }}>심리상담연구소</span>
                </span>
              </div>
              <nav className="p-4">
                {NAV_ITEMS.map((item) => (
                  <div key={item.label} className="mb-2">
                    <Link
                      href={item.href}
                      className="block px-4 py-3 text-[#1E3A26] font-medium hover:bg-[#F0FAF3] rounded-lg"
                    >
                      {item.label}
                    </Link>
                    {item.children && (
                      <div className="ml-4">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block px-4 py-2 text-sm text-[#6B8C7B] hover:text-[#4A8C5E]"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>
              <div className="p-4 border-t border-[#D0E8D8]">
                {user ? (
                  <div className="space-y-2">
                    {(profile?.role === "admin" || profile?.role === "counselor") && (
                      <Link href="/admin">
                        <Button variant="outline" className="w-full border-[#4A85D4] text-[#4A85D4] gap-1">
                          <Shield className="w-4 h-4" /> 관리자
                        </Button>
                      </Link>
                    )}
                    <Link href="/mypage">
                      <Button className="w-full bg-[#4A8C5E] hover:bg-[#3D7A4E]">마이페이지</Button>
                    </Link>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <Link href="/login" className="flex-1">
                      <Button className="w-full bg-[#4A8C5E] hover:bg-[#3D7A4E]">로그인</Button>
                    </Link>
                    <Link href="/signup" className="flex-1">
                      <Button variant="outline" className="w-full border-[#D0E8D8]">회원가입</Button>
                    </Link>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
