type Props = {
  text: string;
  style?: string;
  onClick?: () => void;
};

function Strong({ text, style, onClick }: Props) {
  return (
    <strong onClick={onClick} className={`text-purple-300 font-semibold ${style}`}>
      {text}
    </strong>
  );
}
export default Strong;
