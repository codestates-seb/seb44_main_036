interface UserProfileProps {
  nickname: string;
  accountType: 'seller' | 'buyer';
}

function UserProfile({ nickname, accountType }: UserProfileProps) {
  return (
    <>
      <div className='flex flex-row mb-10pxr'>
        <h1 className='text-4xl font-bold'>{nickname}</h1>
        <p className='flex items-end text-xl'>&nbsp;님</p>
      </div>
      <div>
        <p className='text-purple-300 flex-center mb-100pxr'>
          {accountType === 'seller' ? '판매자 회원' : '구매자 회원'}
        </p>
      </div>
    </>
  );
}

export default UserProfile;
