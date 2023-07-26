import { mapDataType } from '@/pages/WritePage';

type PostData = {
  address: string;
};

export const onInputClickHandler = (
  map: kakao.maps.Map | null,
  marker: kakao.maps.Marker | null,
  setAdress: React.Dispatch<React.SetStateAction<string>>,
  setMapDataFn: (value: mapDataType) => void
) => {
  if (map && marker) {
    new window.daum.Postcode({
      oncomplete: function (data: PostData) {
        const geocoder = new window.kakao.maps.services.Geocoder();

        geocoder.addressSearch(
          data.address,
          function (
            result: kakao.maps.services.GeocoderResult[],
            status: kakao.maps.services.Status
          ) {
            if (status === window.kakao.maps.services.Status.OK) {
              const searchPosition = new window.kakao.maps.LatLng(result[0].y, result[0].x);

              const newMapData = {
                address: data.address,
                y: String(result[0].y),
                x: String(result[0].x),
              };

              setMapDataFn(newMapData);

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
