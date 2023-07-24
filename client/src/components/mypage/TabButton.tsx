interface TabButtonProps {
  activeTab: 'sell' | 'buy' | 'liked';
  setTab: (tab: 'sell' | 'buy' | 'liked') => void;
}

function TabButton({ activeTab, setTab }: TabButtonProps) {
  return (
    <>
      <button
        className={`text-3xl font-semibold ${
          activeTab === 'sell' ? 'text-purple-300 active' : 'text-gray-400 hover:text-purple-300'
        } relative mr-40pxr`}
        onClick={() => setTab('sell')}
      >
        판매중인 프로젝트
        {activeTab === 'sell' && (
          <span className='absolute transform -translate-x-1/2 bg-purple-300 rounded-full w-8pxr h-8pxr -top-16pxr left-1/2'></span>
        )}
      </button>
      <button
        className={`text-3xl font-semibold ${
          activeTab === 'buy' ? 'text-purple-300 active' : 'text-gray-400 hover:text-purple-300'
        } relative mr-40pxr`}
        onClick={() => setTab('buy')}
      >
        펀딩중인 프로젝트
        {activeTab === 'buy' && (
          <span className='absolute transform -translate-x-1/2 bg-purple-300 rounded-full w-8pxr h-8pxr -top-16pxr left-1/2'></span>
        )}
      </button>
      <button
        className={`text-3xl font-semibold ${
          activeTab === 'liked' ? 'text-purple-300 active' : 'text-gray-400 hover:text-purple-300'
        } relative`}
        onClick={() => setTab('liked')}
      >
        좋아요한 프로젝트
        {activeTab === 'liked' && (
          <span className='absolute transform -translate-x-1/2 bg-purple-300 rounded-full w-8pxr h-8pxr -top-16pxr left-1/2'></span>
        )}
      </button>
    </>
  );
}

export default TabButton;
