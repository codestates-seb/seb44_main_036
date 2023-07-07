type Props = {
  text: string;
  imgSrc: string;
};

function SquareButton({ text, imgSrc }: Props) {
  return (
    <div className='flex-col border-2 border-gray-300 border-solid rounded-md cursor-pointer w-60pxr flex-center px-10pxr py-5pxr hover:bg-gray-200'>
      <img src={imgSrc} />
      <span className='text-xs text-gray-700 pt-5pxr'>{text}</span>
    </div>
  );
}

export default SquareButton;
