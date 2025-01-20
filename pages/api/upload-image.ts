// pages/api/upload-image.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { imageKit } from "@/lib/imagekit";
import { db } from "@/server/db"; // Drizzle database instance
import { images } from "@/server/schema";

interface UploadResponse {
    success: boolean;
    image?: {
        id: string;
        fileName: string;
        fileUrl: string;
        description?: string;
    };
    error?: string;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<UploadResponse>
) {
    if (req.method === "POST") {
        const { file, fileName, description } = req.body;

        if (!file || !fileName) {
            return res.status(400).json({ success: false, error: "Missing file or fileName." });
        }

        try {
            // Upload file to ImageKit
            const uploadResponse = await imageKit.upload({
                file, // Base64 string or file URL
                fileName,
                folder: "uploads", // Optional folder in ImageKit
            });

            // Save metadata to Neon DB
            const [newImage] = await db.insert(images).values({
                fileName: uploadResponse.name,
                fileUrl: uploadResponse.url,
                description: description || null,
            }).returning();

            return res.status(200).json({
                success: true,
                image: {
                    id: newImage.id,
                    fileName: newImage.fileName,
                    fileUrl: newImage.fileUrl,
                },
            });
        } catch (error) {
            console.error("Error uploading image:", error);
            return res.status(500).json({ success: false, error: "Image upload failed." });
        }
    } else {
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
