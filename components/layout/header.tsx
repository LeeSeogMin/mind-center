"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Search, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { NAV_ITEMS, SITE_NAME } from "@/lib/constants";
import { useAuth } from "@/lib/auth-context";

export default function Header() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const { user, loading } = useAuth();

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-[#E8DDD0]">
      {/* Top bar — desktop only */}
      <div className="hidden lg:block bg-[#FBF8F3] border-b border-[#E8DDD0]">
        <div className="max-w-[1200px] mx-auto px-6 py-2 flex justify-between items-center text-xs text-[#8C7B6B]">
          <span>전화 상담: 02-1234-5678 | 평일 09:00~18:00</span>
          <div className="flex gap-4">
            <Link href="/board/notice" className="hover:text-[#8B6B4E]">공지사항</Link>
            <Link href="/news/center" className="hover:text-[#8B6B4E]">센터소식</Link>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="font-heading text-2xl font-bold text-[#8B6B4E]">{SITE_NAME}</span>
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
                className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-[#3A2E26] hover:text-[#8B6B4E] transition-colors"
              >
                {item.label}
                {item.children && <ChevronDown className="w-3.5 h-3.5" />}
              </Link>
              {item.children && openDropdown === item.label && (
                <div className="absolute top-full left-0 bg-white border border-[#E8DDD0] rounded-xl shadow-lg py-2 min-w-[180px]">
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="block px-4 py-2 text-sm text-[#3A2E26] hover:bg-[#FBF8F3] hover:text-[#8B6B4E]"
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
          <Button variant="ghost" size="icon" className="text-[#8C7B6B]">
            <Search className="w-5 h-5" />
          </Button>

          {!loading && (
            user ? (
              <Link href="/mypage">
                <Button variant="outline" size="sm" className="border-[#E8DDD0] text-[#8B6B4E] hover:bg-[#FBF8F3]">
                  마이페이지
                </Button>
              </Link>
            ) : (
              <Link href="/login">
                <Button size="sm" className="bg-[#8B6B4E] hover:bg-[#7A5D42] text-white">
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
              <div className="p-6 border-b border-[#E8DDD0]">
                <span className="font-heading text-xl font-bold text-[#8B6B4E]">{SITE_NAME}</span>
              </div>
              <nav className="p-4">
                {NAV_ITEMS.map((item) => (
                  <div key={item.label} className="mb-2">
                    <Link
                      href={item.href}
                      className="block px-4 py-3 text-[#3A2E26] font-medium hover:bg-[#FBF8F3] rounded-lg"
                    >
                      {item.label}
                    </Link>
                    {item.children && (
                      <div className="ml-4">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block px-4 py-2 text-sm text-[#8C7B6B] hover:text-[#8B6B4E]"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>
              <div className="p-4 border-t border-[#E8DDD0]">
                {user ? (
                  <Link href="/mypage">
                    <Button className="w-full bg-[#8B6B4E] hover:bg-[#7A5D42]">마이페이지</Button>
                  </Link>
                ) : (
                  <div className="flex gap-2">
                    <Link href="/login" className="flex-1">
                      <Button className="w-full bg-[#8B6B4E] hover:bg-[#7A5D42]">로그인</Button>
                    </Link>
                    <Link href="/signup" className="flex-1">
                      <Button variant="outline" className="w-full border-[#E8DDD0]">회원가입</Button>
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
