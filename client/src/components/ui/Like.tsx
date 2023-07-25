import { heart, emptyHeart } from '@/assets/like';
import type { LikeHandler } from '../project/ProjectItem';

type Props = {
  like: boolean;
  position: string;
  handleClick: LikeHandler;
};

function Like({ like, position, handleClick }: Props) {
  return (
    <img
      src={like ? heart : emptyHeart}
      className={`absolute w-25pxr h-23pxr ${position}`}
      onClick={handleClick}
    />
  );
}

export default Like;
