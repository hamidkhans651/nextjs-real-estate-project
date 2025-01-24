import {
  pgTable,
  uuid,
  text,
  jsonb,
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

export const properties = pgTable("properties", {
  id: serial("id").primaryKey(),
  zpid: varchar("zpid", { length: 50 }).unique().notNull(), // Zillow Property ID
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




export const propertyDetails = pgTable("property_details", {
  id: serial("id").primaryKey(),
  zpid: varchar("zpid", { length: 50 }).references(() => properties.zpid).notNull(),
  walkScore: integer("walk_score"),
  transitScore: integer("transit_score"),
  bikeScore: integer("bike_score"),
  yearBuilt: integer("year_built"),
  taxHistory: jsonb("tax_history"), // Store tax history as JSON
  priceHistory: jsonb("price_history"), // Store price history as JSON
  zestimate: integer("zestimate"), // Zestimate Value
  rentalEstimate: integer("rental_estimate"), // Rent Zestimate
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export const propertyImages = pgTable("property_images", {
  id: serial("id").primaryKey(),
  zpid: varchar("zpid", { length: 50 }).references(() => properties.zpid).notNull(),
  imageUrl: varchar("image_url", { length: 500 }).notNull(),
  type: varchar("type", { length: 50 }), // e.g., image, video
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

