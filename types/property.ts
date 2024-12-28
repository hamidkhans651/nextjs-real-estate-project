import { z } from "zod";
import { propertySchema, addPropertySchema } from "@/schemas/property";

export type Property = z.infer<typeof propertySchema>; // Full property type
export type AddProperty = z.infer<typeof addPropertySchema>; // Add property type
