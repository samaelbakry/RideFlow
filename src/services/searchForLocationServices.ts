export async function getSearchvalue({ query }: { query: string }) {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${query}, Alexandria&format=jsonv2&limit=5&countrycodes=eg`,
    );
    const data = await response.json();
    console.log(data);
    
    return data;

  } catch (error) {
    console.log(error);
  }
}
export async function getRoute(start, end) {
  const res = await fetch(
    `https://router.project-osrm.org/route/v1/driving/${start.lng},${start.lat};${end.lng},${end.lat}?overview=full&geometries=geojson`
  );

  const data = await res.json();

  return data.routes[0].geometry.coordinates.map(
    ([lng, lat]: [number, number]) => ({
      lat,
      lng,
    })
  );
}