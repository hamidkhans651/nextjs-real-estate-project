import * as z from "zod";

const SkillLevelEnum = z.enum(["Buyer", "Seller", "Realtor", "Agent", "Marketer"]);

export const UserSchema = z.object({
  id: z.number().optional(), // Optional for new user creation
  email: z.string().email(),
  password: z.string().min(6), // Minimum password length
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  location: z.string().min(1),
  role: SkillLevelEnum, // Use the skill level as the role
});