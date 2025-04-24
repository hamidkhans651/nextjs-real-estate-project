// import { NextApiRequest, NextApiResponse } from "next";
// import { db } from "@/server/db";
// import { users } from "@/server/schema";
// import { sql } from "drizzle-orm";


// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === "GET") {
//     try {
//       const { page = 1, search = "" } = req.query;
//       const limit = 10; // Number of users per page
//       const offset = (Number(page) - 1) * limit;

//       // Fetch users with pagination and search

//       const result = await db
//         .select()
//         .from(users)
//         .where(sql`${users.firstName} ILIKE ${`%${search}%`}`)
//         .offset(offset)
//         .limit(limit);


//       const totalUsers = await db
//         .select({ count: sql<number>`COUNT(${users.id})` })
//         .from(users);

//       res.status(200).json({
//         users: result,
//         totalUsers: totalUsers[0].count,
//         currentPage: Number(page),
//         totalPages: Math.ceil(totalUsers[0].count / limit),
//       });
//     } catch (error) {
//       console.error("Error fetching users:", error);
//       res.status(500).json({ error: "Failed to fetch users" });
//     }
//   } else if (req.method === "DELETE") {
//     try {
//       const { id } = req.query;

//       if (!id) {
//         return res.status(400).json({ error: "User ID is required" });
//       }

//       await db
//         .delete(users)
//         .where(sql`${users.id} = ${id}`);

//       res.status(200).json({ message: "User deleted successfully" });
//     } catch (error) {
//       console.error("Error deleting user:", error);
//       res.status(500).json({ error: "Failed to delete user" });
//     }
//   } else {
//     res.setHeader("Allow", ["GET", "DELETE"]);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }

import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/server/db";
import { users } from "@/server/schema";
import { sql } from "drizzle-orm";
import { auth } from "@/server/auth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Check if the current user is an admin
  const session = await auth();
  if (!session || !session.user || !('role' in session.user) || session.user.role !== "admin") {
    return res.status(403).json({ error: "Unauthorized" });
  }

  if (req.method === "GET") {
    try {
      const { page = 1, search = "" } = req.query;
      const limit = 10; // Number of users per page
      const offset = (Number(page) - 1) * limit;

      // Fetch users with pagination and search
      const result = await db
        .select()
        .from(users)
        .where(sql`${users.firstName} ILIKE ${`%${search}%`}`)
        .offset(offset)
        .limit(limit);

      const totalUsers = await db
        .select({ count: sql<number>`COUNT(${users.id})` })
        .from(users);

      res.status(200).json({
        users: result,
        totalUsers: totalUsers[0].count,
        currentPage: Number(page),
        totalPages: Math.ceil(totalUsers[0].count / limit),
      });
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ error: "Failed to fetch users" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
