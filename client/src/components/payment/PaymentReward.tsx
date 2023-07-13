import { truck } from '@/assets/payment';
import { calculateTotalPrice } from '@/common/utils/calculateTotalPrice';

interface PaymentRewardProps {
  quantity: number;
  handleQuantityChange: (increment: number) => void;
}

function PaymentReward({ quantity, handleQuantityChange }: PaymentRewardProps) {
  return (
    <>
      <div className='flex flex-col w-full text-gray-900'>
        <h1 className='text-3xl font-bold text-black mb-40pxr'>리워드</h1>
        <div className='bg-gray-200 h-1pxr mb-25pxr'></div>
        <div className='w-800pxr'>
          <p className='mb-25pxr'>
            <span className='text-xl italic font-extrabold'>39,500</span> 원
          </p>
          <p className='text-2xl font-bold mb-25pxr'>
            [울트라 얼리버드] 체험하기 세트 | 영양 크림 1개 + 수분 크림 1개
          </p>
          <p className='text-gray-800 mb-25pxr'>
            최대 2500W 고출력으로 전기포트, 드라이기도 쌉가능! 65W C타입 초고속 충전도 가능한 지코
            여행어댑터! 해외여행갈때 이제 간편하게 지코 여행어댑터 하나만 챙겨가세요!
          </p>
          <div className='flex flex-row mb-25pxr'>
            <img src={truck} alt='truck'></img>
            <p className='ml-10pxr'>무료 배송 | 리워드 종료일( 07 / 02 )발송 예정</p>
          </div>
          <div className='bg-gray-100 rounded-lg p-20pxr'>
            <p className='mb-20pxr'>
              [울트라 얼리버드] 체험하기 세트 | 영양 크림 1개 + 수분 크림 1개
            </p>
            <div className='flex flex-row justify-between'>
              <div className='flex items-center overflow-hidden bg-white border border-solid rounded-md'>
                <button
                  className='h-full text-2xl border border-t-0 border-b-0 border-l-0 flex-center w-40pxr'
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 0}
                >
                  -
                </button>
                <span className='text-xl w-65pxr flex-center'>{quantity}</span>
                <button
                  className='h-full text-2xl border border-t-0 border-b-0 border-r-0 flex-center w-40pxr'
                  onClick={() => handleQuantityChange(1)}
                >
                  +
                </button>
              </div>
              <div>
                <p className='flex justify-end text-xs text-purple-300'>최종 결제 금액</p>
                <p className='text-4xl italic font-extrabold text-purple-300'>
                  {calculateTotalPrice(quantity).toLocaleString()}원
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className='bg-gray-200 mt-35pxr h-1pxr'></div>
      </div>
    </>
  );
}

export default PaymentReward;
