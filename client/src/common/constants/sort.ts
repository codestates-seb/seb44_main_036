export const CATEGORIES = {
  all: [null, '전체'],
  tech: [0, '테크/가전'],
  fashion: [1, '패션/잡화'],
  living: [2, '홈/리빙'],
  beauty: [3, '뷰티'],
  food: [4, '푸드'],
  sport: [5, '스포츠'],
  culture: [6, '컬쳐'],
  character: [7, '캐릭터/굿즈'],
  pet: [8, '반려동물'],
  game: [9, '게임/취미'],
  etc: [10, '기타'],
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

export const options = Object.values(CATEGORIES)
  .filter(([categoryNUM]) => categoryNUM !== null)
  .map(([categoryNUM, categoryKO]) => ({
    value: categoryNUM,
    label: categoryKO,
  }));
