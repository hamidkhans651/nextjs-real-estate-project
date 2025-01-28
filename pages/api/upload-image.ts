import type { NextApiRequest, NextApiResponse } from "next";
import { imageKit } from "@/lib/imagekit";
import { db } from "@/server/db"; // Drizzle database instance
import { properties } from "@/server/schema";
import { v4 as uuidv4 } from "uuid"; // Import UUID for fallback zpid generation

interface UploadResponse {
  success: boolean;
  uploadedImages?: Array<{
    id: string;
    fileName: string;
    fileUrl: string;
    description?: string;
  }>;
  error?: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { files, details } = req.body;

    if (!files || !Array.isArray(files)) {
      return res.status(400).json({ success: false, error: "Invalid files input." });
    }

    if (!details) {
      return res.status(400).json({ success: false, error: "Details are required." });
    }

    try {
      const uploadedImages = await Promise.all(
        files.map(async (file: string, index: number) => {
          // Upload image to ImageKit
          const uploadResponse = await imageKit.upload({
            file,
            fileName: `image-${Date.now()}-${index}`,
            folder: "uploads",
          });

          // Generate zpid (fallback to UUID if not provided)
          const zpid = details.zpid || uuidv4();

          // Insert property into the database
          const [newImage] = await db
            .insert(properties)
            .values({
              zpid,
              title: details.title,
              description: details.description,
              propdetails: details.propdetails,
              price: details.price,
              location: details.location,
              imageUrl: uploadResponse.url,
              bedrooms: details.bedrooms,
              bathrooms: details.bathrooms,
              sqft: details.sqft,
              LotSize: details.sqft,
              HOADues: details.HOADues,
              YearBuilt: details.YearBuilt,
              GarageSqFt: details.GarageSqFt,
              BasementSqFt: details.BasementSqFt,
              propertyType: details.propertyType,
              isForSale: details.isForSale,
              basement: details.basement || null,
              floorCovering: details.floorCovering?.join(",") || null,
              coolingType: details.coolingType?.join(",") || null,
              heatingType: details.heatingType?.join(",") || null,
              heatingFuel: details.heatingFuel?.join(",") || null,
              rooms: details.rooms?.join(",") || null,
              indoorFeatures: details.indoorFeatures?.join(",") || null,
              buildingAmenities: details.buildingAmenities?.join(",") || null,
              architecturalStyle: details.architecturalStyle || null,
              exterior: details.exterior?.join(",") || null,
              outdoorAmenities: details.outdoorAmenities?.join(",") || null,
              parking: details.parking?.join(",") || null,
              roof: details.roof?.join(",") || null,
              view: details.view?.join(",") || null,
            })
            .returning();

          // Return uploaded image details
          return {
            id: newImage.id,
            fileName: uploadResponse.name,
            fileUrl: uploadResponse.url,
            title: details.title,
            description: details.description,
          };
        })
      );

      // Return success response
      res.status(200).json({ success: true, uploadedImages });
    } catch (error) {
      console.error("Error uploading images or inserting data:", error);
      res.status(500).json({ success: false, error: "Failed to upload images or insert data." });
    }
  } else {
    // Handle unsupported HTTP methods
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
