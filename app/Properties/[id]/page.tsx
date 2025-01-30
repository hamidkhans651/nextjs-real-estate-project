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

  // ✅ Ensure `null` values are properly handled
  const formattedProperty = {
    ...property,
    basement: property.basement || "", // Convert `null` to an empty string
    architecturalStyle: property.architecturalStyle || "", // ✅ Ensure it's always a string
    floorCovering: property.floorCovering ? property.floorCovering.split(",") : [], 
    coolingType: property.coolingType ? property.coolingType.split(",") : [],
    heatingType: property.heatingType ? property.heatingType.split(",") : [],
    heatingFuel: property.heatingFuel ? property.heatingFuel.split(",") : [],
    rooms: property.rooms ? property.rooms.split(",") : [],
    indoorFeatures: property.indoorFeatures ? property.indoorFeatures.split(",") : [],
    buildingAmenities: property.buildingAmenities ? property.buildingAmenities.split(",") : [],
    exterior: property.exterior ? property.exterior.split(",") : [],
    outdoorAmenities: property.outdoorAmenities ? property.outdoorAmenities.split(",") : [],
    parking: property.parking ? property.parking.split(",") : [],
    roof: property.roof ? property.roof.split(",") : [],
    view: property.view ? property.view.split(",") : [],
  };

  return <PropertyDetails property={formattedProperty} />;
}
