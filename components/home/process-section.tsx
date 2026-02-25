import { PROCESS_STEPS } from "@/lib/constants";

export default function ProcessSection() {
  return (
    <section className="bg-white py-20 md:py-24">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-[#3A2E26]">
            상담 진행 과정
          </h2>
          <p className="mt-3 text-[#8C7B6B]">
            공감터의 체계적인 상담 프로세스를 안내합니다
          </p>
        </div>

        {/* Desktop: horizontal layout */}
        <div className="hidden md:flex items-start justify-center gap-0">
          {PROCESS_STEPS.map((step, index) => (
            <div key={step.step} className="flex items-start">
              {/* Step card */}
              <div className="flex flex-col items-center text-center w-[200px]">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#C4A882] text-white text-lg font-bold shadow-sm">
                  {step.step}
                </div>
                <h3 className="mt-4 text-base font-semibold text-[#3A2E26]">
                  {step.title}
                </h3>
                <p className="mt-1.5 text-sm text-[#8C7B6B] leading-relaxed max-w-[160px]">
                  {step.description}
                </p>
              </div>

              {/* Arrow connector (not after last step) */}
              {index < PROCESS_STEPS.length - 1 && (
                <div className="flex items-center h-14 px-3">
                  <svg
                    width="40"
                    height="16"
                    viewBox="0 0 40 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      d="M0 8H36M36 8L28 1M36 8L28 15"
                      stroke="#C4A882"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Mobile: vertical layout */}
        <div className="flex md:hidden flex-col gap-0">
          {PROCESS_STEPS.map((step, index) => (
            <div key={step.step} className="flex flex-col items-center">
              {/* Step card */}
              <div className="flex items-center gap-5 w-full max-w-xs">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[#C4A882] text-white text-lg font-bold shadow-sm">
                  {step.step}
                </div>
                <div>
                  <h3 className="text-base font-semibold text-[#3A2E26]">
                    {step.title}
                  </h3>
                  <p className="mt-0.5 text-sm text-[#8C7B6B]">
                    {step.description}
                  </p>
                </div>
              </div>

              {/* Vertical connector (not after last step) */}
              {index < PROCESS_STEPS.length - 1 && (
                <div className="flex justify-center w-full max-w-xs pl-[24px] py-1">
                  <div className="h-8 w-px bg-[#C4A882]/40" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
