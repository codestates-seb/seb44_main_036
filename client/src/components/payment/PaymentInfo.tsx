import { useState } from 'react';
import { DaumPostcodeButton } from '../@usermodal';
import { calculateTotalPrice } from '@/common/utils/calculateTotalPrice';
import { paymentEqual, paymentMinus } from '@/assets/payment';
import useSWR from 'swr';
import { projectApi } from '@/common/api/api';
import { useParams } from 'react-router-dom';

interface PostcodeData {
  zonecode: string;
  address: string;
}

interface PaymentInfoProps {
  quantity: number;
}

function PaymentInfo({ quantity }: PaymentInfoProps) {
  const { projectId } = useParams();
  const { data } = useSWR(`/projects/${projectId}`, projectApi.getProject);
  const unitPrice = data?.price;
  const [newAddress, setNewAddress] = useState<string>('');
  const currentBalance = 2902000;
  const [showModal, setShowModal] = useState(false);

  const handleAddressChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewAddress(event.target.value);
  };

  const handleSelectedAddress = (data: PostcodeData) => {
    setNewAddress(data.address);
    // Process the selected address
    // ...
  };

  const handlePayment = () => {
    // Perform the payment logic here
    // ...
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const totalProductPrice: number = calculateTotalPrice(quantity, unitPrice);
  const remainingBalance: number = currentBalance - totalProductPrice;

  return (
    <>
      <div className='flex-col w-full mt-50pxr gap-20pxr'>
        <div className='relative w-800pxr mb-30pxr'>
          <h2 className='text-3xl font-bold text-black mb-30pxr'>주소 설정</h2>
          <textarea
            className='w-full border border-gray-300 rounded resize-none p-20pxr h-200pxr'
            value={newAddress}
            onChange={handleAddressChange}
            placeholder='주소를 입력해주세요'
          />
          <div className='absolute right-10pxr bottom-15pxr'>
            <DaumPostcodeButton onAddressSelected={handleSelectedAddress} />
          </div>
        </div>
        <h2 className='text-3xl font-bold text-black mb-30pxr'>결제</h2>
        <div className='flex flex-row items-center bg-gray-100 rounded-lg gap-10pxr px-20pxr py-50pxr'>
          <p className='flex-center'>현재 소지금</p>
          <div className='flex flex-row'>
            <p className='text-2xl italic font-bold flex-center'>
              {currentBalance.toLocaleString()}
            </p>
            <p className='flex items-end ml-10pxr'>원</p>
          </div>
          <img className='h-30pxr' src={paymentMinus} alt='paymentMinus'></img>
          <p className='flex-center'>총 상품가격</p>
          <div className='flex flex-row'>
            <p className='text-2xl italic font-bold flex-center'>
              {calculateTotalPrice(quantity, unitPrice).toLocaleString()}
            </p>
            <p className='flex items-end ml-10pxr'>원</p>
          </div>
          <img className='h-30pxr' src={paymentEqual} alt='paymentEqual'></img>
          <p className='flex-center'>잔여 소지금</p>
          <div className='flex flex-row'>
            <p className='text-3xl italic font-bold text-purple-300 flex-center'>
              {remainingBalance.toLocaleString()}
            </p>
            <p className='flex items-end ml-10pxr'>원</p>
          </div>
        </div>
        <button
          className='text-white bg-purple-300 rounded-full py-10pxr px-100pxr mt-50pxr'
          onClick={handlePayment}
        >
          결제하기
        </button>
      </div>
      {showModal && (
        <div className='fixed z-50 flex inset-1pxr flex-center'>
          <div className='absolute bg-black inset-1pxr opacity-40'></div>
          <div className='relative bg-white rounded-lg p-40pxr'>
            <p className='text-xl font-bold text-center text-purple-300'>결제가 완료되었습니다 !</p>
            <div className='flex-center'>
              <button
                className='text-white bg-purple-300 rounded-full flex-center w-100pxr h-30pxr mt-40pxr'
                onClick={handleModalClose}
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default PaymentInfo;
