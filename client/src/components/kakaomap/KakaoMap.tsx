import { useEffect, useState } from 'react';
import { ReactComponent as SearchIconSvg } from '@/assets/icons/search_icon.svg';
import { style } from '../writepage/styles';
import { onInputClickHandler } from './DaumPost';
import markerimg from '@/assets/icons/marker_icon.png';
import { mapDataType } from '@/pages/WritePage';

declare global {
  interface Window {
    kakao: any;
    daum: any;
  }
}

type Props = {
  setMapDataFn: (value: mapDataType) => void;
  initialState: any;
};

function KakaoMap({ setMapDataFn, initialState }: Props) {
  const [map, setMap] = useState<kakao.maps.Map | null>(null);
  const [marker, setMarker] = useState<kakao.maps.Marker | null>(null);
  const [address, setAdress] = useState<string>('');
  const [isLoad, setIsLoad] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${
      import.meta.env.VITE_KAKAO_KEY
    }&autoload=false&libraries=services`;
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById('map');
        const map = initialState?.location
          ? new window.kakao.maps.LatLng(Number(initialState.y), Number(initialState.x))
          : new window.kakao.maps.LatLng(33.450701, 126.570667);

        const options = {
          center: map,
          level: 3,
          scrollwheel: false,
        };

        const position = new window.kakao.maps.Map(container, options);

        const imageSrc = markerimg;
        const imageSize = new kakao.maps.Size(34, 45);
        const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
        const marker = new window.kakao.maps.Marker({
          position: map,
          image: markerImage,
        });

        if (initialState && initialState.location) {
          marker.setMap(position);
          marker.setPosition(map);
          setAdress(initialState.location);
        }

        setMap(position);
        setMarker(marker);
        setIsLoad(true);
      });
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (map && marker && isLoad) {
      window.kakao.maps.event.addListener(
        map,
        'click',
        function (mouseEvent: kakao.maps.event.MouseEvent) {
          const geocoder = new window.kakao.maps.services.Geocoder();

          geocoder.coord2Address(
            mouseEvent.latLng.getLng(),
            mouseEvent.latLng.getLat(),
            (result: kakao.maps.services.GeocoderResult[], status: kakao.maps.services.Status) => {
              if (status === window.kakao.maps.services.Status.OK && result[0]) {
                const addr = result[0].road_address
                  ? result[0].road_address.address_name
                  : result[0].address?.address_name;

                addr && setAdress(addr);
                marker.setMap(map);
                marker.setPosition(mouseEvent.latLng);
                const newMapData = {
                  address: addr || '',
                  y: String(mouseEvent.latLng.getLat()),
                  x: String(mouseEvent.latLng.getLng()),
                };

                setMapDataFn(newMapData);
              }
            }
          );
        }
      );
    }
  }, [map, marker]);

  return (
    <div className='flex-col flex-center w-500pxr'>
      <div className='relative w-full mb-25pxr'>
        <input
          placeholder='주소를 검색하고 싶다면 클릭해 주세요'
          id='addr'
          type='text h-35pxr'
          value={address}
          readOnly
          className={`${style.input} w-full border`}
          onClick={() => onInputClickHandler(map, marker, setAdress, setMapDataFn)}
        />
        <SearchIconSvg className='absolute right-15pxr top-8pxr' />
      </div>
      <div id='map' className='z-0 h-400pxr w-500pxr'></div>
    </div>
  );
}

export default KakaoMap;
