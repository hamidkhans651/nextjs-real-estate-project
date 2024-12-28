import { NextApiRequest, NextApiResponse } from "next";
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
  } else {
    // Handle unsupported methods
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
