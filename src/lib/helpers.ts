export function traceMovement(current:{lat:number , lng:number} , target:{lat:number , lng:number} , step=0.0005){

    const latDiff= target.lat - current.lat
    const lngDiff= target.lng - current.lng

    const distence = Math.sqrt(latDiff * latDiff + lngDiff *lngDiff)

    if(distence < step) return target

    return { lat : current.lat + (latDiff / distence) * step ,
             lng :current.lng + (lngDiff / distence ) * step
           }
}