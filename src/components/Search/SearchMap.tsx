import { useRef, useState, useEffect } from 'react';
import ReactMapGL, { Marker, ViewState, MapRef } from 'react-map-gl';
import { IoLocationSharp } from 'react-icons/io5';
import Room from '../../interfaces/Room';
import { useRouter } from 'next/router';

interface ISearchMapProps {
  zoneLocation: {
    latitude: number;
    longitude: number;
  };
  rooms?: Room[];
}

export default function SearchMap({ zoneLocation, rooms }: ISearchMapProps) {
  const router = useRouter();
  const mapRef = useRef<MapRef | null>(null);
  const [viewPort, setViewPort] = useState<ViewState>({
    latitude: zoneLocation.latitude,
    longitude: zoneLocation.longitude,
    zoom: 8.2,
    bearing: 0,
    pitch: 0,
    padding: {
      bottom: 0,
      left: 0,
      right: 0,
      top: 0,
    },
  });

  useEffect(() => {
    setViewPort((prev) => ({
      ...prev,
      latitude: zoneLocation.latitude,
      longitude: zoneLocation.longitude,
    }));
  }, [router.query]);

  return (
    <div className="hidden sm:flex fixed bottom-0-0 right-0 w-[45%] h-full flex-[0.5_1_0%]">
      <ReactMapGL
        {...viewPort}
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        style={{ height: 'calc(100vh - 80px)', width: '100%' }}
        ref={(instance) => (mapRef.current = instance)}
        onMove={(e) => setViewPort(e.viewState)}
        minZoom={3}
        bearing={0}
      >
        {rooms &&
          rooms?.map((room, index) => (
            <Marker
              key={index}
              latitude={parseInt(room?.lat || '0')}
              longitude={parseInt(room?.long || '0')}
              anchor="bottom"
            >
              <IoLocationSharp className="w-8 h-8 text-red-500" />
            </Marker>
          ))}
      </ReactMapGL>
    </div>
  );
}
