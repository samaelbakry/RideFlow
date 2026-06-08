"use client";

import { useQuery } from "@tanstack/react-query";
import { getDrivers } from "@/services/drivers";
import { Driver } from "@/app/page";
import Image from "next/image";

type Props={
  selectedDriver: Driver | null;
  setSelectedDriver: (driver: Driver) => void;
}

export default function NearbyDriver({selectedDriver, setSelectedDriver}:Props ) {
  
  const { data: drivers } = useQuery<Driver[]>({
    queryKey: ["drivers"],
    queryFn: getDrivers,
  });

  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-400 mb-2.5 my-3">
        Nearby drivers
      </p>

      <div className="flex flex-col gap-2">
        {drivers?.map((driver) => (
          <button
            key={driver.id}
            onClick={() => setSelectedDriver(driver)}
            className={`p-3 border rounded-xl text-left transition ${
              selectedDriver?.id === driver.id
                ? "border-gray-900"
                : "border-gray-100 hover:bg-gray-50"
            }`}
          >
            <div className="font-semibold flex items-center gap-4">
              <Image
                src={"/car2.jpg"}
                alt="car-name"
                width={60}
                height={60}
                className="size-12 object-cover rounded-full"
              />{" "}
              {driver.name}
            </div>

            <div className="text-xs text-gray-500">
              {driver.carModel} • ⭐ {driver.rating}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
