"use client";

import ProtectedRoutes from "@/components/auth/ProtectedRoutes";
import MapView from "@/components/home/MapView";
import RequestRide from "@/components/ride/RequestRide";
import { useCurrentLocation } from "@/hooks/useCurrentLocation";
import { useAppSelector } from "@/store/hooks";
import { useState } from "react";


export type Driver = {
  id: string | number;
  lat: number;
  lng: number;
  name:string,
  rating:string,
  carModel:string
};

export default function Home() {
  const user = useAppSelector((state) => state.auth.user);
  const location = useCurrentLocation()
  const [selectedDriver, setSelectedDriver] = useState<Driver| null>(null);
  const [selectDriverLocation, setSelectDriverLocation] = useState<Driver| null>(null);
  const [tripStarted, setTripStarted] = useState(false);
    const [destinationCoords, setDestinationCoords] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const authUser = user as | { name?: string; firstName?: string; lastName?: string; fullName?: string } | undefined;
  const userName =authUser?.name ||`${authUser?.firstName ?? ""} ${authUser?.lastName ?? ""}`.trim() || authUser?.fullName;

  const initials = userName
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <ProtectedRoutes>
      <main className="h-screen w-full bg-gray-100">
        <div className="grid h-full grid-cols-1 lg:grid-cols-[380px_1fr]">
          <section className="bg-white border-r border-gray-100 flex flex-col p-6 gap-5 overflow-y-auto">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="font-bold text-[19px] text-gray-900 leading-tight">
                  Hi, {userName?.split(" ")[0] || "there"} 👋
                </h1>
                <p className="text-xs text-gray-400 mt-0.5">
                  Book your ride in seconds
                </p>
              </div>
              <div className="w-9 h-9 rounded-full bg-gray-900 text-white text-xs font-semibold flex items-center justify-center flex-shrink-0">
                {initials}
              </div>
            </div>
            <RequestRide 
            destinationCoords={destinationCoords}
            setDestinationCoords={setDestinationCoords} 
            location={location} 
            selectDriverLocation={selectDriverLocation} 
            setSelectDriverLocation={setSelectDriverLocation}  
            selectedDriver={selectedDriver} 
            setSelectedDriver={setSelectedDriver}
            tripStarted={tripStarted}
            setTripStarted={setTripStarted}
            />
          </section>
          <section className="relative bg-gray-100">
            <MapView  
             destinationCoords={destinationCoords}
             selectedDriver={selectedDriver} 
             driverLocation={selectDriverLocation}
             tripStarted={tripStarted}
             />
          </section>
        </div>
      </main>
    </ProtectedRoutes>
  );
}
