type Props<T> = {
  text: T;
  style?: T;
};

function TitleText({ text, style }: Props<string>) {
  return <h2 className={`text-lg font-semibold text-gray-900 ${style}`}>{text}</h2>;
}

export default TitleText;
