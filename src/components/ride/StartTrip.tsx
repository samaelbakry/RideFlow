"use client";

import { Driver } from "@/app/page";
import { traceMovement } from "@/lib/helpers";
import { useState } from "react";
import { toast } from "sonner";

type Props = {
  driverLocation?: Driver | null;
  setDriverLocation?: React.Dispatch<React.SetStateAction<Driver | null>>;
  destinationCoords?: { lat: number; lng: number } | null;
  userLocation?: { lat: number; lng: number } | null;
  onComplete?: () => void;
  onStart?: () => void;
};

export default function StartTrip({
  driverLocation,
  destinationCoords,
  setDriverLocation,
  onComplete,
  onStart,
}: Props) {
  const [status, setStatus] = useState<"idle" | "moving" | "completed">("idle");

  function handleStartTrip() {
    if (!driverLocation || !destinationCoords) return;

    setStatus("moving");
    onStart?.();

    const interval = setInterval(() => {
      setDriverLocation?.((prev) => {
        if (!prev) return null;

        const next = traceMovement(prev, destinationCoords);

        const distance = Math.hypot(
          next.lat - destinationCoords.lat,
          next.lng - destinationCoords.lng
        );

        const arrived = distance < 0.0005;

        if (arrived) {
          clearInterval(interval);

          const finalPosition = {
            ...prev,
            lat: destinationCoords.lat,
            lng: destinationCoords.lng,
          };
          setDriverLocation?.(() => finalPosition);
          setStatus("completed");
          toast.success("Trip completed successfully 🎉");

          setTimeout(() => {
            onComplete?.();
          }, 2000);
        }

        return {
          ...prev,
          lat: next.lat,
          lng: next.lng,
        };
      });
    }, 1000);
  }

  return (
    <div className="mt-4">
      {status === "moving" && (
        <div className="mt-4 rounded-2xl bg-white p-5 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-gray-900">On your way</h3>
              <p className="text-sm text-gray-500">Heading to destination</p>
            </div>

            <div className="h-12 w-12 rounded-full bg-blue-50 flex items-center justify-center">
              <div className="h-4 w-4 rounded-full bg-blue-600 animate-ping" />
            </div>
          </div>

          <div className="mt-5">
            <div className="flex justify-between text-xs text-gray-500 mb-2">
              <span>Trip Progress</span>
              <span>In Progress</span>
            </div>

            <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
              <div className="h-full w-2/3 bg-black animate-pulse" />
            </div>
          </div>

          <div className="mt-5 flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
              🚘
            </div>

            <div>
              <p className="font-medium">{driverLocation?.name}</p>
              <p className="text-sm text-gray-500">
                {driverLocation?.carModel}
              </p>
            </div>

            <div className="ml-auto">
              <span className="text-sm font-medium">
                ⭐ {driverLocation?.rating}
              </span>
            </div>
          </div>
        </div>
      )}

     
      {status === "idle" && (
        <div className="mt-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">Driver arrived</h3>
            <span className="text-xs text-green-600 font-medium">Waiting</span>
          </div>

          <div className="mt-4 flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
              🚘
            </div>

            <div>
              <p className="font-medium text-gray-900">
                {driverLocation?.name}
              </p>
              <p className="text-sm text-gray-500">
                {driverLocation?.carModel}
              </p>
            </div>

            <div className="ml-auto text-sm font-medium">
              ⭐ {driverLocation?.rating}
            </div>
          </div>

          <div className="mt-4 rounded-xl bg-gray-50 p-3">
            <p className="text-xs text-gray-400">Driver is waiting for you</p>
          </div>

          <button
            onClick={handleStartTrip}
            className="mt-4 w-full rounded-xl bg-black py-3 text-white font-medium"
          >
            Start Ride
          </button>
        </div>
      )}

    
      {status === "completed" && (
        <div className="mt-4 rounded-2xl bg-white p-6 shadow-sm border border-green-200">
          <div className="flex flex-col items-center text-center">
            <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-8 h-8 text-green-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
            </div>

            <h3 className="mt-4 text-lg font-semibold text-gray-900">
              Trip Completed
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              You have arrived at your destination.
            </p>

            <button className="mt-5 w-full rounded-xl bg-black py-3 text-white font-medium">
              Rate Driver
            </button>
          </div>
        </div>
      )}
    </div>
  );
}