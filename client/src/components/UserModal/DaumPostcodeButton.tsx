interface DaumPostcodeButtonProps {
  onAddressSelected: (data: PostcodeData) => void;
}

interface PostcodeData {
  zonecode: string;
  address: string;
}

interface PostcodeOptions {
  oncomplete: (data: PostcodeData) => void;
}

interface Postcode {
  open: () => void;
}

interface DaumNamespace {
  Postcode: {
    new (options: PostcodeOptions): Postcode;
  };
}

interface DaumWindow extends Window {
  daum: DaumNamespace;
}

declare let window: DaumWindow;

function DaumPostcodeButton({ onAddressSelected }: DaumPostcodeButtonProps) {
  const openDaumPostcode = () => {
    new window.daum.Postcode({
      oncomplete: (data: PostcodeData) => {
        onAddressSelected(data);
      },
    }).open();
  };

  return (
    <button
      className='text-xs text-gray-100 bg-gray-800 rounded-full p-5pxr'
      onClick={openDaumPostcode}
    >
      우편번호 검색
    </button>
  );
}

export default DaumPostcodeButton;
