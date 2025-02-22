import { NextApiRequest, NextApiResponse } from "next";
import { eq, ilike, and } from "drizzle-orm";
import { db } from "@/server/db";
import { properties } from "@/server/schema";
import { InferSelectModel } from "drizzle-orm";

// Define Property type
type Property = InferSelectModel<typeof properties>;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === "GET") {
      // Fetch properties (with optional search filter)
      const { search } = req.query;

      if (search && typeof search === "string") {
        const data: Property[] = await db
          .select()
          .from(properties)
          .where(and(ilike(properties.location, `%${search}%`)))
          .limit(50)
          .execute();

        return res.status(200).json(data);
      }

      // If no search term, return all properties (limit for performance)
      const data: Property[] = await db.select().from(properties).limit(50).execute();
      return res.status(200).json(data);
    }

    if (req.method === "POST") {
      // Add a new property
      const property: Omit<Property, "id"> = req.body; // Exclude `id` to let DB auto-generate it
      await db.insert(properties).values(property).execute();
      return res.status(201).json({ message: "Property added successfully!" });
    }

    if (req.method === "PUT") {
      // Update an existing property
      const { id, ...property } = req.body;

      if (!id) {
        return res.status(400).json({ error: "Property ID is required" });
      }

      const updatedRows = await db.update(properties).set(property).where(eq(properties.id, Number(id))).execute();

      if (!updatedRows) {
        return res.status(404).json({ error: "Property not found" });
      }

      return res.status(200).json({ message: "Property updated successfully!" });
    }

    if (req.method === "DELETE") {
      // Delete a property
      const id = req.query.id as string | undefined;

      if (!id) {
        return res.status(400).json({ error: "Property ID is required" });
      }

      const deletedRows = await db.delete(properties).where(eq(properties.id, Number(id))).execute();

      if (!deletedRows) {
        return res.status(404).json({ error: "Property not found" });
      }

      return res.status(200).json({ message: "Property deleted successfully!" });
    }

    // Handle unsupported methods
    res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
    return res.status(405).json({ error: `Method ${req.method} not allowed` });

  } catch (error) {
    console.error("API Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
