interface UserProfileProps {
  nickname?: string;
}

function UserProfile({ nickname }: UserProfileProps) {
  return (
    <>
      <div className='flex flex-row mb-70pxr'>
        <h1 className='text-4xl font-bold'>{nickname}</h1>
        <p className='flex items-end text-xl'>&nbsp;님</p>
      </div>
    </>
  );
}

export default UserProfile;
