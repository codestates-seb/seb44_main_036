import { useState } from 'react';
import { Tag } from '@/components/ui';

export type TagType = {
  id: number;
  label: string;
};

type Props = {
  style: string;
  initialTags?: string[];
  tagRef: React.RefObject<HTMLButtonElement> | null;
  getTags: (tags: TagType[]) => void;
};

const MAX_TAGS = 5;
const TAG_MAX_LEN = 10;

function TagInput({ initialTags = [], style, tagRef, getTags }: Props) {
  const editTags = initialTags.map((tag, idx) => ({ id: idx, label: tag }));
  const [tags, setTags] = useState(editTags);
  const [input, setInput] = useState('');

  const addTag = () => {
    if (tags.find((tag) => tag.label === input) || tags.length === MAX_TAGS) {
      return;
    }

    if (input !== '' && input.length < TAG_MAX_LEN && tags.length < MAX_TAGS) {
      setTags([...tags, { id: Date.now(), label: input }]);
      setInput('');
    }
  };

  const removeTag = (id: number) => {
    setTags(tags.filter((tag) => tag.id !== id));
  };

  const setTagsByKey = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'Enter':
        addTag();
        break;
      case 'Backspace':
        if (input === '' && tags.length) {
          const prevTag = tags[tags.length - 1];
          e.preventDefault();
          setInput(prevTag.label);
          removeTag(prevTag.id);
        }
        break;
      default:
        return;
    }
  };

  return (
    <>
      <div className={style}>
        {tags.map((tag) => (
          <Tag key={tag.id} id={tag.id} handleClick={removeTag}>
            {tag.label}
          </Tag>
        ))}
        <input
          type='text'
          value={input}
          className='w-full'
          placeholder='엔터를 누르면 최대 10개까지 태그를 입력할 수 있어요'
          onChange={(e) => setInput(e.target.value)}
          onKeyUp={setTagsByKey}
        />
      </div>
      <div className='text-sm text-purple-300 ml-12pxr mb-30pxr'>
        {tags.length} / {MAX_TAGS} 개의 태그
      </div>
      <button className='hidden' type='button' onClick={() => getTags(tags)} ref={tagRef}></button>
    </>
  );
}

export default TagInput;
