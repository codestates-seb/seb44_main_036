export const CATEGORIES = {
  all: [null, '전체'],
  tech: [1, '테크/가전'],
  fashion: [2, '패션/잡화'],
  living: [3, '홈/리빙'],
  beauty: [4, '뷰티'],
  food: [5, '푸드'],
  sport: [6, '스포츠'],
  culture: [7, '컬쳐'],
  character: [8, '캐릭터/굿즈'],
  pet: [9, '반려동물'],
  game: [10, '게임/취미'],
  etc: [11, '기타'],
} as const;

export type CategoryNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;
export type CategoryValue =
  | '테크/가전'
  | '패션/잡화'
  | '홈/리빙'
  | '뷰티'
  | '푸드'
  | '스포츠'
  | '컬쳐'
  | '캐릭터/굿즈'
  | '반려동물'
  | '게임/취미'
  | '기타';

export const CATEGORY_NUMBER_TO_KO: Record<CategoryNumber, CategoryValue> = {
  1: '테크/가전',
  2: '패션/잡화',
  3: '홈/리빙',
  4: '뷰티',
  5: '푸드',
  6: '스포츠',
  7: '컬쳐',
  8: '캐릭터/굿즈',
  9: '반려동물',
  10: '게임/취미',
  11: '기타',
};

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
