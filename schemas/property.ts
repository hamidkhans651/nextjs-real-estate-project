import { z } from "zod";

export const propertySchema = z.object({
  id: z.number().optional(), // Optional because it's auto-generated
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  price: z.number().positive("Price must be greater than 0"),
  location: z.string().min(1, "Location is required"),
  imageUrl: z.string().url("Image URL must be a valid URL"),
  bedrooms: z.number().min(1, "Bedrooms must be at least 1"),
  bathrooms: z.number().min(1, "Bathrooms must be at least 1"),
  sqft: z.number().min(1, "Square footage must be greater than 0"),
  propertyType: z.string().min(1, "Property type is required"),
  isForSale: z.boolean(),
});

export const addPropertySchema = propertySchema.omit({ id: true }); // For adding a property
