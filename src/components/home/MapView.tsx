"use client";

import { useCurrentLocation } from "@/hooks/useCurrentLocation";
import { getDrivers } from "@/services/drivers";
import { useQuery } from "@tanstack/react-query";
import { AdvancedMarker, Map } from "@vis.gl/react-google-maps";
import { Driver as DriverData } from "@/app/page";
import { Car, CarFront } from "lucide-react";

type Driver = {
  id: string | number;
  lat: number;
  lng: number;
};

export default function MapView({
  selectedDriver,
}: {
  selectedDriver: DriverData | null;
}) {
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

      {drivers?.map((driver) => (
        <AdvancedMarker
          key={driver.id}
          position={{ lat: driver.lat, lng: driver.lng }}
        >
          <div
            className={`size-10 rounded-xl flex items-center justify-center ${
              selectedDriver?.id === driver.id
                ? "bg-gray-400 scale-110"
                : "bg-gray-900"
            }`}
          >
            <CarFront className="text-white" />
          </div>
        </AdvancedMarker>
      ))}
    </Map>
  );
}
