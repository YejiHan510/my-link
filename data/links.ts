// PRD 기준: Firestore의 users 서브 컬렉션(links)에 저장될 데이터 구조
// 아이콘(icon)은 DB에 직접 저장하지 않고, 대상 URL을 통해 Google Favicon API로 렌더링합니다.

export interface Link {
  id: string;        // Firestore Document ID
  title: string;     // 링크 타이틀
  url: string;       // 대상 URL
  createdAt: number; // 생성 일시 (목록 표시 정렬용)
}

// UI 테스트용 더미 데이터
export const links: Link[] = [
  {
    id: "link_1",
    title: "인스타그램",
    url: "https://instagram.com/",
    createdAt: 1716700000000,
  },
  {
    id: "link_2",
    title: "유튜브",
    url: "https://youtube.com/",
    createdAt: 1716701000000,
  },
  {
    id: "link_3",
    title: "블로그",
    url: "https://blog.naver.com/",
    createdAt: 1716702000000,
  },
  {
    id: "link_4",
    title: "GitHub",
    url: "https://github.com/",
    createdAt: 1716703000000,
  },
  {
    id: "link_5",
    title: "포트폴리오",
    url: "https://portfolio.com/",
    createdAt: 1716704000000,
  },
];

/**
 * PRD 4.4 명세: 입력한 대상 URL의 파비콘 이미지를 추출하기 위한 헬퍼 함수
 * 사용 예시: <img src={getFaviconUrl(link.url)} alt="favicon" />
 */
export const getFaviconUrl = (url: string) => {
  try {
    const domain = new URL(url).hostname;
    // sz 파라미터로 아이콘 크기를 조절할 수 있습니다 (예: 64, 128 등)
    return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
  } catch (error) {
    return ""; // 잘못된 URL일 경우 빈 문자열 반환
  }
};
