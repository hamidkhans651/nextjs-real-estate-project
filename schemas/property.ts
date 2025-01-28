import { z } from "zod";

export const propertySchema = z.object({
  id: z.number().optional(),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  details: z.string().min(1, "Details are required"),
  price: z.number().positive("Price must be greater than 0"),
  location: z.string().min(1, "Location is required"),
  imageUrl: z.string().url("Image URL must be a valid URL"),
  bedrooms: z.number().min(1, "Bedrooms must be at least 1"),
  bathrooms: z.number().min(1, "Bathrooms must be at least 1"),
  sqft: z.number().min(1, "Square footage must be greater than 0"),
  LotSize: z.number().min(1, "Lot Size must be greater than 0"),
  HOADues: z.number().min(1, "HOA Dues must be greater than 0"),
  YearBuilt: z.number().min(1, "Year Built must be greater than 0"),
  GarageSqFt: z.number().min(1, "Garage SqFt must be greater than 0"),
  BasementSqFt: z.number().min(1, "Basement SqFt must be greater than 0"),
  propertyType: z.string().min(1, "Property type is required"),
  isForSale: z.boolean(),
  basement: z.string().optional(),
  floorCovering: z.array(z.string()).optional(),
  coolingType: z.array(z.string()).optional(),
  heatingType: z.array(z.string()).optional(),
  heatingFuel: z.array(z.string()).optional(),
  rooms: z.array(z.string()).optional(),
  indoorFeatures: z.array(z.string()).optional(),
  buildingAmenities: z.array(z.string()).optional(),
  architecturalStyle: z.string().optional(),
  exterior: z.array(z.string()).optional(),
  outdoorAmenities: z.array(z.string()).optional(),
  parking: z.array(z.string()).optional(),
  roof: z.array(z.string()).optional(),
  view: z.array(z.string()).optional(),
});



export const addPropertySchema = propertySchema.omit({ id: true }); // For adding a property
