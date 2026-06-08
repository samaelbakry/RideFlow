import { Driver } from "@/app/page";

export type RequestRideProps = {
  selectedDriver: Driver | null;
  setSelectedDriver: (driver: Driver) => void;
  selectDriverLocation: Driver | null;
  setSelectDriverLocation: React.Dispatch<React.SetStateAction<Driver | null>>;
  location: {
    lat: number;
    lng: number;
  } | null;
  destinationCoords: {
    lat: number;
    lng: number;
  } | null;

  setDestinationCoords: React.Dispatch<
    React.SetStateAction<{
      lat: number;
      lng: number;
    } | null>
  >;
  tripStarted: boolean;

  setTripStarted: React.Dispatch<React.SetStateAction<boolean>>;
};