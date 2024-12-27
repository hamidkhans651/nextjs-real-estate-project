import {
  pgTable,
  text,
  pgEnum,
  varchar,
} from "drizzle-orm/pg-core"

export const SkillLevelEnum = pgEnum("user_domain", [
  "Buyer", "Seller", "Realtor", "Agent", "Marketer",
]);

export const users = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  firstName: text("firstName"),
  lastName: text("lastName"),
  location: text("location"),
  email: text("email").notNull(),
  image: text("image").default("no-image"),
  password: text("password"),
  role: varchar("role").notNull().default("user"), // Add role field

})