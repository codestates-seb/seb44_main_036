type Props = {
  text: string;
  icon: JSX.Element;
  style: string;
};

function SocialButton({ text, icon, style }: Props) {
  return (
    <button className={`pl-30pxr relative flex-center font-semibold rounded-full h-50pxr ${style}`}>
      <div className='absolute left-33pxr'>{icon}</div>
      {text}
    </button>
  );
}

export default SocialButton;
