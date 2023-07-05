export const CATEGORIES = {
  all: '전체',
  tech: '테크/가전',
  fashion: '패션/잡화',
  living: '홈/리빙',
  beauty: '뷰티',
  food: '푸드',
  sport: '스포츠',
  culture: '컬쳐',
  character: '캐릭터/굿즈',
  pet: '반려동물',
  game: '게임/취미',
  etc: '기타',
} as const;

export const ORDERS = {
  recent: '최신순',
  popular: '인기순',
  closing: '마감임박순',
} as const;

export const PROGRESS = {
  ongoing: '진행중',
  end: '종료',
} as const;
