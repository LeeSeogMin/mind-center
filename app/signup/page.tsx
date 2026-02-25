"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { SITE_NAME } from "@/lib/constants";
import { supabase } from "@/lib/supabase";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (password !== passwordConfirm) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    if (password.length < 6) {
      setError("비밀번호는 6자 이상이어야 합니다.");
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            phone,
          },
        },
      });

      if (error) {
        setError(error.message);
      } else {
        router.push("/login?registered=true");
      }
    } catch {
      setError("회원가입 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-[#FBF8F3] min-h-screen flex items-center justify-center py-20 px-6">
      <Card className="w-full max-w-md rounded-2xl bg-white border-[#E8DDD0]">
        <CardHeader className="text-center pb-2">
          <Link href="/">
            <h1 className="font-heading text-2xl font-bold text-[#8B6B4E]">
              {SITE_NAME}
            </h1>
          </Link>
          <p className="text-sm text-[#8C7B6B] mt-2">
            회원가입 후 다양한 상담 서비스를 이용하세요
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSignup} className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="text-sm font-medium text-[#3A2E26]"
              >
                이름
              </label>
              <Input
                id="name"
                type="text"
                placeholder="이름을 입력하세요"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="h-11 rounded-xl border-[#E8DDD0] focus-visible:border-[#C4A882] focus-visible:ring-[#C4A882]/30"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="signup-email"
                className="text-sm font-medium text-[#3A2E26]"
              >
                이메일
              </label>
              <Input
                id="signup-email"
                type="email"
                placeholder="example@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-11 rounded-xl border-[#E8DDD0] focus-visible:border-[#C4A882] focus-visible:ring-[#C4A882]/30"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="phone"
                className="text-sm font-medium text-[#3A2E26]"
              >
                연락처
              </label>
              <Input
                id="phone"
                type="tel"
                placeholder="010-0000-0000"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="h-11 rounded-xl border-[#E8DDD0] focus-visible:border-[#C4A882] focus-visible:ring-[#C4A882]/30"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="signup-password"
                className="text-sm font-medium text-[#3A2E26]"
              >
                비밀번호
              </label>
              <Input
                id="signup-password"
                type="password"
                placeholder="6자 이상 입력하세요"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-11 rounded-xl border-[#E8DDD0] focus-visible:border-[#C4A882] focus-visible:ring-[#C4A882]/30"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="password-confirm"
                className="text-sm font-medium text-[#3A2E26]"
              >
                비밀번호 확인
              </label>
              <Input
                id="password-confirm"
                type="password"
                placeholder="비밀번호를 다시 입력하세요"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                required
                className="h-11 rounded-xl border-[#E8DDD0] focus-visible:border-[#C4A882] focus-visible:ring-[#C4A882]/30"
              />
            </div>

            {error && (
              <p className="text-sm text-red-500 bg-red-50 px-4 py-2 rounded-xl">
                {error}
              </p>
            )}

            {/* 약관 동의 */}
            <div className="bg-[#FBF8F3] rounded-xl p-4 border border-[#E8DDD0]">
              <p className="text-xs text-[#8C7B6B] leading-relaxed">
                회원가입 시{" "}
                <span className="text-[#8B6B4E] cursor-pointer hover:underline">
                  이용약관
                </span>{" "}
                및{" "}
                <span className="text-[#8B6B4E] cursor-pointer hover:underline">
                  개인정보처리방침
                </span>
                에 동의하는 것으로 간주됩니다.
              </p>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-[#8B6B4E] hover:bg-[#7A5D42] text-white h-11 rounded-xl text-base"
            >
              {loading ? "가입 처리중..." : "회원가입"}
            </Button>
          </form>

          {/* 로그인 링크 */}
          <p className="text-center text-sm text-[#8C7B6B] mt-6">
            이미 회원이신가요?{" "}
            <Link
              href="/login"
              className="text-[#8B6B4E] font-medium hover:underline"
            >
              로그인
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
