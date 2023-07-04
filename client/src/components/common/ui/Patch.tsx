type Props = {
  children: string;
  type: 'tag' | 'deadline' | 'alert';
};

const patchStyles = {
  tag: 'bg-purple-200 hover:bg-purple-300',
  deadline: 'bg-purple-300',
  alert: 'bg-cherry',
};

function Patch({ children, type }: Props) {
  return (
    <div className={`${patchStyles[type]} rounded text-white h-fit px-6pxr py-3pxr text-xs`}>
      {children}
    </div>
  );
}

export default Patch;
