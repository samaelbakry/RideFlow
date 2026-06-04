import { api } from "@/lib/axios";

export async function getDrivers() {
    const response = await api.get("/drivers")
    return response.data
}