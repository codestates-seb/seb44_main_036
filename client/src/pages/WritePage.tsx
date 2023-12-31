import type { Editor } from '@toast-ui/react-editor';
import Select from 'react-select';
import { TagInput } from '@/components/writepage';
import { TuiEditor } from '@/components/editor';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useEffect, useRef, useState } from 'react';
import { options } from '@/common/constants/sort';
import { customStyles, style } from '@/components/writepage/styles';
import { TagType } from '@/components/writepage/TagInput';
import { projectApi } from '@/common/api/api';
import { imageCompressor, dday, combineClassNames, dateToString } from '@/common/utils';
import { ReactComponent as Spinner } from '@/assets/common/spinner.svg';
import { useLocation, useNavigate } from 'react-router-dom';
import KakaoMap from '@/components/kakaomap/KakaoMap';
import ScrollUpButton from '@/components/ui/ScrollUpButton';
import { storage } from '@/common/utils/storage';
import { mutate } from 'swr';

type Category = {
  value: number;
  label: string;
};

export type mapDataType = {
  address: string;
  x: string;
  y: string;
};

type FormData = {
  categoryId: number;
  title: string;
  targetAmount: number;
  endDay: number;
  memberId: number;
  imageUrl: string;
  summary: string;
  content: string;
  price: number;
  tags?: string[];
  location: string | null;
  x: string | null;
  y: string | null;
  expiredDate?: string;
};

function WritePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [emptyError, setIsEmptyError] = useState(false);
  const [mapData, setMapData] = useState<mapDataType | null>(null);

  const editorRef = useRef<Editor>(null);
  const selectRef = useRef<Category>({ value: 11, label: '기타' });
  const buttonRef = useRef<HTMLButtonElement>(null);
  const tagRef = useRef<string[]>([]);
  const imageRef = useRef('');
  const navigate = useNavigate();
  const location = useLocation();
  const initialState = location.state ?? {};
  const isEditPage = location.pathname.includes('edit');

  useEffect(() => {
    if (initialState) {
      const newMapData = {
        address: initialState.location,
        x: initialState.x,
        y: initialState.y,
      };
      setMapData(newMapData);
    }
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: { ...initialState, endDay: dateToString(new Date(initialState.expiredDate)) },
  });

  const hasContent = (str: string) => {
    return !!str.replace(/<br>/g, '').trim().length;
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsLoading(true);
    const memberId = storage.get('memberId');
    const content = editorRef.current?.getInstance().getMarkdown();

    if (!hasContent(content)) {
      setIsEmptyError(true);
      return;
    }

    buttonRef.current?.click();
    if (memberId) data.memberId = +memberId;
    data.expiredDate = dateToString(data.endDay as unknown as Date);
    data.endDay = dday(data.endDay as unknown as Date);
    data.content = editorRef.current?.getInstance().getHTML();
    data.imageUrl = imageRef.current;
    data.categoryId = selectRef.current.value;
    data.location = mapData ? mapData.address : null;
    data.x = mapData ? mapData.x : null;
    data.y = mapData ? mapData.y : null;
    data.tags = tagRef.current;
    try {
      if (isEditPage) {
        const editData = {
          ...initialState,
          content: data.content,
          expiredDate: data.expiredDate,
          endDay: data.endDay,
          imageUrl: data.imageUrl || initialState.imageUrl,
          price: data.price,
          summary: data.summary,
          targetAmount: data.targetAmount,
          title: data.title,
          location: data.location,
          x: data.x,
          y: data.y,
          tags: tagRef.current,
        };
        await projectApi.editProject<FormData>(initialState.projectId, editData);
        await mutate(`/projects/${initialState.projectId}`, editData);
        alert('수정이 완료되었습니다.');
        navigate(`/project/${initialState.projectId}`);
      } else {
        await projectApi.addProject<FormData>(data);
        navigate('/');
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const onSelect = (value: unknown) => {
    selectRef.current = value as Category;
  };

  const getTags = (tags: TagType[]) => {
    tagRef.current = tags.map((tag) => tag.label);
  };

  const getImageUrl = async (image: File) => {
    setIsLoading(true);
    try {
      const compressionImage = await imageCompressor(image);
      const { data: imageUrl } = await projectApi.getImageUrl({ image: compressionImage });
      return imageUrl;
    } catch (error) {
      console.error('이미지 URL 변환 에러:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getThumbnailUrl = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const image = e.target.files?.[0];
    if (image) {
      const imageUrl = await getImageUrl(image);
      imageRef.current = imageUrl;
    }
  };

  const handleImage = async (file: File, callback: typeof Function) => {
    const imageUrl = await getImageUrl(file);
    callback(imageUrl);
  };

  const setMapDataFn = (value: mapDataType) => {
    setMapData(value);
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
              minLength: { value: 2, message: '❗️ 최소 2자 이상 입력해야 합니다.' },
              maxLength: { value: 50, message: '❗️ 최대 50자 까지 입력할 수 있습니다.' },
            })}
            className={combineClassNames(style.input, 'w-[80%] mb-30pxr')}
          />
          <p className={style.error}>{errors.title?.message}</p>
        </div>
        <h3 className={style.subTitle}>대표 이미지</h3>
        <div className='flex gap-15pxr'>
          <input
            type='file'
            accept='.png, .jpg, .jpeg'
            className={style.fileInput}
            onChange={getThumbnailUrl}
          />
          {isEditPage && <p className={style.info}>※ 미첨부시 기존 이미지가 유지됩니다.</p>}
        </div>
        <h3 className={style.subTitle}>상품 가격</h3>
        <div className='relative w-[80%]'>
          <input
            type='number'
            {...register('price', {
              required: '❗️ 필수 항목입니다.',
              valueAsNumber: true,
              max: { value: 10000000, message: '❗️ 최대 천만원 까지 입력 가능합니다.' },
            })}
            className={combineClassNames(style.input, 'w-full mb-30pxr')}
          />
          <span className='absolute top-[10%] right-15pxr'>원</span>
          <p className={style.error}>{errors.price?.message}</p>
        </div>
        <h3 className={style.subTitle}>목표 금액</h3>
        <div className='relative w-[80%]'>
          <input
            type='number'
            {...register('targetAmount', {
              required: '❗️ 필수 항목입니다. 최소 5만원부터 최대 천만원까지 입력 가능합니다.',
              valueAsNumber: true,
              min: { value: 50000, message: '❗️ 최소 5만원 부터 입력 가능합니다.' },
              max: { value: 10000000, message: '❗️ 최대 천만원 까지 입력 가능합니다.' },
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
          initialTags={initialState.tags}
        ></TagInput>
        <h3 className={style.subTitle}>프로젝트 종료일</h3>
        <div className='relative'>
          <input
            type='date'
            min={dateToString()}
            {...register('endDay', {
              required: '❗️ 필수 항목입니다.',
              valueAsDate: true,
            })}
            className={combineClassNames(style.input, 'w-[80%] mb-30pxr')}
          />
          <p className={style.error}>{errors.endDay?.message}</p>
        </div>
        <h3 className={style.subTitle}>카테고리 설정</h3>
        <div className='flex gap-20pxr'>
          <Select
            options={options}
            className='w-[25%] mb-40pxr'
            styles={customStyles}
            placeholder='카테고리 선택'
            components={{ IndicatorSeparator: null }}
            onChange={onSelect}
            defaultValue={options.find((option) => option.value === initialState.categoryId)}
            isDisabled={isEditPage}
          />
          <p className={style.info}>※ 카테고리 미선택시 '기타'로 분류되며, 수정이 불가능합니다.</p>
        </div>
        <h2 className={style.title}>픽업 지점 설정</h2>
        <p className={style.desc}>
          빠르게 리워드를 가져갈 수 있도록 픽업 지점을 설정할 수 있습니다.
        </p>
        <div className='flex flex-col mb-55pxr'>
          <h3 className={style.subTitle}>주소</h3>
          <KakaoMap setMapDataFn={setMapDataFn} initialState={initialState} />
        </div>
        <h2 className={style.title}>스토리 작성</h2>
        <p className={style.desc}>프로젝트를 나타내는 중요한 정보들을 입력해 주세요</p>
        <h3 className={style.subTitle}>프로젝트 요약</h3>
        <div className='relative'>
          <textarea
            className={combineClassNames(style.input, style.textarea)}
            placeholder='나만의 프로젝트 이야기를 요약해 주세요.'
            {...register('summary', {
              required: '❗️ 필수 항목입니다. 최대 100자까지 입력 가능합니다.',
              maxLength: { value: 100, message: '❗️ 최대 100자까지 입력 가능합니다.' },
            })}
          ></textarea>
          <p className={style.error}>{errors.summary?.message}</p>
        </div>
        <h3 className={style.subTitle}>프로젝트 스토리</h3>
        <div className={style.editor}>
          <TuiEditor
            editorRef={editorRef}
            imageHandler={handleImage}
            content={initialState.content}
          />
        </div>
        {emptyError && (
          <p className={style.empty}>❗️필수 항목입니다. 내용 혹은 이미지가 포함되어야 합니다.</p>
        )}
        <button
          type='button'
          disabled={isLoading}
          className={style.submitButton}
          onClick={handleSubmit(onSubmit)}
        >
          {isLoading ? <Spinner /> : isEditPage ? '프로젝트 수정' : '프로젝트 생성'}
        </button>
      </form>
      <ScrollUpButton />
    </>
  );
}

export default WritePage;
