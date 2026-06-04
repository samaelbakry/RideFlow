"use client";

import { useCurrentLocation } from "@/hooks/useCurrentLocation";
import { getDrivers } from "@/services/drivers";
import { useQuery } from "@tanstack/react-query";
import { AdvancedMarker, Map } from "@vis.gl/react-google-maps";

export default function MapView() {
  const location = useCurrentLocation();

  const { data: drivers } = useQuery({
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
          <div className="group relative cursor-pointer">
            
            <div className="
              w-9 h-9 rounded-xl bg-gray-900 border border-white/10
              flex items-center justify-center
              shadow-lg shadow-black/30
              transition-transform duration-150
              group-hover:scale-110
            ">
              <span className="text-base leading-none">🚗</span>
            </div>
           
            <div className="
              absolute -bottom-1.5 left-1/2 -translate-x-1/2
              w-2 h-2 bg-gray-900 rotate-45
              border-r border-b border-white/10
            " />
          </div>
        </AdvancedMarker>
      ))}
    </Map>
  );
}