import { useEffect, useState } from 'react';
import { ReactComponent as SearchIconSvg } from '@/assets/icons/search_icon.svg';

declare global {
  interface Window {
    kakao: any;
    daum: any;
  }
}

type postData = {
  address: string;
};

function KakaoMap() {
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
        const map = new window.kakao.maps.LatLng(33.450701, 126.570667);
        const options = {
          center: map,
          level: 3,
        };

        const imageSrc = '/src/assets/icons/marker_icon.png';
        const imageSize = new kakao.maps.Size(34, 45);
        const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
        const marker = new window.kakao.maps.Marker({
          position: map,
          image: markerImage,
        });

        setMap(new window.kakao.maps.Map(container, options));
        setMarker(marker);
        setIsLoad(true);
      });
    };

    return () => {
      document.body.removeChild(script);
    };
  }, [isLoad]);

  useEffect(() => {
    if (map && marker) {
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
              }
            }
          );
        }
      );
    }
  }, [map, marker]);

  const onInputClickHandler = () => {
    if (map && marker) {
      new window.daum.Postcode({
        oncomplete: function (data: postData) {
          const geocoder = new window.kakao.maps.services.Geocoder();

          geocoder.addressSearch(
            data.address,
            function (
              result: kakao.maps.services.GeocoderResult[],
              status: kakao.maps.services.Status
            ) {
              if (status === window.kakao.maps.services.Status.OK) {
                const searchPosition = new window.kakao.maps.LatLng(result[0].y, result[0].x);

                map.panTo(searchPosition);
                setAdress(data.address);
                marker.setPosition(searchPosition);
                marker.setMap(map);
              }
            }
          );
        },
      }).open();
    }
  };

  return (
    <div className='flex-col flex-center w-500pxr'>
      <div className='relative w-full mb-25pxr'>
        <input
          id='addr'
          type='text h-35pxr'
          defaultValue={address}
          className='w-full h-full border'
          onClick={onInputClickHandler}
        />
        <SearchIconSvg className='absolute right-20pxr top-8pxr ' />
      </div>
      <div id='map' className='h-400pxr w-500pxr'></div>
    </div>
  );
}

export default KakaoMap;
