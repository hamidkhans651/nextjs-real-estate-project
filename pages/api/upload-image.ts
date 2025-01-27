// pages/api/upload-image.ts
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
          const uploadResponse = await imageKit.upload({
            file,
            fileName: `image-${Date.now()}-${index}`,
            folder: "uploads",
          });

          // Generate zpid (ensure you have a valid zpid source, or use a UUID as a fallback)
          const zpid = details.zpid || uuidv4();

          const [newImage] = await db.insert(properties).values({
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
            propertyType: details.propertyType,
            isForSale: details.isForSale,
            appliances: details.appliances, // Save appliances
          }).returning();
          

          return {
            id: newImage.id,
            fileName: uploadResponse.name,
            fileUrl: uploadResponse.url,
            title: details.title,
            description: details.description,
          };
        })
      );

      res.status(200).json({ success: true, uploadedImages });
    } catch (error) {
      console.error("Error uploading images:", error);
      res.status(500).json({ success: false, error: "Failed to upload images." });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
