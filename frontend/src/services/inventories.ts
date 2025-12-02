import axios from "axios";

const API_BASE = import.meta.env.VITE_SCOPE + "/inventories";

export const getInventories = (body: {
    page: number | 0;
    locationId: number | undefined;
    sort: string | undefined,
    direction: string | undefined,
}) => { 
    const params = new URLSearchParams({
        page: String(body.page ?? ""),
        locationId: String(body.locationId ?? ""),
        sort: body.sort ?? "",
        direction: body.direction ?? "",
    }).toString();

    return axios.get(`${API_BASE}?${params}`);
}

export const createInventories = (body: {
  name: string;
  locationId: number,
  price: number  
}) => axios.post(`${API_BASE}/add`, body);

export const deleteInventory = (body: {
  id: number
}) => axios.delete(`${API_BASE}/${body.id}`);
