type Props = {
  text: string;
  imgSrc: string;
  onClick?: () => void;
};

function SquareButton({ text, imgSrc, onClick }: Props) {
  return (
    <div
      onClick={onClick}
      className='flex-col border-2 border-gray-300 border-solid rounded-md cursor-pointer w-60pxr flex-center px-10pxr py-5pxr hover:bg-purple-50 hover:border-purple-300/50'
    >
      <img src={imgSrc} />
      <span className='text-xs text-gray-700 pt-5pxr'>{text}</span>
    </div>
  );
}

export default SquareButton;
