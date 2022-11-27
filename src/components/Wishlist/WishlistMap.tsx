import { useState, useRef, useEffect } from 'react';
import { IoLocationSharp } from 'react-icons/io5';
import ReactMapGL, { Marker, ViewState, MapRef } from 'react-map-gl';
import Zone from '../../interfaces/Zone';

interface IWishlistProps {
  zone: Zone;
}

export default function WishlistMap({ zone }: IWishlistProps) {
  const mapRef = useRef<MapRef | null>(null);
  const [viewPort, setViewPort] = useState<ViewState>({
    latitude: zone.latitude,
    longitude: zone.longitude,
    zoom: 10,
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
      latitude: zone.latitude,
      longitude: zone.longitude,
    }));
  }, [zone]);

  return (
    <div className="fixed top-0 right-0 w-2/5 h-full pt-20">
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
        <Marker
          latitude={zone.latitude}
          longitude={zone.longitude}
          anchor="bottom"
        >
          <IoLocationSharp className="w-10 h-10 text-red-500" />
        </Marker>
      </ReactMapGL>
    </div>
  );
}
