"use client";

import { Driver } from "@/app/page";
import { traceMovement } from "@/lib/helpers";
import { useState } from "react";

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
  userLocation,
  onComplete,
  onStart
}: Props) {
  const [status, setStatus] = useState<"idle" | "moving" | "completed">("idle");

  function handleStartTrip() {
    if (!driverLocation || !destinationCoords) return;

    setStatus("moving");
    onStart?.()

    const interval = setInterval(() => {
      setDriverLocation?.((prev) => {
        if (!prev) return null;

        const next = traceMovement(prev, destinationCoords);

        const arrived =
          Math.abs(next.lat - destinationCoords.lat) < 0.0001 &&
          Math.abs(next.lng - destinationCoords.lng) < 0.0001;

        if (arrived) {
          clearInterval(interval);

          
          setTimeout(() => {
            setStatus("completed");
            onComplete?.()
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
      {status === "idle" && (
        <button
          onClick={handleStartTrip}
          className="w-full bg-gray-900 text-white py-3 rounded-xl font-semibold hover:bg-gray-800"
        >
          🚗 Start Trip
        </button>
      )}

      {status === "moving" && (
        <div className="text-sm text-gray-600 flex items-center gap-2">
          <span className="animate-spin">⏳</span>
          Trip in progress...
        </div>
      )}

      {status === "completed" && (
        <div className="text-green-600 font-semibold">🎉 Trip Completed</div>
      )}
    </div>
  );
}
