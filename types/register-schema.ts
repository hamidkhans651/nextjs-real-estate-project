import * as z from "zod";


const SkillLevelEnum = z.enum(["Buyer", "Seller", "Advanced", "Expert", "Master"]);
const RoleEnum = z.enum(["user", "admin"]);

export const RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  location: z.string(),
  confirmPassword: z.string(),
  skillLevel: SkillLevelEnum,
  role: RoleEnum.default("user"),
});