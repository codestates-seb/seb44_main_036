import ScrollUpButton from '@/components/ui/ScrollUpButton';
import { PaymentInfo, PaymentReward } from '@/components/payment';
import { useState } from 'react';

function PaymentPage() {
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
        <PaymentInfo quantity={quantity}></PaymentInfo>
      </div>
      <ScrollUpButton></ScrollUpButton>
    </>
  );
}

export default PaymentPage;
