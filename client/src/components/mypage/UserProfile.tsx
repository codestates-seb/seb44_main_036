interface UserProfileProps {
  nickname?: string;
  accountType: 'seller' | 'buyer';
}

function UserProfile({ nickname, accountType }: UserProfileProps) {
  return (
    <>
      <div className='flex flex-row mb-110pxr'>
        <h1 className='text-4xl font-bold'>{nickname}</h1>
        <p className='flex items-end text-xl'>&nbsp;님</p>
      </div>
    </>
  );
}

export default UserProfile;
