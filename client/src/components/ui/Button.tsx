type Props = {
  text: string;
  type?: 'submit' | 'reset';
  style?: string;
  onClick?: () => void;
};

function Button({ text, style, type, onClick }: Props) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`text-white bg-purple-300 hover:bg-purple-400 rounded-full ${style}`}
    >
      {text}
    </button>
  );
}

export default Button;
