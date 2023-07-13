import { toast } from 'react-toastify';
import { heart, emptyHeart } from '@/assets/like';

export const errorToast = (msg: string) => toast.error(msg);
export const successToast = (msg: string) => toast.success(msg);

export const likeToast = (isLike: boolean): void => {
  toast.success(isLike ? '프로젝트를 좋아요 해제했습니다.' : '프로젝트를 좋아요 등록했습니다.', {
    hideProgressBar: true,
    autoClose: 1500,
    icon: <img src={isLike ? emptyHeart : heart} alt='하트' />,
  });
};
