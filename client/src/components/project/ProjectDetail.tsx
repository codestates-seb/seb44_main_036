import { TuiViewer } from '../editor';

function ProjectDetail() {
  return (
    <div className='w-[54%]'>
      <h2 className='text-2xl font-bold mb-40pxr'>프로젝트 상세</h2>
      <TuiViewer
        content={
          '<p>p 태그 입니다.</p><h1>h1 태그 입니다.</h1><h2>h2 태그 입니다.</h2><p>p 태그 입니다.</p><span>span 태그 입니다.<span><img src="https://haitikkot.org/gv5/theme/cookie/img/noimage.png" />'
        }
      />
    </div>
  );
}

export default ProjectDetail;
