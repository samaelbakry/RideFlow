import { api } from "@/lib/axios";

export async function createRide(data:unknown) {
    const res = await api.post("/rides" , data)
    return res.data
}