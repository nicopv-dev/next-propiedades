import ReactMapGL, { Marker, ViewState, MapRef } from 'react-map-gl';
import { useRef, useState } from 'react';
import { IoLocationSharp } from 'react-icons/io5';

interface IMapProps {
  latitude: number;
  longitude: number;
}

export default function Map({ latitude, longitude }: IMapProps) {
  const mapRef = useRef<MapRef | null>(null);
  const [viewPort, setViewPort] = useState<ViewState>({
    latitude,
    longitude,
    zoom: 5,
    bearing: 0,
    pitch: 0,
    padding: {
      bottom: 0,
      left: 0,
      right: 0,
      top: 0,
    },
  });

  return (
    <div className="py-12 w-full">
      <ReactMapGL
        {...viewPort}
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        style={{ height: '50vh', width: '100%', borderRadius: '1rem' }}
        minZoom={10}
        maxZoom={20}
        ref={(instance) => (mapRef.current = instance)}
        onMove={(e) => setViewPort(e.viewState)}
      >
        <Marker latitude={latitude} longitude={longitude} anchor="bottom">
          <IoLocationSharp className="w-10 h-10 text-red-500" />
        </Marker>
      </ReactMapGL>
    </div>
  );
}
