"use client";

import { traceMovement } from "@/lib/helpers";
import { createRide } from "@/services/riders";
import { useAppSelector } from "@/store/hooks";
import { useState } from "react";
import {  RIDES } from "../../lib/constants";
import NearbyDriver from "./NearbyDriver";
import StartTrip from "./StartTrip";
import PickUp from "../ui/PickUp";
import CarType from "../ui/CarType";
import { Place, RequestRideProps } from "@/types/requestRideType";
import { toast } from "sonner";
import { Driver } from "@/app/page";
import { AnimatePresence, motion } from "framer-motion";

type RideStatus = "idle" | "on-way" | "arrived";

export default function RequestRide({
  selectedDriver,
  setSelectedDriver,
  setSelectDriverLocation,
  location,
  selectDriverLocation,
  destinationCoords,
  setDestinationCoords,
  setTripStarted,
}: RequestRideProps) {
  const user = useAppSelector((state) => state.auth.user);

  const [selected, setSelected] = useState(0);
  const [destination, setDestination] = useState("");
  const [pickup, setPickUp] = useState("");
  const [destinationPlace, setDestinationPlace] =
  useState<Place | null>(null);

  const [rideStatus, setRideStatus] = useState<RideStatus>("idle");

  const showRideOptions = pickup && destination;
  const showRequestButton = showRideOptions && selectedDriver;

  function handleDriverSelect(driver: Driver) {
    setSelectedDriver(driver);
   setTimeout(() => {
  toast.success("Driver accepted your ride 🚗");
}, 1000);
  }

  async function handleRideRequest() {
    if (!pickup || !destination || !selectedDriver) return;

    if(!destinationPlace) return

    setDestinationCoords({
      lat:destinationPlace.lat,
      lng:destinationPlace.lng
    })

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

    try {
      await createRide(ride);
      setRideStatus("on-way");
    } catch {
      toast.error("Failed to request ride");
    }

    setSelectDriverLocation(selectedDriver);

    if (!location) return;

    const interval = setInterval(() => {
      setSelectDriverLocation((prev) => {
        if (!prev) return null;

        const nextPosition = traceMovement(
          { lat: prev.lat, lng: prev.lng },
          { lat: location.lat, lng: location.lng },
        );

        const arrived =
          Math.abs(nextPosition.lat - location.lat) < 0.0001 &&
          Math.abs(nextPosition.lng - location.lng) < 0.0001;

        if (arrived) {
          clearInterval(interval);

          setTimeout(() => {
            setRideStatus("arrived");
          }, 300);
        }

        return {
          ...prev,
          lat: nextPosition.lat,
          lng: nextPosition.lng,
        };
      });
    }, 1000);
  }

  return (
    <>
      {rideStatus === "idle" && (
        <div className="bg-gray-50 rounded-xl border border-gray-100 divide-y">
          <PickUp
            pickup={pickup}
            setPickUp={setPickUp}
            destination={destination}
            setDestination={setDestination}
            setDestinationPlace={setDestinationPlace}
          />
        </div>
      )}

      <AnimatePresence>
        {showRideOptions && rideStatus === "idle" && (
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35 }}
            className="overflow-hidden"
          >
            <p className="text-[11px] font-semibold uppercase text-gray-400 my-3">
              Choose ride type
            </p>

            <CarType selected={selected} setSelected={setSelected}  />

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                delay: 0.15,
                duration: 0.3,
              }}
            >
              <NearbyDriver
                selectedDriver={selectedDriver}
                setSelectedDriver={handleDriverSelect}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {showRequestButton && rideStatus === "idle" && (
        <button
          onClick={handleRideRequest}
          className="mt-4 bg-black text-white py-3 rounded-xl w-full"
        >
          Request Ride
        </button>
      )}

      {rideStatus === "on-way" && (
        <motion.div
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          className="
      mt-6
      text-center
      text-gray-500
    "
        >
          Driver is on the way...
        </motion.div>
      )}

      {rideStatus === "arrived" && (
        <>
          <motion.div
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            className=" mt-6 text-center text-gray-500"
          >
            Driver is here!
          </motion.div>
          <StartTrip
            driverLocation={selectDriverLocation}
            setDriverLocation={setSelectDriverLocation}
            destinationCoords={destinationCoords}
            userLocation={location}
            onStart={() => setTripStarted(true)}
            onComplete={() => {
              setTimeout(() => {
                setRideStatus("idle");
                setSelectedDriver(null!);
                setSelectDriverLocation(null);
                setDestinationCoords(null);
                setTripStarted(false);
                setPickUp("");
                setDestination("");
              }, 3000);
            }}
          />
        </>
      )}
    </>
  );
}
