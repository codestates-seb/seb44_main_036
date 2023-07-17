import { useState, useEffect, useRef } from 'react';
import KakaoShareButton from './KakaoShareButton';
import { ReactComponent as ExitSvg } from '@/assets/icons/exit_icon.svg';
import { successToast } from '@/common/utils/toast';
import { useLocation } from 'react-router-dom';
import useOnClickOutside from '@/hooks/useOnClickOutside';
import { ModalData } from '../project/ProjectInfo';

type Props = {
  onModalClosed: () => void;
  modalData: ModalData;
};

function ShareModal({ onModalClosed, modalData }: Props) {
  const [shareButton, setShareButton] = useState(false);
  const location = useLocation();
  const modalRef = useRef(null);

  useOnClickOutside(modalRef, onModalClosed);

  const onCopyClick = () => {
    // TODO : 배포한뒤에 배포주소로 변경
    const address = 'http://localhost:5173' + location.pathname;
    navigator.clipboard.writeText(address);
    successToast('주소가 복사 되었습니다.');
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://t1.kakaocdn.net/kakao_js_sdk/2.3.0/kakao.min.js';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      setShareButton(true);
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div
      ref={modalRef}
      className='absolute top-0 right-0 flex flex-col justify-center w-full bg-white rounded-md px-20pxr h-130pxr drop-shadow-md'
    >
      <h5 className='font-semibold mb-10pxr'>카카오톡 공유하기</h5>
      <div className='flex w-full gap-10pxr h-37pxr'>
        <div className='relative flex w-full h-full'>
          <input
            defaultValue={`http://localhost:5173${location.pathname}`}
            className='border-[1.5px] rounded w-full border-gray-300 ellipsis pl-10pxr pr-55pxr'
          />
          <button
            onClick={onCopyClick}
            className='absolute text-gray-700 right-10pxr top-5pxr hover:text-purple-500'
          >
            Copy
          </button>
        </div>
        {shareButton && <KakaoShareButton modalData={modalData} />}
      </div>
      <button onClick={onModalClosed}>
        <ExitSvg className='absolute right-10pxr top-10pxr' />
      </button>
    </div>
  );
}

export default ShareModal;
