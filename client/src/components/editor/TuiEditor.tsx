import '@toast-ui/editor/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';

type Props = {
  editorRef: React.RefObject<Editor> | null;
  content?: string;
  imageHandler: (blob: File, callback: typeof Function) => void;
};

const toolbar = [
  ['heading', 'bold', 'italic', 'strike'],
  ['hr', 'quote'],
  ['ul', 'ol', 'task', 'indent', 'outdent'],
  ['image', 'link'],
];

function TuiEditor({ content, editorRef, imageHandler }: Props) {
  return (
    <Editor
      initialValue={content ?? ' '}
      initialEditType='wysiwyg'
      autofocus={false}
      ref={editorRef}
      toolbarItems={toolbar}
      hideModeSwitch
      height='500px'
      hooks={{ addImageBlobHook: imageHandler }}
    />
  );
}

export default TuiEditor;
