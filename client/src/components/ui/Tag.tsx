import { ImCross } from 'react-icons/im';

type Props = {
  id: number;
  children: string;
  handleClick: (id: number) => void;
};

function Tag({ children, handleClick, id }: Props) {
  return (
    <div className='flex items-center text-xs text-white bg-purple-300 rounded min-w-fit h-22pxr px-5pxr mr-3pxr gap-5pxr'>
      {children}
      <ImCross onClick={() => handleClick(id)} className='cursor-pointer fill-white' size={9} />
    </div>
  );
}

export default Tag;
