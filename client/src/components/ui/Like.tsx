import { heart, emptyHeart } from '@/assets/like';

type Props = {
  like: boolean;
  position: string;
};

function Like({ like, position }: Props) {
  return <img src={like ? heart : emptyHeart} className={`absolute w-25pxr h-23pxr ${position}`} />;
}

export default Like;
