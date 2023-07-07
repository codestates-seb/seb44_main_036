import '@toast-ui/editor/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';

type Props = {
  editorRef: React.RefObject<Editor> | null;
  setInput: (input: string) => void;
  content?: string;
};

const toolbar = [
  ['heading', 'bold', 'italic', 'strike'],
  ['hr', 'quote'],
  ['ul', 'ol', 'task', 'indent', 'outdent'],
  ['image', 'link'],
];

function TuiEditor({ content, editorRef, setInput }: Props) {
  const handleChange = () => {
    if (editorRef) {
      setInput(editorRef.current?.getInstance().getHTML());
    }
  };

  return (
    <Editor
      initialValue={content ?? ' '}
      initialEditType='wysiwyg'
      autofocus={false}
      ref={editorRef}
      onChange={handleChange}
      toolbarItems={toolbar}
      hideModeSwitch
    />
  );
}

export default TuiEditor;
