import axios from "axios";

const ZILLOW_API_HOST = "zillow-com1.p.rapidapi.com";
const ZILLOW_API_KEY = process.env.ZILLOW_API_KEY; // Store API Key securely in .env.local

const zillowClient = axios.create({
    baseURL: `https://${ZILLOW_API_HOST}`,
    headers: {
        "x-rapidapi-key": ZILLOW_API_KEY,
        "x-rapidapi-host": ZILLOW_API_HOST,
    },
});

export const fetchPropertyDetails = async (zpid) => {
    const { data } = await zillowClient.get(`/property`, { params: { zpid } });
    return data;
};

export const fetchAdditionalData = async (endpoint, params) => {
    const { data } = await zillowClient.get(endpoint, { params });
    return data;
};
