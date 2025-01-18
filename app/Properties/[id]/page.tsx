import { db } from "@/server/db"; // Import your Drizzle DB instance
import { properties } from "@/server/schema"; // Import properties schema
import { sql } from "drizzle-orm";

type PageProps = {
  params: Promise<{ id: string }>; // Awaitable params object
};

export default async function Page({ params }: PageProps) {
  const { id } = await params; // Await params before destructuring

  // Fetch property details using the ID
  const property = await db
    .select()
    .from(properties)
    .where(sql`${properties.id} = ${id}`)
    .limit(1)
    .then((rows) => rows[0]);

  if (!property) {
    return <p>Property not found.</p>;
  }

  return (
    <main>
      <h1>{property.title}</h1>
      <p>{property.description}</p>
      <p>Price: ${property.price}</p>
      <img src={property.imageUrl} alt={property.title} />
      <p>Location: {property.location}</p>
      <p>Bedrooms: {property.bedrooms}</p>
      <p>Bathrooms: {property.bathrooms}</p>
      <p>Square Feet: {property.sqft}</p>
      <p>Type: {property.propertyType}</p>
      <p>For Sale: {property.isForSale ? "Yes" : "No"}</p>
    </main>
  );
}
