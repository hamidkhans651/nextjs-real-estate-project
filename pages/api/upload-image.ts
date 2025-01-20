// pages/api/upload-image.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { imageKit } from "@/lib/imagekit";
import { db } from "@/server/db"; // Drizzle database instance
import { images } from "@/server/schema";

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

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<UploadResponse>
) {
    if (req.method === "POST") {
        const { files, descriptions } = req.body;

        if (!files || !Array.isArray(files)) {
            return res.status(400).json({ success: false, error: "Invalid files input." });
        }

        try {
            const uploadedImages = await Promise.all(
                files.map(async (file: string, index: number) => {
                    const uploadResponse = await imageKit.upload({
                        file,
                        fileName: `image-${Date.now()}-${index}`,
                        folder: "uploads",
                    });
                    // Inside your API handler in upload-image.ts
                    console.log({
                        fileName: uploadResponse.name,
                        fileUrl: uploadResponse.url,
                        description: descriptions?.[index] || null,
                    });


                    const [newImage] = await db.insert(images).values({
                        fileName: uploadResponse.name,
                        fileUrl: uploadResponse.url,
                        description: descriptions?.[index] || null,
                    }).returning();

                    return {
                        id: newImage.id,
                        fileName: newImage.fileName,
                        fileUrl: newImage.fileUrl,
                        description: newImage.description ?? undefined, // Convert null to undefined
                        // Inside your API handler in upload-image.ts


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
