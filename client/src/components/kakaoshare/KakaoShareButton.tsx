import { useEffect } from 'react';
import { ModalData } from '../project/ProjectInfo';

declare global {
  interface Window {
    Kakao: any;
  }
}

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

      kakao.Share.createDefaultButton({
        container: '#kakaotalk-sharing-btn',
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
      });
    }
  };

  return (
    <div className='h-full'>
      <button id='kakaotalk-sharing-btn' className='h-37pxr w-37pxr'>
        <img
          src='https://developers.kakao.com/assets/img/about/logos/kakaolink/kakaolink_btn_medium.png'
          alt='카카오 공유'
        />
      </button>
    </div>
  );
};

export default KakaoShareButton;
