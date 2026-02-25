import type { CounselingService } from "./types";

export const SITE_NAME = "공감터 심리상담연구소";
export const SITE_DESCRIPTION = "심리적·정서적 어려움을 겪고 있는 분들을 위한 종합심리상담센터";
export const COUNSELOR_NAME = "정선이";
export const COUNSELOR_TITLE = "상담학 박사";

export const NAV_ITEMS = [
  { label: "센터소개", href: "/about", children: [
    { label: "인사말", href: "/about" },
    { label: "상담사 소개", href: "/about/counselors" },
    { label: "오시는 길", href: "/about/location" },
  ]},
  { label: "상담안내", href: "/counseling", children: [
    { label: "심리상담이란", href: "/counseling" },
    { label: "아동청소년 상담", href: "/counseling/child" },
    { label: "성인 상담", href: "/counseling/adult" },
    { label: "부부·가족 상담", href: "/counseling/family" },
    { label: "직장인·기업 상담", href: "/counseling/workplace" },
  ]},
  { label: "심리검사", href: "/test" },
  { label: "상담예약", href: "/reservation/offline", children: [
    { label: "대면상담 예약", href: "/reservation/offline" },
    { label: "화상상담 예약", href: "/reservation/online" },
  ]},
  { label: "마음톡", href: "/mindtalk" },
  { label: "게시판", href: "/board/notice", children: [
    { label: "공지사항", href: "/board/notice" },
    { label: "상담후기", href: "/board/review" },
    { label: "칼럼", href: "/board/column" },
  ]},
  { label: "센터소식", href: "/news/center", children: [
    { label: "센터소식", href: "/news/center" },
    { label: "이벤트", href: "/news/event" },
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
    title: "부부·가족 상담",
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
    slug: "workplace",
    title: "직장인·기업 상담",
    subtitle: "일과 삶의 균형 찾기",
    icon: "Briefcase",
    description: "직장 내 스트레스, 번아웃, 대인관계 문제, 리더십 코칭 등 직장인과 기업을 위한 맞춤 상담을 제공합니다.",
    details: [
      "직무 스트레스 및 번아웃",
      "직장 내 대인관계 갈등",
      "리더십·커뮤니케이션 코칭",
      "경력 전환 및 진로 상담",
      "EAP (근로자 지원 프로그램)",
    ],
  },
];

export const PROCESS_STEPS = [
  { step: 1, title: "문의·신청", description: "전화, 온라인으로 상담 신청" },
  { step: 2, title: "상담사 배정", description: "전문 분야에 맞는 상담사 배정" },
  { step: 3, title: "상담 진행", description: "대면 또는 화상 상담 진행" },
  { step: 4, title: "사후관리", description: "상담 후 지속적인 관리와 지원" },
];
