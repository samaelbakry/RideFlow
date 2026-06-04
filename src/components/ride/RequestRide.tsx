"use client";
import { Driver } from "@/app/page";
import { createRide } from "@/services/riders";
import { useAppSelector } from "@/store/hooks";
import { useState } from "react";
import NearbyDriver from "./NearbyDriver";

const RIDES = [
  {
    name: "UberX",
    price: 50,
    icon: "🚗",
    eta: "3 min away",
    duration: "~18 min",
  },
  {
    name: "Comfort",
    price: 80,
    icon: "🚙",
    eta: "5 min away",
    duration: "~18 min",
  },
  {
    name: "Premium",
    price: 120,
    icon: "🚘",
    eta: "7 min away",
    duration: "~18 min",
  },
];

export default function RequestRide({
  selectedDriver,
  setSelectedDriver,
}: {
  selectedDriver: Driver | null;
  setSelectedDriver: (driver: Driver) => void;
}) {
  const user = useAppSelector((state) => state.auth.user);
  const [selected, setSelected] = useState(0);
  const [destination, setDestination] = useState("");
  const [pickup, setPickUp] = useState("");
  const [rideStatus, setRideStatus] = useState("idle");

  async function handleRideRequest() {
    if (!pickup || !destination || !selectedDriver) return;

    try {
      setRideStatus("searching");

      const ride = {
        userId: user?.id,
        pickup,
        destination,
        driverId: selectedDriver.id,
        vehicleType: RIDES[selected].name,
        vehiclePrice: RIDES[selected].price,
        status: "pending",
        createdAt: new Date().toISOString(),
      };

      await createRide(ride);

      setRideStatus("driver-assigned");
    } catch (err) {
      console.log(err);
      setRideStatus("idle");
    }
  }

  return (
    <>
      <div className="bg-gray-50 rounded-xl border border-gray-100 divide-y divide-gray-100">
        <div className="flex items-center gap-3 px-4 py-3">
          <span className="w-2.5 h-2.5 rounded-full bg-gray-900 shrink-0" />
          <input
            className="flex-1 bg-transparent text-sm font-medium text-gray-800 placeholder-gray-400 outline-none"
            placeholder="Your current location"
            value={pickup}
            onChange={(e) => setPickUp(e.target.value)}
          />
          <button
            className="w-7 h-7 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-500 hover:bg-gray-50 transition"
            aria-label="Swap locations"
          >
            ⇅
          </button>
        </div>
        <div className="flex items-center gap-3 px-4 py-3">
          <span className="w-2.5 h-2.5 rounded-full border-2 border-gray-900 shrink-0" />
          <input
            className="flex-1 bg-transparent text-sm font-medium text-gray-800 placeholder-gray-400 outline-none"
            placeholder="Where are you going?"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
        </div>
      </div>
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-400 mb-2.5">
          Choose ride type
        </p>
        <div className="flex flex-col gap-2">
          {RIDES.map((ride, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl border text-left transition ${
                selected === i
                  ? "border-gray-900 border-[1.5px]"
                  : "border-gray-100 hover:bg-gray-50 hover:border-gray-200"
              }`}
            >
              <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-xl shrink-0">
                {ride.icon}
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-900">
                  {ride.name}
                </p>
                <p className="text-[11px] text-gray-400 mt-0.5">{ride.eta}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-900">
                  {ride.price} EGP
                </p>
                <p className="text-[10px] text-gray-400">{ride.duration}</p>
              </div>
              {selected === i && (
                <div className="w-4 h-4 rounded-full bg-gray-900 flex items-center justify-center ml-1 shrink-0">
                  <span className="text-white text-[9px]">✓</span>
                </div>
              )}
            </button>
          ))}
        </div>
        <NearbyDriver
          selectedDriver={selectedDriver}
          setSelectedDriver={setSelectedDriver}
        />
      </div>
      {rideStatus === "idle" && (
        <button
          onClick={handleRideRequest}
          disabled={!pickup || !destination || !selectedDriver}
          className="mt-auto bg-gray-900 text-white py-3.5
             rounded-xl text-sm font-semibold hover:bg-gray-800
             disabled:opacity-50
             active:scale-[0.99] transition flex items-center justify-center gap-2"
        >
          📍 Request Ride
        </button>
      )}

      {rideStatus === "searching" && <div>🔎 Finding nearby drivers...</div>}

      {rideStatus === "driver-assigned" && (
        <div>🚗 Driver assigned successfully</div>
      )}
    </>
  );
}
