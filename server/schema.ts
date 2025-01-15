import {
  pgTable,
  text,
  pgEnum,
  serial,
  integer,
  varchar,
  boolean, // Ensure boolean is imported
} from "drizzle-orm/pg-core";

export const SkillLevelEnum = pgEnum("skill_level", [
  "Buyer", "Seller", "Advanced", "Expert", "Master",
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
  skillLevel: SkillLevelEnum("skill_level").notNull().default("Buyer"),
})

export const properties = pgTable("properties", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  price: integer("price").notNull(),
  location: varchar("location", { length: 255 }).notNull(),
  imageUrl: varchar("image_url", { length: 500 }).notNull(),
  bedrooms:integer("bedrooms").notNull(),
  bathrooms:integer("bathrooms").notNull(),
  sqft:integer("sqft").notNull(),
  propertyType:varchar("property_type", { length: 255 }).notNull(),
  isForSale: boolean("is_for_sale").notNull().default(true), // New column
});