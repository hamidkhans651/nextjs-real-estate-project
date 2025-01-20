// pages/api/get-images.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/server/db";
import { images } from "@/server/schema";
import { desc } from "drizzle-orm";



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        try {
            const allImages = await db
                .select()
                .from(images)
                .orderBy(desc(images.createdAt)); // Use desc() utility here

            res.status(200).json(allImages);
        } catch (error) {
            console.error("Error fetching images:", error);
            res.status(500).json({ error: "Failed to fetch images." });
        }
    } else {
        res.setHeader("Allow", ["GET"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

