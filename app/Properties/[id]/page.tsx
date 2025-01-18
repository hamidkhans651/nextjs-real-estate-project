import { db } from "@/server/db"; // Import Drizzle DB instance
import { properties } from "@/server/schema"; // Import properties schema
import { sql } from "drizzle-orm";
import PropertyDetails from "./PropertyDetails"; // Import client component

type PageProps = {
  params: Promise<{ id: string }>; // Params are treated as a Promise
};

export default async function Page({ params }: PageProps) {
  const { id } = await params; // Await params before destructuring

  const property = await db
    .select()
    .from(properties)
    .where(sql`${properties.id} = ${id}`)
    .limit(1)
    .then((rows) => rows[0]);

  if (!property) {
    return <p>Property not found.</p>;
  }

  return <PropertyDetails property={property} />;
}
