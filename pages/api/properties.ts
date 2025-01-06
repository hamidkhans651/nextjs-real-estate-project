import { NextApiRequest, NextApiResponse } from "next";
import { eq } from "drizzle-orm"; // Ensure this import is present
import { db } from "@/server/db";
import { properties } from "@/server/schema";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    // Handle GET requests (fetch properties)
    try {
      const data = await db.select().from(properties);
      res.status(200).json(data); // Return an array of properties
    } catch (error) {
      console.error("Error fetching properties:", error);
      res.status(500).json({ error: "Failed to fetch properties" });
    }
  } else if (req.method === "POST") {
    // Handle POST requests (add a property)
    try {
      const property = req.body;
      console.log("Incoming Property Data:", property); // Debugging log

      // Validate and insert property into the database
      await db.insert(properties).values(property);
      res.status(201).json({ message: "Property added successfully!" });
    } catch (error) {
      console.error("Error adding property:", error);
      res.status(500).json({ error: "Failed to add property" });
    }
  }else if (req.method === "DELETE") {
    try {
      const id = req.query.id as string | undefined;
      if (!id) {
        res.status(400).json({ error: "Property ID is required" });
        return;
      }
  
      // Use the `eq` helper for equality
      await db.delete(properties).where(eq(properties.id, Number(id)));
      res.status(200).json({ message: "Property deleted successfully!" });
    } catch (error) {
      console.error("Error deleting property:", error);
      res.status(500).json({ error: "Failed to delete property" });
    }
  }
}  