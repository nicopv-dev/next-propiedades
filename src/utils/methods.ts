import haversine from 's-haversine';

export const formatNumber = (price?: number): string =>
  String(price).replace(/\B(?=(\d{3})+(?!\d))/g, '.');

interface ILocation {
  latitude: number;
  longitude: number;
}

export const getDistance = (
  location1: ILocation,
  location2: ILocation
): string => {
  return formatNumber(
    Math.trunc(
      haversine.distance(
        [location1.latitude, location1.longitude],
        [location2.latitude, location2.longitude]
      ) / 1000
    )
  );
};
