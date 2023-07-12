import type { Editor } from '@toast-ui/react-editor';
import ScrollUpButton from '@/components/ScrollUpButton/ScrollUpButton';
import Select from 'react-select';
import { combineClassNames } from '@/common/utils/functions';
import { TagInput } from '@/components/writepage';
import { TuiEditor } from '@/components/editor';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRef } from 'react';
import { options } from '@/common/constants/sort';
import { customStyles, style } from '@/components/writepage/styles';
import { TagType } from '@/components/writepage/TagInput';

type Category = {
  value: number;
  label: string;
};

type FormData = {
  title: string;
  targetAmount: number;
  expiredAt: Date;
  thumbnail?: string;
  tags?: string[];
  category?: number;
  summary?: string;
  content?: string;
};

function WritePage() {
  const editorRef = useRef<Editor>(null);
  const selectRef = useRef<Category>({ value: 10, label: '기타' });
  const buttonRef = useRef<HTMLButtonElement>(null);
  const tagRef = useRef<string[]>([]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    buttonRef.current?.click();
    data.content = editorRef.current?.getInstance().getHTML();
    data.category = selectRef.current.value;
    data.tags = tagRef.current;
    console.log(data);
  };

  const onSelect = (value: unknown) => {
    selectRef.current = value as Category;
  };

  const getTags = (tags: TagType[]) => {
    tagRef.current = tags.map((tag) => tag.label);
  };

  return (
    <>
      <form className='max-w-[1280px] mx-auto mt-30pxr'>
        <h2 className={style.title}>프로젝트 정보</h2>
        <p className={style.desc}>프로젝트를 나타내는 중요한 정보들을 입력해 주세요</p>
        <h3 className={style.subTitle}>프로젝트 제목</h3>
        <div className='relative'>
          <input
            type='text'
            {...register('title', {
              required: '❗️ 필수 항목입니다. 최소 2자, 최대 20자까지 입력 가능합니다.',
              minLength: 2,
              maxLength: 20,
            })}
            className={combineClassNames(style.input, 'w-[80%] mb-30pxr')}
          />
          <p className={style.error}>{errors.title?.message}</p>
        </div>
        <h3 className={style.subTitle}>대표 이미지</h3>
        <input type='file' accept='.png, .jpg, .jpeg' className={style.fileInput} />
        <h3 className={style.subTitle}>목표 금액</h3>
        <div className='relative w-[80%]'>
          <input
            type='number'
            {...register('targetAmount', {
              required: '❗️ 필수 항목입니다. 최소 5만원부터 최대 천만원까지 입력 가능합니다.',
              valueAsNumber: true,
              min: 50000,
              max: 10000000,
            })}
            className={combineClassNames(style.input, 'w-full mb-30pxr')}
          />
          <span className='absolute top-[10%] right-15pxr'>원</span>
          <p className={style.error}>{errors.targetAmount?.message}</p>
        </div>
        <h3 className={style.subTitle}>검색용 태그(#)</h3>
        <TagInput
          style={combineClassNames(style.input, style.tagInput)}
          tagRef={buttonRef}
          getTags={getTags}
        ></TagInput>
        <h3 className={style.subTitle}>프로젝트 종료일</h3>
        <div className='relative'>
          <input
            type='date'
            {...register('expiredAt', {
              required: '❗️ 필수 항목입니다.',
              valueAsDate: true,
            })}
            className={combineClassNames(style.input, 'w-[80%] mb-30pxr')}
          />
          <p className={style.error}>{errors.expiredAt?.message}</p>
        </div>
        <h3 className={style.subTitle}>카테고리 설정</h3>
        <Select
          options={options}
          className='w-[25%] mb-40pxr'
          styles={customStyles}
          placeholder='카테고리 선택'
          components={{ IndicatorSeparator: null }}
          onChange={onSelect}
        />
        <h2 className={style.title}>스토리 작성</h2>
        <p className={style.desc}>프로젝트를 나타내는 중요한 정보들을 입력해 주세요</p>
        <h3 className={style.subTitle}>프로젝트 요약</h3>
        <textarea
          className={combineClassNames(style.input, style.textarea)}
          placeholder='나만의 프로젝트 이야기를 요약해 주세요.'
          {...register('summary', {
            required: '❗️ 필수 항목입니다. 최대 100자까지 입력 가능합니다.',
            maxLength: 100,
          })}
        ></textarea>
        <h3 className={style.subTitle}>프로젝트 스토리</h3>
        <div className={style.editor}>
          <TuiEditor editorRef={editorRef} />
        </div>
        <input
          type='button'
          value='프로젝트 생성'
          className={style.submitButton}
          onClick={handleSubmit(onSubmit)}
        />
      </form>
      <ScrollUpButton />
    </>
  );
}

export default WritePage;
