export const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
  e.currentTarget.src = 'https://haitikkot.org/gv5/theme/cookie/img/noimage.png';
};
