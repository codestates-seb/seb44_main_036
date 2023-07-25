export const combineClassNames = (...classNames: string[]) => {
  return classNames.join(' ');
};

export const dday = (date: Date) => {
  const today = new Date();
  const expiredDate = new Date(date);
  let diff = Math.abs(expiredDate.getTime() - today.getTime());
  diff = Math.ceil(diff / (1000 * 60 * 60 * 24));
  return diff;
};

export const formattingNumber = (num: number) => num.toLocaleString();

export const calculateAchievementRate = (targetAmount: number, currentAmount: number) => {
  if (currentAmount === 0) return 0;
  const achievementRate = (currentAmount / targetAmount) * 100;
  return achievementRate > 1 ? achievementRate : 1;
};

export const dateToString = (date = new Date()) => {
  const year: number = date.getFullYear();
  const month: string = (date.getMonth() + 1).toString().padStart(2, '0');
  const day: string = date.getDate().toString().padStart(2, '0');

  return `${year}-${month}-${day}`;
};

export const isPastDeadline = (expiredDate: string) => {
  const today = new Date();
  const deadline = new Date(expiredDate);

  return deadline < today;
};
