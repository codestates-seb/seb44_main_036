import { Viewer } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';

type Props = {
  content: string;
  style?: string;
};

function TuiViewer({ content, style }: Props) {
  return (
    <section className={style}>
      <Viewer initialValue={content} />
    </section>
  );
}

export default TuiViewer;
