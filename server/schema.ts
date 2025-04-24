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

export const RoleEnum = pgEnum("role", ["user", "admin"]);

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
  role: RoleEnum("role").notNull().default("user"),
  resetToken: text("reset_token"),
  resetTokenExpires: timestamp("reset_token_expires", { withTimezone: true }),
})


export const properties = pgTable("properties", {
  id: serial("id").primaryKey(),
  zpid: varchar("zpid", { length: 50 }).unique().notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  propdetails: text("propdetails").notNull(),
  price: integer("price").notNull(),
  location: varchar("location", { length: 255 }).notNull(),
  imageUrl: varchar("image_url", { length: 500 }).notNull(),
  bedrooms: integer("bedrooms").notNull(),
  bathrooms: integer("bathrooms").notNull(),
  sqft: integer("sqft").notNull(),
  LotSize: integer("LotSize").notNull(),
  HOADues: integer("HOADues").notNull(),
  YearBuilt: integer("YearBuilt").notNull(),
  GarageSqFt: integer("GarageSqFt").notNull(),
  BasementSqFt: integer("BasementSqFt").notNull(),
  propertyType: varchar("property_type", { length: 255 }).notNull(),
  isForSale: boolean("is_for_sale").notNull().default(true),
  appliances: varchar("appliances", { length: 255 }), // Retain this column
  basement: varchar("basement", { length: 50 }), // New column
  floorCovering: varchar("floor_covering", { length: 255 }), // New column
  coolingType: varchar("cooling_type", { length: 255 }), // New column
  heatingType: varchar("heating_type", { length: 255 }), // New column
  heatingFuel: varchar("heating_fuel", { length: 255 }), // New column
  rooms: varchar("rooms", { length: 255 }), // New column
  indoorFeatures: varchar("indoor_features", { length: 255 }), // New column
  buildingAmenities: varchar("building_amenities", { length: 255 }), // New column
  architecturalStyle: varchar("architectural_style", { length: 255 }), // New column
  exterior: varchar("exterior", { length: 255 }), // New column
  outdoorAmenities: varchar("outdoor_amenities", { length: 255 }), // New column
  parking: varchar("parking", { length: 255 }), // New column
  roof: varchar("roof", { length: 255 }), // New column
  view: varchar("view", { length: 255 }), // New column
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

export const savedProperties = pgTable("saved_properties", {
  id: serial("id").primaryKey(),
  userId: text("user_id").references(() => users.id).notNull(),
  propertyId: integer("property_id").references(() => properties.id).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});
