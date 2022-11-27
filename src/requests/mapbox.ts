const MAPBOX_API_KEY = process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN;
const BASE_URL = 'https://api.mapbox.com/geocoding/v5/mapbox.places';

interface IRequestMapBox {
  fetchCountry: (country: string | string[]) => string;
}

const requests: IRequestMapBox = {
  fetchCountry: (country: string | string[]) =>
    `${BASE_URL}/${country}.json?access_token=${MAPBOX_API_KEY}&types=place`,
};

export default requests;
