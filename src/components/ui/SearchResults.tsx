import { Place, SearchPlace } from "@/types/requestRideType";
import React from "react";
type Props = {
  setDestination: React.Dispatch<React.SetStateAction<string>>;
  setDestinationPlace: React.Dispatch<React.SetStateAction<Place | null>>;
  place: SearchPlace;
  setResults: React.Dispatch<React.SetStateAction<SearchPlace[]>>;
};
export default function SearchResults({
  setDestination,
  setDestinationPlace,
  setResults,
  place,
}: Props) {
  return (
    <>
      <button
        key={place.place_id}
        onClick={() => {
          setDestination(place.display_name);

          setDestinationPlace({
            name: place.display_name,
            lat: Number(place.lat),
            lng: Number(place.lon),
          });

          setResults([]);
        }}
        className="
        flex
        w-full
        items-start
        gap-3
        px-4
        py-3
        text-left
        transition
        hover:bg-gray-50
        border-b
        border-gray-100
        last:border-b-0
      "
      >
        <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
          📍
        </div>

        <div className="min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate">
            {place.name || "Location"}
          </p>

          <p className="text-xs text-gray-500 line-clamp-2">
            {place.display_name}
          </p>
        </div>
      </button>
    </>
  );
}
