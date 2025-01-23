// import { NextApiRequest, NextApiResponse } from "next";
// import { fetchPropertyDetails } from "@/lib/zillowClient";
// import { db } from "@/server/db";
// import { properties, propertyDetails } from "@/server/schema";
// import { eq } from "drizzle-orm"; // Import the equality operator

// // Define the type for the data returned by `fetchPropertyDetails`
// interface PropertyData {
//     title?: string;
//     description?: string;
//     price?: number;
//     address?: {
//         city?: string;
//     };
//     image?: { url: string }[];
//     bedrooms?: number;
//     bathrooms?: number;
//     livingArea?: number;
//     propertyType?: string;
//     walkAndTransitScore?: {
//         walkScore?: number;
//         transitScore?: number;
//         bikeScore?: number;
//     };
//     yearBuilt?: number;
//     zestimate?: number;
//     rentEstimate?: number;
// }

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//     let { zpid } = req.query;

//     // Normalize zpid (ensure it is a string)
//     if (Array.isArray(zpid)) {
//         zpid = zpid[0];
//     }

//     if (!zpid || typeof zpid !== "string") {
//         return res.status(400).json({ error: "Valid Property ID (zpid) is required" });
//     }

//     try {
//         // Check if the property is already in the database
//         const existingProperty = await db
//             .select()
//             .from(properties)
//             .where(eq(properties.zpid, zpid));

//         if (existingProperty.length > 0) {
//             // Fetch extended data if available
//             const extendedDetails = await db
//                 .select()
//                 .from(propertyDetails)
//                 .where(eq(propertyDetails.zpid, zpid));

//             return res.status(200).json({ ...existingProperty[0], extendedDetails });
//         }

//         // Fetch data from Zillow API if not in DB
//         const propertyData: PropertyData = await fetchPropertyDetails(zpid);

//         // Normalize data from Zillow API
//         const normalizedPropertyData = {
//             zpid,
//             title: propertyData.title || "N/A",
//             description: propertyData.description || "N/A",
//             price: propertyData.price || 0,
//             location: propertyData.address?.city || "Unknown", // Access `city` safely
//             imageUrl: propertyData.image?.[0]?.url || "",
//             bedrooms: propertyData.bedrooms || 0,
//             bathrooms: propertyData.bathrooms || 0,
//             sqft: propertyData.livingArea || 0,
//             propertyType: propertyData.propertyType || "unknown",
//         };

//         // Insert core data into the database
//         const newProperty = await db.insert(properties).values(normalizedPropertyData);

//         // Normalize extended details
//         const normalizedExtendedDetails = {
//             zpid,
//             walkScore: propertyData.walkAndTransitScore?.walkScore || 0,
//             transitScore: propertyData.walkAndTransitScore?.transitScore || 0,
//             bikeScore: propertyData.walkAndTransitScore?.bikeScore || 0,
//             yearBuilt: propertyData.yearBuilt || null,
//             zestimate: propertyData.zestimate || 0,
//             rentalEstimate: propertyData.rentEstimate || 0,
//         };

//         // Insert extended details into `propertyDetails`
//         await db.insert(propertyDetails).values(normalizedExtendedDetails);

//         return res.status(200).json({
//             ...newProperty,
//             extendedDetails: normalizedExtendedDetails,
//         });
//     } catch (error) {
//         console.error("Error fetching property details:", error);
//         return res.status(500).json({ error: "Failed to fetch property details" });
//     }
// }
