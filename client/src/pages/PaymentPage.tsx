import { PaymentInfo, PaymentReward } from '@/components/payment';
import ScrollUpButton from '@/components/ui/ScrollUpButton';
import { useState } from 'react';
import { useAppSelector } from '@/hooks/useReducer';

function PaymentPage() {
  const userData = useAppSelector((state) => state.user.data);
  const memberId = userData?.memberId;
  const cash = userData?.cash;
  const address = userData?.address;
  const [quantity, setQuantity] = useState<number>(1);

  const handleQuantityChange = (increment: number) => {
    setQuantity((prevQuantity) => prevQuantity + increment);
  };

  return (
    <>
      <div className='flex-center max-w-[1200px] mx-auto my-50pxr flex-col'>
        <PaymentReward
          quantity={quantity}
          handleQuantityChange={handleQuantityChange}
        ></PaymentReward>
        <PaymentInfo
          memberId={memberId}
          address={address}
          cash={cash}
          quantity={quantity}
        ></PaymentInfo>
      </div>
      <ScrollUpButton></ScrollUpButton>
    </>
  );
}

export default PaymentPage;
