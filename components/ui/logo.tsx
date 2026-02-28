interface LogoProps {
  size?: number;
  className?: string;
}

export default function Logo({ size = 38, className = "" }: LogoProps) {
  const width = Math.round(size * (60 / 52));

  return (
    <svg
      width={width}
      height={size}
      viewBox="0 0 60 52"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="공감터 로고 — 세 그루 나무"
    >
      {/* 배경 blob — 이미지의 크림/베이지 */}
      <ellipse cx="30" cy="23" rx="27" ry="19" fill="#EDE5D8" fillOpacity="0.9" />

      {/* ── 왼쪽 나무 (물방울, 기울어짐) — 이미지 코랄 레드 ── */}
      <rect x="13" y="31" width="3" height="9" rx="1.5" fill="#8B5E3C" />
      <ellipse
        cx="14.5"
        cy="18"
        rx="6.5"
        ry="12"
        fill="#C95045"
        transform="rotate(-14 14.5 18)"
      />
      <line x1="11.5" y1="14" x2="15" y2="24" stroke="#8B3A2A" strokeWidth="0.9" strokeLinecap="round" opacity="0.4" />
      <line x1="14.5" y1="11" x2="17" y2="20" stroke="#8B3A2A" strokeWidth="0.7" strokeLinecap="round" opacity="0.3" />

      {/* ── 가운데 나무 (삼각형) — 이미지 포레스트 그린 ── */}
      <rect x="28.5" y="31" width="3" height="9" rx="1.5" fill="#8B5E3C" />
      <polygon points="30,5 21.5,32 38.5,32" fill="#4A7056" />
      <line x1="26.5" y1="17" x2="29.5" y2="28" stroke="#EDE5D8" strokeWidth="0.8" strokeLinecap="round" opacity="0.35" />

      {/* ── 오른쪽 나무 (타원, 직립) — 이미지 골드 옐로우 ── */}
      <rect x="44" y="31" width="3" height="9" rx="1.5" fill="#8B5E3C" />
      <ellipse cx="45.5" cy="17.5" rx="6.5" ry="12" fill="#C9A84A" />
      <line x1="42.5" y1="13" x2="46" y2="24" stroke="#8B6A2A" strokeWidth="0.9" strokeLinecap="round" opacity="0.35" />
      <line x1="45.5" y1="10" x2="48" y2="21" stroke="#8B6A2A" strokeWidth="0.7" strokeLinecap="round" opacity="0.25" />

      {/* 땅 — 이미지의 짙은 마룬/다크브라운 */}
      <ellipse cx="30" cy="41" rx="21" ry="7.5" fill="#5A2B2B" />
    </svg>
  );
}
