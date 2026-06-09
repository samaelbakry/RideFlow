import { getSearchvalue } from "@/services/searchForLocationServices";
import { Place, SearchPlace } from "@/types/requestRideType";
import React, { ChangeEvent, useState } from "react";
import SearchResults from "./SearchResults";

type Props = {
  setDestination: React.Dispatch<React.SetStateAction<string>>;
  destination: string;
  pickup: string;
  setPickUp: React.Dispatch<React.SetStateAction<string>>;
  setDestinationPlace: React.Dispatch<React.SetStateAction<Place | null>>;
};
export default function PickUp({
  destination,
  setDestination,
  pickup,
  setPickUp,
  setDestinationPlace,
}: Props) {
  const [results, setResults] = useState<SearchPlace[]>([]);

  async function handleChangeDestination(
    e: React.ChangeEvent<HTMLInputElement>,
  ) {
    const value = e.target.value;

    setDestination(value);

    if (value.length < 3) {
      setResults([]);
      return;
    }

    const data = await getSearchvalue({ query: value });

    setResults(data || []);
  }

  return (
    <>
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
      <div className="flex items-center gap-3 px-4 py-3 relative">
        <span className="w-2.5 h-2.5 rounded-full border-2 border-gray-900 shrink-0" />
        <input
          className="flex-1 bg-transparent text-sm font-medium text-gray-800 placeholder-gray-400 outline-none"
          placeholder="Where are you going?"
          value={destination}
          onChange={handleChangeDestination}
        />
        {results.length > 0 && (
          <>
            <div className="absolute top-full left-0 right-0 z-50 mt-2 rounded-xl border bg-white shadow-lg">
              {results.map((place) => (
                <React.Fragment key={place.place_id}>
                  <SearchResults
                    place={place}
                    setResults={setResults}
                    setDestination={setDestination}
                    setDestinationPlace={setDestinationPlace}
                  />
                </React.Fragment>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}
