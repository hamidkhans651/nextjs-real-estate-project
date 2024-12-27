CREATE TYPE "public"."skill_level" AS ENUM('Buyer', 'Seller', 'Advanced', 'Expert', 'Master');--> statement-breakpoint
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
