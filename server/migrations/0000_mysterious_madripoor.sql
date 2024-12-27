CREATE TYPE "public"."user_domain" AS ENUM('Buyer', 'Seller', 'Realtor', 'Agent', 'Marketer');--> statement-breakpoint
CREATE TABLE "user" (
	"id" text PRIMARY KEY NOT NULL,
	"firstName" text,
	"lastName" text,
	"location" text,
	"email" text NOT NULL,
	"image" text DEFAULT 'no-image',
	"password" text
);
