export default function NoTrips() {
  return (
    <div className="flex flex-col gap-4 divide-y py-10">
      <div className="py-4">
        <h1 className="text-3xl font-bold">Viajes</h1>
      </div>

      <div className="py-8">
        <h2 className="text-xl font-bold">Todavia no tienes viajes</h2>
        <p className="font-extralight">
          Saca las maletas del clóset y comienza a planear tu próxima aventura
        </p>
      </div>
    </div>
  );
}
