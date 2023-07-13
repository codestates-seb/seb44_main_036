import { useEffect } from 'react';

const KakaoShareButton = () => {
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
          title: '펀딩 프로젝트',
          description: '펀딩 상세 설명',
          imageUrl: 'https://haitikkot.org/gv5/theme/cookie/img/noimage.png',
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
