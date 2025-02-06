import { NextApiRequest, NextApiResponse } from "next";
import { eq } from "drizzle-orm";
import { db } from "@/server/db";
import { properties } from "@/server/schema";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    // Handle GET requests (fetch properties)
    try {
      const data = await db.select().from(properties);
      res.status(200).json(data);
    } catch (error) {
      console.error("Error fetching properties:", error);
      res.status(500).json({ error: "Failed to fetch properties" });
    }
  } else if (req.method === "POST") {
    // Handle POST requests (add a property)
    try {
      const property = req.body;
      await db.insert(properties).values(property);
      res.status(201).json({ message: "Property added successfully!" });
    } catch (error) {
      console.error("Error adding property:", error);
      res.status(500).json({ error: "Failed to add property" });
    }
  } else if (req.method === "PUT") {
    // Handle PUT requests (update a property)
    try {
      const { id, ...property } = req.body;
      if (!id) {
        res.status(400).json({ error: "Property ID is required" });
        return;
      }

      await db.update(properties).set(property).where(eq(properties.id, Number(id)));
      res.status(200).json({ message: "Property updated successfully!" });
    } catch (error) {
      console.error("Error updating property:", error);
      res.status(500).json({ error: "Failed to update property" });
    }
  } else if (req.method === "DELETE") {
    // Handle DELETE requests (delete a property)
    try {
      const id = req.query.id as string | undefined;
      if (!id) {
        res.status(400).json({ error: "Property ID is required" });
        return;
      }

      await db.delete(properties).where(eq(properties.id, Number(id)));
      res.status(200).json({ message: "Property deleted successfully!" });
    } catch (error) {
      console.error("Error deleting property:", error);
      res.status(500).json({ error: "Failed to delete property" });
    }
  }
}