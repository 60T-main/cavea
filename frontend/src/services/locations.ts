import axios from "axios";

const API_BASE = import.meta.env.VITE_SCOPE + "/locations";

export const getLocations = () => { 
    return axios.get(API_BASE);
}
export const getStatistics = () => { 
    return axios.get(API_BASE+"/statistics");
}