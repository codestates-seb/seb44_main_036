type Props = {
  text: string;
  icon: JSX.Element;
  style: string;
  onClick?: () => void;
};

function SocialButton({ text, icon, style, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className={`pl-30pxr relative flex-center font-semibold rounded-full h-50pxr ${style}`}
    >
      <div className='absolute left-33pxr'>{icon}</div>
      {text}
    </button>
  );
}

export default SocialButton;
