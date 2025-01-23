import axios from "axios";

const ZILLOW_API_HOST = "zillow-com1.p.rapidapi.com";
const ZILLOW_API_KEY = process.env.ZILLOW_API_KEY as string; // Ensure the API key is a string

// Create an Axios instance for Zillow API
const zillowClient = axios.create({
    baseURL: `https://${ZILLOW_API_HOST}`,
    headers: {
        "x-rapidapi-key": ZILLOW_API_KEY,
        "x-rapidapi-host": ZILLOW_API_HOST,
    },
});

// Type for the property details response (you can refine this based on the API's response structure)
export interface PropertyDetails {
    zpid: string;
    address?: string;
    price?: number;
    bedrooms?: number;
    bathrooms?: number;
    livingArea?: number;
    [key: string]: any; // Allow additional properties
}

// Type for additional API data
export interface AdditionalData {
    [key: string]: any; // Use a flexible type for generic responses
}

// Fetch property details by ZPID
export const fetchPropertyDetails = async (zpid: string): Promise<PropertyDetails> => {
    const { data } = await zillowClient.get<PropertyDetails>(`/property`, { params: { zpid } });
    return data;
};

// Fetch additional data from an endpoint
export const fetchAdditionalData = async (
    endpoint: string,
    params: Record<string, any>
): Promise<AdditionalData> => {
    const { data } = await zillowClient.get<AdditionalData>(endpoint, { params });
    return data;
};
