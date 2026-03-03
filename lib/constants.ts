import type { CounselingService } from "./types";

export const SITE_NAME = "공감터 심리상담연구소";
export const SITE_DESCRIPTION = "온라인 화상상담 전문 — 심리적·정서적 어려움을 겪고 있는 분들을 위한 심리상담연구소";
export const COUNSELOR_NAME = "정선이";
export const COUNSELOR_TITLE = "상담학 박사";

export const NAV_ITEMS = [
  { label: "연구소 소개", href: "/about", children: [
    { label: "연구소 소개", href: "/about" },
    { label: "연구진 소개", href: "/about/counselors" },
    { label: "오시는 길", href: "/about/directions" },
  ]},
  { label: "상담안내", href: "/counseling", children: [
    { label: "심리상담이란", href: "/counseling" },
    { label: "아동·청소년 상담", href: "/counseling/child" },
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
    title: "아동·청소년 상담",
    subtitle: "건강한 성장을 돕는 전문 상담",
    icon: "Baby",
    description: "아동·청소년 상담은 아이의 닫힌 마음을 여는 공감의 언어를 배우고, 부모와 아이가 함께 행복해지는 성장의 통로를 찾는 과정입니다.",
    details: [],
    features: [
      { title: "발달 단계에 맞춘 다각적 접근", desc: "인지, 정서, 사회적 발달이 진행 중인 시기이므로 성인처럼 언어 중심의 상담보다는 놀이, 미술, 활동 중심의 치료를 통해 내면을 표현하도록 돕습니다." },
      { title: "환경(부모·학교)과의 통합적 케어", desc: "아이의 문제는 아이 혼자만의 문제가 아닌 가족 시스템의 결과물인 경우가 많습니다. 따라서 보호자 상담과 환경 개선을 병행하여 치유의 효과를 극대화합니다." },
      { title: "조기 개입의 중요성", desc: "정서적·행동적 어려움을 조기에 발견하고 개입함으로써, 성인기까지 이어질 수 있는 심리 문제를 예방하고 건강한 자아 정체성을 확립하도록 합니다." },
    ],
    categoriesImage: "/olenchic-ai-generated.png",
    categories: [
      { title: "정서 및 심리 문제", items: ["불안, 우울, 무기력, 선택적 함구증, 외상 후 스트레스(트라우마)", "낮은 자존감 및 자기 비하"] },
      { title: "행동 및 적응 문제", items: ["주의력 결핍 및 과잉행동(ADHD), 충동성 조절 어려움", "공격성, 도벽, 거짓말 등 품행 문제", "등교 거부, 인터넷 및 스마트폰 과의존"] },
      { title: "대인관계 및 사회성", items: ["또래 관계 형성 및 유지의 어려움, 따돌림 경험", "사회적 기술 부족으로 인한 부적응"] },
      { title: "학습 및 진로 상담", items: ["시험 불안, 학습 의욕 상실, 진로 탐색 및 목표 설정"] },
    ],
    system: [
      { title: "전문 심리검사 기반", desc: "지능, 정서, 성격 검사를 통해 아이의 강점과 약점을 객관적으로 파악한 후 개별 맞춤 플랜을 수립합니다." },
      { title: "부모 코칭 병행", desc: "아이의 변화가 가정에서도 지속될 수 있도록 부모님께 구체적인 양육 가이드와 소통법을 전수합니다." },
      { title: "청소년 맞춤형 코칭", desc: "학업 스트레스와 정체성 혼란을 겪는 청소년들에게는 전문적인 경청과 지지를 통해 건강한 독립을 지원합니다." },
    ],
  },
  {
    slug: "adult",
    title: "성인 상담",
    subtitle: "어른이 된다는 건 혼자 견디는 것이 아니라, 필요할 때 도움을 청할 줄 아는 용기를 갖는 것입니다",
    icon: "User",
    description: "성인상담은 인생의 성숙기에 접어든 성인이 일상에서 겪는 정서적 고통, 관계의 갈등, 자아실현의 한계 등을 전문 상담사와 일대일로 마주하며 해결해 나가는 과정입니다.\n\n단순히 문제를 해결하는 것을 넘어, 삶의 주인으로서 자기 자신을 깊이 이해하고, 더 성숙하고 만족스러운 삶을 살 수 있도록 내면의 자생력을 회복하는 데 목적이 있습니다.",
    details: [],
    features: [
      { title: "언어 중심의 심층 탐색", desc: "성인은 자신의 생각과 감정을 언어로 표현할 수 있으므로, 대화를 통해 무의식적인 패턴이나 사고의 오류를 면밀히 분석하고 통찰합니다." },
      { title: "자기 주도적 변화", desc: "상담사는 조언자가 아닌 조력자로서, 내담자 스스로가 삶의 선택권을 가지고 변화를 이끌어낼 수 있도록 지지합니다." },
      { title: "현실적 문제 해결과 정서적 치유의 병행", desc: "현재 직면한 실질적인 문제(직장, 가정, 경제적 스트레스 등)의 해결책을 모색함과 동시에, 그 뿌리에 있는 과거의 상처나 트라우마를 함께 다룹니다." },
      { title: "비밀 보장과 안전한 공간", desc: "누구에게도 털어놓지 못했던 이야기를 사회적 가면을 벗고 온전히 쏟아낼 수 있는 절대적인 심리적 안전기지를 제공합니다." },
    ],
    categoriesTitle: "이런 경우, 성인상담이 필요합니다",
    categoriesImage: "/rilsonav-doubt-1160744_1280.png",
    categories: [
      { title: "감정의 과부하가 느껴질 때", items: ["만성적인 우울감, 무기력, 원인 모를 불안이나 공황 증상으로 일상이 무거울 때"] },
      { title: "대인관계의 반복적인 어려움", items: ["직장 내 갈등, 연인이나 부부 사이의 소통 단절, 타인의 시선에 과하게 예민해져 관계가 피로할 때"] },
      { title: "자존감이 낮아지고 자기비난이 심할 때", items: ["스스로를 사랑하기 어렵고, 성취 뒤에도 허무함이 밀려오며 끊임없이 타인과 비교하게 될 때"] },
      { title: "생애 전환기의 혼란", items: ["이직, 퇴사, 결혼, 육아, 노후 준비 등 인생의 큰 변화 앞에서 방향을 잃고 극심한 스트레스를 받을 때"] },
      { title: "과거의 상처에서 벗어나고 싶을 때", items: ["어린 시절의 가정 환경이나 과거의 트라우마가 현재의 삶에 자꾸만 부정적인 영향을 미칠 때"] },
      { title: "삶의 의미와 성장을 찾고 싶을 때", items: ["특별한 문제는 없으나 '나는 누구인가'에 대한 갈증이 있고, 더 나은 나로 성장하고 싶은 욕구가 클 때"] },
    ],
    systemTitle: "공감터만의 성인상담 시스템: 4단계 전문 케어",
    systemIntro: "공감터는 단순히 이야기를 듣는 것에 그치지 않고, 성인 내담자가 삶의 주도권을 회복할 수 있도록 체계적이고 과학적인 프로세스를 제공합니다.",
    system: [
      { title: "[진단] 과학적 도구를 통한 '나'의 재발견", desc: "막연한 답답함의 원인을 찾기 위해 TCI(기질 및 성격검사), MMPI-2(다면적 인성검사) 등 표준화된 심리검사를 시행합니다. 이를 통해 타고난 기질과 후천적으로 형성된 성격 구조를 객관적으로 분석하여, 나조차 몰랐던 나의 내면 지도를 먼저 그립니다." },
      { title: "[맞춤] 생애주기별 이슈에 최적화된 솔루션", desc: "성인은 연령대에 따라 직면하는 과업이 다릅니다. 공감터는 내담자의 현재 상황에 맞춰 직장 내 대인관계 및 소진(Burnout), 결혼 및 육아 스트레스, 자존감 회복, 생애 전환기 불안 등 핵심 이슈에 집중하는 1:1 맞춤형 상담 플랜을 설계합니다." },
      { title: "[심화] 현장 실무와 학술적 통찰의 결합", desc: "공감터는 상담 실무뿐만 아니라 논문 컨설팅 및 학술 연구를 병행하는 전문가 집단입니다. 최신 심리학 이론과 풍부한 임상 사례를 바탕으로, 내담자의 심리적 기제를 깊이 있게 통찰하여 근본적인 변화를 이끌어내는 고도의 전문 상담을 지향합니다." },
      { title: "[지속] 일상 안착을 위한 '추수상담(Follow-up)'", desc: "상담실 안에서의 깨달음이 삶의 현장에서도 유지되는 것이 가장 중요합니다. 공감터는 공식적인 상담이 종결된 후에도 일정 기간 뒤 추수상담을 진행하여, 내담자가 스스로 마음을 돌보는 힘을 유지하고 있는지 살피며 완전한 자립을 끝까지 지원합니다." },
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
  { step: 1, title: "상담예약", description: "홈페이지, 전화, 카톡, 내방", icon: "CalendarCheck" },
  { step: 2, title: "상담자 배정 및\n일시 확정", description: "", icon: "UserCheck" },
  { step: 3, title: "상담 진행", description: "", icon: "MessageCircle" },
  { step: 4, title: "종결 및 사후관리", description: "", icon: "ShieldCheck" },
];

export const TEST_STEPS = [
  { step: 1, title: "심리검사 신청", description: "홈페이지, 전화, 카톡, 내방", icon: "ClipboardList" },
  { step: 2, title: "심리검사 실시", description: "", icon: "PenLine" },
  { step: 3, title: "검사 해석", description: "", icon: "FileSearch" },
  { step: 4, title: "종결 또는 상담 신청", description: "", icon: "ArrowRightLeft" },
];
