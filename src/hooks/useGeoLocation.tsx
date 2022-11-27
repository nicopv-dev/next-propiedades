import { useState, useEffect } from 'react';

interface ILocation {
  latitude: number;
  longitude: number;
}

export default function useGeoLocation() {
  const [location, setLocation] = useState<ILocation | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }, [location]);

  return location;
}
