"use client";

import { Driver as DriverData } from "@/app/page";
import { useCurrentLocation } from "@/hooks/useCurrentLocation";
import { getDrivers } from "@/services/drivers";
import { useQuery } from "@tanstack/react-query";
import { AdvancedMarker, Map, Polyline } from "@vis.gl/react-google-maps";
import Image from "next/image";

type Driver = {
  id: string | number;
  lat: number;
  lng: number;
};
type Props = {
  selectedDriver: DriverData | null;
  driverLocation: DriverData | null;
  destinationCoords: {
    lat: number;
    lng: number;
  } | null;
  tripStarted:boolean
};

export default function MapView({
  selectedDriver,
  driverLocation,
  destinationCoords,
  tripStarted
}: Props) {
  const location = useCurrentLocation();

  const { data: drivers } = useQuery<Driver[]>({
    queryKey: ["drivers"],
    queryFn: getDrivers,
  });

  return (
    <Map
      defaultCenter={{
        lat: location?.lat || 31.2001,
        lng: location?.lng || 29.9187,
      }}
      defaultZoom={13}
      style={{ width: "100%", height: "100%" }}
      mapId="ride-map"
      disableDefaultUI
      gestureHandling="greedy"
    >
      {location && (
        <AdvancedMarker position={{ lat: location.lat, lng: location.lng }}>
          <div className="relative flex items-center justify-center">
            <span className="absolute w-10 h-10 rounded-full bg-blue-500/20 animate-ping" />
            <span className="absolute w-6 h-6 rounded-full bg-blue-500/30" />
            <span className="relative w-4 h-4 rounded-full bg-blue-600 border-2 border-white shadow-md shadow-blue-500/40" />
          </div>
        </AdvancedMarker>
      )}

      {drivers?.map((driver) => {
        const markPosition =
          driverLocation && selectedDriver?.id === driver.id
            ? { lat: driverLocation.lat, lng: driverLocation.lng }
            : { lat: driver.lat, lng: driver.lng };
        return (
          <AdvancedMarker key={driver.id} position={markPosition}>
            <div
              className={`size-10 rounded-xl flex items-center justify-center ${
                selectedDriver?.id === driver.id
                  ? "bg-gray-400 scale-110"
                  : "bg-gray-900"
              }`}
            >
              <Image src={"/car2.jpg"}
              alt="car-name"
              width={60}
                height={60}
                className="size-12 object-cover rounded-xl" 
               />
            </div>
          </AdvancedMarker>
        );
      })}
      
      {!tripStarted && location && driverLocation && (
  <Polyline
    path={[
      { lat: driverLocation.lat, lng: driverLocation.lng },
      { lat: location.lat, lng: location.lng },
    ]}
    strokeColor="#111827"
    strokeWeight={4}
  />
)}
{tripStarted && location && destinationCoords && (
  <Polyline
    path={[
      { lat: location.lat, lng: location.lng },
      {
        lat: destinationCoords.lat,
        lng: destinationCoords.lng,
      },
    ]}
    strokeColor="#22c55e"
    strokeWeight={5}
  />
)}

      
    </Map>
  );
}
