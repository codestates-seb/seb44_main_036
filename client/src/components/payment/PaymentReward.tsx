import { truck } from '@/assets/payment';
import { calculateTotalPrice } from '@/common/utils/calculateTotalPrice';
import useSWR from 'swr';
import { projectApi } from '@/common/api/api';
import { useParams } from 'react-router-dom';

interface PaymentRewardProps {
  quantity: number;
  handleQuantityChange: (increment: number) => void;
}

function PaymentReward({ quantity, handleQuantityChange }: PaymentRewardProps) {
  const { projectId } = useParams();
  const { data, isLoading } = useSWR(`/projects/${projectId}`, projectApi.getProject);
  const expiredDate = new Date(data?.expiredDate);
  const unitPrice = data?.price;

  if (isLoading) return <div>Loading....</div>;

  return (
    <>
      <div className='flex flex-col w-full text-gray-900'>
        <h1 className='text-3xl font-bold text-black mb-40pxr'>결제하기</h1>
        <div className='bg-gray-200 h-1pxr mb-25pxr'></div>
        <div className='w-800pxr'>
          <p className='mb-25pxr'>
            <span className='text-xl italic font-extrabold'>{data?.price}</span> 원
          </p>
          <p className='text-2xl font-bold mb-25pxr'>{data?.title}</p>
          <p className='text-gray-800 mb-25pxr'>{data?.summary}</p>
          <div className='flex flex-row mb-25pxr'>
            <img src={truck} alt='truck'></img>
            <p className='ml-10pxr'>
              무료 배송 | 리워드 종료일( {expiredDate.toLocaleString('ko-KR')} ) 발송 예정
            </p>
          </div>
          <div className='bg-gray-100 rounded-lg p-20pxr'>
            <p className='mb-20pxr'>{data?.title}</p>
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
                  {calculateTotalPrice(quantity, unitPrice).toLocaleString()}원
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
