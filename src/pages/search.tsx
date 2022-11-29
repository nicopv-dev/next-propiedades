import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { ParsedUrlQuery } from 'querystring';
import Error from '../components/Error';
import Results from '../components/Search/Results';
import SearchMap from '../components/Search/SearchMap';
import Room from '../interfaces/Room';
import MainLayout from '../layouts/MainLayout';
import mapboxRequests from '../requests/mapbox';

interface ISearchProps {
  query: ParsedUrlQuery;
  results?: Room[];
  error: boolean;
  zone: {
    center: number[];
    place_name: string;
  };
}

function Search({ results, query, error, zone }: ISearchProps) {
  return (
    <MainLayout title={`Airbnb - Alojamiento en ${query?.q || ''}`}>
      <div className="pl-4 pr-4 sm:pr-0">
        {!error ? (
          <div className="flex gap-10 relative w-full">
            {/* results */}
            <Results results={results} />
            {/* map */}
            {zone && (
              <SearchMap
                zoneLocation={{
                  latitude: zone?.center[1] || 0,
                  longitude: zone?.center[0] || 0,
                }}
                rooms={results}
              />
            )}
          </div>
        ) : (
          <Error title="No hay resultados de busqueda" />
        )}
      </div>
    </MainLayout>
  );
}

export default Search;

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const { query } = ctx;
  try {
    const results = await fetch(
      `${process.env.HOST_URL}/api/search/${query?.q}`
    );
    const data = await results.json();
    const zone = await fetch(mapboxRequests.fetchCountry(query?.q || '')).then(
      (res) => res.json()
    );
    return {
      props: {
        query,
        results: data.results,
        error: false,
        zone: zone.features[0],
      },
    };
  } catch (err) {
    return {
      query,
      results: [],
      error: true,
    };
  }
};
