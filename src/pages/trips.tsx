import NoTrips from '../components/Trips/NoTrips';
import MainLayout from '../layouts/MainLayout';

export default function trips() {
  return (
    <MainLayout title="Tus Viajes - Airbnb">
      <div className="my-20 px-24">
        <NoTrips />
      </div>
    </MainLayout>
  );
}
