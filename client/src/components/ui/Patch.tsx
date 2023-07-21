type Props = {
  children: string;
  type: 'tag' | 'deadline' | 'alert';
};

const patchStyles = {
  tag: 'bg-purple-200 hover:bg-purple-300 rounded-sm',
  deadline: 'bg-purple-300 rounded',
  alert: 'bg-cherry absolute top-10pxr left-10pxr rounded',
};

function Patch({ children, type }: Props) {
  return (
    <div className={`${patchStyles[type]} text-white h-fit px-6pxr py-3pxr text-xs`}>
      {children}
    </div>
  );
}

export default Patch;
