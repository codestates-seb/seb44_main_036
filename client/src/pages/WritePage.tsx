import ScrollUpButton from '@/components/ScrollUpButton/ScrollUpButton';
import Select from 'react-select';
import { combineClassNames } from '@/common/utils/functions';
import { TagInput } from '@/components/project';
import { CATEGORIES } from '@/common/constants';

const style = {
  title: 'text-3xl font-extrabold text-purple-300 mb-5pxr',
  desc: 'font-light pb-15pxr',
  subTitle: 'text-2xl font-bold text-gray-900 my-10pxr',
  input: 'border border-solid rounded border-gray-400 py-5pxr px-10pxr focus:border-purple-300',
  fileInput:
    'border-b border-solid border-gray-400 w-[80%] py-5pxr mb-20pxr text-sm text-gray-900 focus:border-purple-300 file:py-3pxr file:px-15pxr file:rounded-full file:border-0 file:bg-purple-300 file:text-white file:mr-10pxr',
  tagInput: 'w-[80%] flex items-center overflow-hidden mb-10pxr',
};

function WritePage() {
  const options = Object.values(CATEGORIES)
    .filter(([categoryNUM]) => categoryNUM !== null)
    .map(([categoryNUM, categoryKO]) => ({
      value: categoryNUM,
      label: categoryKO,
    }));

  return (
    <>
      <main className='max-w-[1280px] mx-auto mt-30pxr'>
        <h2 className={style.title}>프로젝트 정보</h2>
        <p className={style.desc}>프로젝트를 나타내는 중요한 정보들을 입력해 주세요</p>
        <h3 className={style.subTitle}>프로젝트 제목</h3>
        <input type='text' className={combineClassNames(style.input, 'w-[80%] mb-20pxr')} />
        <h3 className={style.subTitle}>대표 이미지</h3>
        <input type='file' accept='.png, .jpg, .jpeg' className={style.fileInput} />
        <h3 className={style.subTitle}>목표 금액</h3>
        <div className='relative w-[80%]'>
          <input type='number' className={combineClassNames(style.input, 'w-full mb-20pxr')} />
          <span className='absolute top-[10%] right-15pxr'>원</span>
        </div>
        <h3 className={style.subTitle}>검색용 태그(#)</h3>
        <TagInput style={combineClassNames(style.input, style.tagInput)}></TagInput>
        <h3 className={style.subTitle}>프로젝트 종료일</h3>
        <input type='date' className={combineClassNames(style.input, 'w-[80%] mb-20pxr')} />
        <h3 className={style.subTitle}>카테고리 설정</h3>
        <Select options={options} className='w-[25%] mb-20pxr' />
        <h2 className={style.title}>스토리 작성</h2>
        <p className={style.desc}>프로젝트를 나타내는 중요한 정보들을 입력해 주세요</p>
      </main>
      <ScrollUpButton />
    </>
  );
}

export default WritePage;
