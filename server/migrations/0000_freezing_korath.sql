CREATE TYPE "public"."skill_level" AS ENUM('Buyer', 'Seller', 'Advanced', 'Expert', 'Master');--> statement-breakpoint
CREATE TABLE "properties" (
	"id" serial PRIMARY KEY NOT NULL,
	"zpid" varchar(50) NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text NOT NULL,
	"propdetails" text NOT NULL,
	"price" integer NOT NULL,
	"location" varchar(255) NOT NULL,
	"image_url" varchar(500) NOT NULL,
	"bedrooms" integer NOT NULL,
	"bathrooms" integer NOT NULL,
	"sqft" integer NOT NULL,
	"LotSize" integer NOT NULL,
	"HOADues" integer NOT NULL,
	"YearBuilt" integer NOT NULL,
	"GarageSqFt" integer NOT NULL,
	"BasementSqFt" integer NOT NULL,
	"property_type" varchar(255) NOT NULL,
	"is_for_sale" boolean DEFAULT true NOT NULL,
	"appliances" varchar(255),
	"basement" varchar(50),
	"floor_covering" varchar(255),
	"cooling_type" varchar(255),
	"heating_type" varchar(255),
	"heating_fuel" varchar(255),
	"rooms" varchar(255),
	"indoor_features" varchar(255),
	"building_amenities" varchar(255),
	"architectural_style" varchar(255),
	"exterior" varchar(255),
	"outdoor_amenities" varchar(255),
	"parking" varchar(255),
	"roof" varchar(255),
	"view" varchar(255),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "properties_zpid_unique" UNIQUE("zpid")
);
--> statement-breakpoint
CREATE TABLE "property_details" (
	"id" serial PRIMARY KEY NOT NULL,
	"zpid" varchar(50) NOT NULL,
	"walk_score" integer,
	"transit_score" integer,
	"bike_score" integer,
	"year_built" integer,
	"tax_history" jsonb,
	"price_history" jsonb,
	"zestimate" integer,
	"rental_estimate" integer,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "property_images" (
	"id" serial PRIMARY KEY NOT NULL,
	"zpid" varchar(50) NOT NULL,
	"image_url" varchar(500) NOT NULL,
	"type" varchar(50),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "saved_properties" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"property_id" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" text PRIMARY KEY NOT NULL,
	"firstName" text,
	"lastName" text,
	"location" text,
	"email" text NOT NULL,
	"image" text DEFAULT 'no-image',
	"password" text,
	"skill_level" "skill_level" DEFAULT 'Buyer' NOT NULL
);
--> statement-breakpoint
ALTER TABLE "property_details" ADD CONSTRAINT "property_details_zpid_properties_zpid_fk" FOREIGN KEY ("zpid") REFERENCES "public"."properties"("zpid") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "property_images" ADD CONSTRAINT "property_images_zpid_properties_zpid_fk" FOREIGN KEY ("zpid") REFERENCES "public"."properties"("zpid") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "saved_properties" ADD CONSTRAINT "saved_properties_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "saved_properties" ADD CONSTRAINT "saved_properties_property_id_properties_id_fk" FOREIGN KEY ("property_id") REFERENCES "public"."properties"("id") ON DELETE no action ON UPDATE no action;