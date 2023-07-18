import imageCompression from 'browser-image-compression';

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

export const imageCompressor = async (image: File) => {
  const resizingBlob = await imageCompression(image, { maxSizeMB: 0.5 });
  const resizingFile = new File([resizingBlob], image.name, { type: image.type });
  return resizingFile;
};

export const formattingNumber = (num: number) => num.toLocaleString();

export const calculateAchievementRate = (targetAmount: number, currentAmount: number) => {
  if (currentAmount === 0) return 0;
  const achievementRate = (currentAmount / targetAmount) * 100;
  return achievementRate > 1 ? achievementRate : 1;
};
