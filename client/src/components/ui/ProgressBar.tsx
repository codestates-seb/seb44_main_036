type Props = {
  backgroundStyle: string;
  barStyle: string;
  progress: number;
};

function ProgressBar({ backgroundStyle, barStyle, progress }: Props) {
  return (
    <div className={backgroundStyle}>
      <div className={barStyle} style={{ width: `${progress}%` }}></div>
    </div>
  );
}

export default ProgressBar;
