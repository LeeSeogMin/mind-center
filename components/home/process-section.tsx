import {
  CalendarCheck,
  UserCheck,
  MessageCircle,
  ShieldCheck,
  ClipboardList,
  PenLine,
  FileSearch,
  ArrowRightLeft,
} from "lucide-react";
import { PROCESS_STEPS, TEST_STEPS } from "@/lib/constants";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  CalendarCheck,
  UserCheck,
  MessageCircle,
  ShieldCheck,
  ClipboardList,
  PenLine,
  FileSearch,
  ArrowRightLeft,
};

function StepFlow({ steps, color }: { steps: typeof PROCESS_STEPS; color: string }) {
  return (
    <>
      {/* Desktop: horizontal layout */}
      <div className="hidden md:flex items-start justify-center gap-0">
        {steps.map((step, index) => {
          const IconComponent = ICON_MAP[step.icon];
          return (
            <div key={step.step} className="flex items-start">
              <div className="flex flex-col items-center text-center w-[140px]">
                <div
                  className="flex h-11 w-11 items-center justify-center rounded-full text-white shadow-sm"
                  style={{ backgroundColor: color }}
                >
                  {IconComponent ? <IconComponent className="h-5 w-5" /> : step.step}
                </div>
                <h3 className="mt-3 text-sm font-semibold text-[#1E3A26] whitespace-pre-line">
                  {step.title}
                </h3>
                {step.description && (
                  <p className="mt-1 text-xs text-[#8C7B6B] leading-relaxed max-w-[130px]">
                    {step.description}
                  </p>
                )}
              </div>

              {index < steps.length - 1 && (
                <div className="flex items-center h-11 px-2">
                  <svg
                    width="28"
                    height="12"
                    viewBox="0 0 28 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      d="M0 6H24M24 6L18 1M24 6L18 11"
                      stroke={color}
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Mobile: vertical layout */}
      <div className="flex md:hidden flex-col gap-0">
        {steps.map((step, index) => {
          const IconComponent = ICON_MAP[step.icon];
          return (
            <div key={step.step} className="flex flex-col items-center">
              <div className="flex items-center gap-5 w-full max-w-xs">
                <div
                  className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full text-white shadow-sm"
                  style={{ backgroundColor: color }}
                >
                  {IconComponent ? <IconComponent className="h-5 w-5" /> : step.step}
                </div>
                <div>
                  <h3 className="text-base font-semibold text-[#1E3A26]">
                    {step.title}
                  </h3>
                  <p className="mt-0.5 text-sm text-[#8C7B6B]">
                    {step.description}
                  </p>
                </div>
              </div>

              {index < steps.length - 1 && (
                <div className="flex justify-center w-full max-w-xs pl-[24px] py-1">
                  <div className="h-8 w-px" style={{ backgroundColor: `${color}66` }} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}

export default function ProcessSection() {
  return (
    <section className="bg-[#FBF8F3] pt-6 pb-12 md:pt-8 md:pb-14">
      <div className="max-w-[800px] mx-auto px-6">
        {/* 상담 진행 과정 */}
        <div className="text-center mb-8">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-[#1E3A26]">
            상담진행 과정
          </h2>
        </div>
        <StepFlow steps={PROCESS_STEPS} color="#4A6FA5" />

        {/* 구분선 */}
        <div className="my-10 md:my-12 border-t border-[#D5CBBC]" />

        {/* 심리검사 과정 */}
        <div className="text-center mb-8">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-[#1E3A26]">
            심리검사 과정
          </h2>
        </div>
        <StepFlow steps={TEST_STEPS} color="#6B8C7B" />
      </div>
    </section>
  );
}
