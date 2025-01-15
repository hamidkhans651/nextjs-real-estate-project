CREATE TYPE "public"."skill_level" AS ENUM('Buyer', 'Seller', 'Advanced', 'Expert', 'Master');--> statement-breakpoint
CREATE TABLE "properties" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text NOT NULL,
	"price" integer NOT NULL,
	"location" varchar(255) NOT NULL,
	"image_url" varchar(500) NOT NULL,
	"bedrooms" integer NOT NULL,
	"bathrooms" integer NOT NULL,
	"sqft" integer NOT NULL,
	"property_type" varchar(255) NOT NULL,
	"is_for_sale" boolean DEFAULT true NOT NULL
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
