import {
  pgTable,
  uuid,
  text,
  pgEnum,
  serial,
  timestamp,
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

// export const properties = pgTable("properties", {
//   id: serial("id").primaryKey(),
//   title: varchar("title", { length: 255 }).notNull(),
//   description: text("description").notNull(),
//   price: integer("price").notNull(),
//   location: varchar("location", { length: 255 }).notNull(),
//   imageUrl: varchar("image_url", { length: 500 }).notNull(),
//   bedrooms: integer("bedrooms").notNull(),
//   bathrooms: integer("bathrooms").notNull(),
//   sqft: integer("sqft").notNull(),
//   propertyType: varchar("property_type", { length: 255 }).notNull(),
//   isForSale: boolean("is_for_sale").notNull().default(true), // New column
// });



// export const images = pgTable("images", {
//   id: uuid("id").defaultRandom().primaryKey(),         // Unique identifier
//   fileName: varchar("file_name", { length: 255 }).notNull(), // Original file name
//   fileUrl: text("file_url").notNull(),                // Image URL from ImageKit
//   description: text("description"),                   // Optional description
//   createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(), // Upload timestamp
// });


export const properties = pgTable("Properties", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  price: integer("price").notNull(),
  location: varchar("location", { length: 255 }).notNull(),
  imageUrl: varchar("image_url", { length: 500 }).notNull(),
  bedrooms: integer("bedrooms").notNull(),
  bathrooms: integer("bathrooms").notNull(),
  sqft: integer("sqft").notNull(),
  propertyType: varchar("property_type", { length: 255 }).notNull(),
  isForSale: boolean("is_for_sale").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

