import { RIDES } from "@/lib/constants";
import Image from "next/image";

type Props = {
    setSelected:React.Dispatch<React.SetStateAction<number>>
    selected:number
}

export default function CarType({setSelected , selected}:Props) {
  return (
    <>
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
              <Image
                src={ride.icon}
                alt={ride.name}
                width={60}
                height={60}
                className="size-12 object-cover"
              />
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
    </>
  )
}
