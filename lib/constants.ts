import type { CounselingService } from "./types";

export const SITE_NAME = "공감터 심리상담연구소";
export const SITE_DESCRIPTION = "온라인 화상상담 전문 — 심리적·정서적 어려움을 겪고 있는 분들을 위한 심리상담연구소";
export const COUNSELOR_NAME = "정선이";
export const COUNSELOR_TITLE = "상담학 박사";

export const NAV_ITEMS = [
  { label: "연구소 소개", href: "/about", children: [
    { label: "연구소 소개", href: "/about" },
    { label: "상담사 소개", href: "/about/counselors" },
  ]},
  { label: "상담안내", href: "/counseling", children: [
    { label: "심리상담이란", href: "/counseling" },
    { label: "아동청소년 상담", href: "/counseling/child" },
    { label: "성인 상담", href: "/counseling/adult" },
    { label: "커플·부부·가족 상담", href: "/counseling/family" },
    { label: "노인 상담", href: "/counseling/elderly" },
    { label: "집단상담", href: "/counseling/group" },
    { label: "기업상담", href: "/counseling/corporate" },
  ]},
  { label: "심리검사", href: "/test", children: [
    { label: "심리검사 안내", href: "/test" },
    { label: "SCT 문장완성검사", href: "/test/sct" },
    { label: "MMPI-2 다면적 인성검사", href: "/test/mmpi2" },
    { label: "TCI 기질·성격검사", href: "/test/tci" },
    { label: "웩슬러 지능검사", href: "/test/wechsler" },
  ]},
  { label: "상담예약", href: "/reservation/offline", children: [
    { label: "대면상담 예약", href: "/reservation/offline" },
    { label: "화상상담 예약", href: "/reservation/online" },
  ]},
  { label: "마음톡", href: "/mindtalk" },
  { label: "게시판", href: "/board/notice", children: [
    { label: "공지사항", href: "/board/notice" },
    { label: "상담후기", href: "/board/review" },
    { label: "칼럼", href: "/board/column" },
    { label: "Q&A", href: "/board/qna" },
  ]},
];

export const COUNSELING_SERVICES: CounselingService[] = [
  {
    slug: "child",
    title: "아동청소년 상담",
    subtitle: "건강한 성장을 돕는 전문 상담",
    icon: "Baby",
    description: "아동·청소년기에 겪는 정서적 어려움, 학교 부적응, 또래 관계 문제, 학습 문제 등을 전문적으로 상담합니다.",
    details: [
      "놀이치료 / 미술치료",
      "ADHD, 분리불안, 틱장애 상담",
      "학교 부적응 및 또래 관계 문제",
      "학습 부진 및 진로 상담",
      "부모 양육 코칭",
    ],
  },
  {
    slug: "adult",
    title: "성인 상담",
    subtitle: "나를 이해하는 첫걸음",
    icon: "User",
    description: "우울, 불안, 스트레스, 자존감 문제 등 성인기에 겪는 다양한 심리적 어려움을 함께 다룹니다.",
    details: [
      "우울·불안·공황장애",
      "대인관계 어려움",
      "자존감 및 자기탐색",
      "트라우마 / PTSD",
      "스트레스 관리",
    ],
  },
  {
    slug: "family",
    title: "커플·부부·가족 상담",
    subtitle: "관계 회복과 소통의 시작",
    icon: "Heart",
    description: "부부 갈등, 가족 간 소통 문제, 이혼 상담, 가정 내 폭력 문제 등 가족 관계의 회복을 돕습니다.",
    details: [
      "부부 갈등 및 의사소통 개선",
      "이혼 전후 상담",
      "가족 관계 회복",
      "고부·시가 갈등",
      "커플(연인) 상담",
    ],
  },
  {
    slug: "elderly",
    title: "노인 상담",
    subtitle: "행복한 노년을 위한 동반자",
    icon: "PersonStanding",
    description: "노년기에 겪는 우울, 고독감, 상실감, 건강 불안 등 심리적 어려움을 따뜻하게 상담합니다.",
    details: [
      "노년기 우울·불안",
      "배우자 상실 및 애도 상담",
      "은퇴 후 적응 및 역할 변화",
      "가족 관계 갈등",
      "건강 불안 및 자존감 회복",
    ],
  },
  {
    slug: "group",
    title: "집단상담",
    subtitle: "함께 성장하는 치유의 시간",
    icon: "Users",
    description: "소규모 그룹 안에서 서로의 경험을 나누며 공감과 지지를 통해 함께 성장하는 상담입니다.",
    details: [
      "대인관계 향상 프로그램",
      "자존감 회복 그룹",
      "스트레스 관리 워크숍",
      "부모 교육 그룹",
      "정서 조절 훈련 그룹",
    ],
  },
  {
    slug: "corporate",
    title: "기업상담",
    subtitle: "건강한 조직을 위한 심리지원",
    icon: "Building2",
    description: "기업 임직원의 심리적 건강과 조직 적응을 지원하는 맞춤형 상담 서비스를 제공합니다.",
    details: [
      "직무 스트레스 및 번아웃",
      "직장 내 대인관계 갈등",
      "리더십·커뮤니케이션 코칭",
      "EAP (근로자 지원 프로그램)",
      "조직 문화 개선 컨설팅",
    ],
  },
];

export const PROCESS_STEPS = [
  { step: 1, title: "상담 예약·신청", description: "홈페이지, 전화, 카톡, 내방", icon: "CalendarCheck" },
  { step: 2, title: "상담자 배정 및 일시 확정", description: "", icon: "UserCheck" },
  { step: 3, title: "상담 진행", description: "", icon: "MessageCircle" },
  { step: 4, title: "종결 및 사후관리", description: "", icon: "ShieldCheck" },
];

export const TEST_STEPS = [
  { step: 1, title: "심리검사 신청", description: "홈페이지, 전화, 카톡, 내방", icon: "ClipboardList" },
  { step: 2, title: "심리검사 실시", description: "", icon: "PenLine" },
  { step: 3, title: "검사 해석", description: "", icon: "FileSearch" },
  { step: 4, title: "종결 또는 상담 신청", description: "", icon: "ArrowRightLeft" },
];
