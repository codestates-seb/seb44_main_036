import useDidMountEffect from '@/hooks/useDidMountEffect';
import { useEffect, useState, ChangeEvent } from 'react';
import { ReactComponent as SearchIconSvg } from '@/assets/icons/search_icon.svg';

declare global {
  interface Window {
    kakao: any;
    daum: any;
  }
}

function KakaoMap() {
  const [map, setMap] = useState<any>();
  const [marker, setMarker] = useState<any>();
  const [address, setAdress] = useState<string>();

  useEffect(() => {
    window.kakao.maps.load(() => {
      const container = document.getElementById('map');
      const options = {
        center: new window.kakao.maps.LatLng(33.450701, 126.570667),
        level: 3,
      };

      setMap(new window.kakao.maps.Map(container, options));
      setMarker(new window.kakao.maps.Marker());
    });
  }, []);

  useDidMountEffect(() => {
    if (map) {
      window.kakao.maps.event.addListener(map, 'click', function (mouseEvent: any) {
        // 주소-좌표 변환 객체를 생성합니다
        const geocoder = new window.kakao.maps.services.Geocoder();

        geocoder.coord2Address(
          mouseEvent.latLng.getLng(),
          mouseEvent.latLng.getLat(),
          (result: any, status: any) => {
            if (status === window.kakao.maps.services.Status.OK) {
              const addr = result[0].road_address
                ? result[0].road_address.address_name
                : result[0].address.address_name;

              // 클릭한 위치 주소를 가져온다.
              console.log(addr);
              setAdress(addr);

              // 기존 마커를 제거하고 새로운 마커를 넣는다.
              marker.setMap(null);
              // 마커를 클릭한 위치에 표시합니다
              marker.setPosition(mouseEvent.latLng);
              marker.setMap(map);
            }
          }
        );
      });
    }
  }, [map, marker]);

  const onClickAddr = () => {
    // 3) 주소 검색
    new window.daum.Postcode({
      // 4) 검색된 주소 클릭 시 콜백 함수
      oncomplete: function (addrData: any) {
        const geocoder = new window.kakao.maps.services.Geocoder();
        console.log('지오', geocoder);

        geocoder.addressSearch(
          addrData.address, // 검색된 주소
          function (result: any, status: any) {
            // 5) 성공시 좌표 값을 가져온다.
            if (status === window.kakao.maps.services.Status.OK) {
              const currentPos = new window.kakao.maps.LatLng(result[0].y, result[0].x);
              console.log('체크');
              (document.getElementById('addr') as HTMLInputElement).value = addrData.address;
              map.panTo(currentPos);
              // 결과값으로 받은 위치를 마커로 표시합니다
              marker.setMap(null);
              marker.setPosition(currentPos);
              marker.setMap(map);
            }
          }
        );
      },
    }).open();
  };

  return (
    <div className='flex-col flex-center w-500pxr'>
      <div className='relative w-full mb-25pxr'>
        <input
          id='addr'
          type='text h-35pxr'
          value={address}
          className='w-full h-full border'
          onClick={onClickAddr}
        />
        <SearchIconSvg className='absolute right-20pxr top-8pxr ' />
      </div>
      <div id='map' className='h-400pxr w-500pxr'></div>
    </div>
  );
}

export default KakaoMap;
