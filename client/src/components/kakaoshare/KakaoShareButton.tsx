import { useEffect } from 'react';
import { ModalData } from '../project/ProjectInfo';

type Props = {
  modalData: ModalData;
};

const KakaoShareButton = ({ modalData }: Props) => {
  const { title, desc, imgUrl } = modalData;

  useEffect(() => {
    createKakaoButton();
  }, []);

  const createKakaoButton = () => {
    if (window.Kakao) {
      const kakao = window.Kakao;

      if (!kakao.isInitialized()) {
        kakao.init(import.meta.env.VITE_KAKAO_KEY);
      }

      kakao.Link.createDefaultButton({
        container: '#kakao-link-btn',
        objectType: 'feed',
        content: {
          title: title,
          description: desc,
          imageUrl: imgUrl,
          link: {
            mobileWebUrl: window.location.href,
            webUrl: window.location.href,
          },
        },
        buttons: [
          {
            title: '펀딩하러 가기',
            link: {
              mobileWebUrl: window.location.href,
              webUrl: window.location.href,
            },
          },
        ],
        serverCallbackArgs: '{"key":"value"}',
      });
    }
  };

  return (
    <div className='h-full'>
      <button id='kakao-link-btn' className='h-37pxr w-37pxr'>
        <img
          src='https://developers.kakao.com/assets/img/about/logos/kakaolink/kakaolink_btn_medium.png'
          alt='카카오링크 보내기 버튼'
        />
      </button>
    </div>
  );
};

export default KakaoShareButton;
