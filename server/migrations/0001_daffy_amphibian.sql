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
ALTER TABLE "properties" ADD COLUMN "zpid" varchar(50) NOT NULL;--> statement-breakpoint
ALTER TABLE "properties" ADD COLUMN "created_at" timestamp with time zone DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "property_details" ADD CONSTRAINT "property_details_zpid_properties_zpid_fk" FOREIGN KEY ("zpid") REFERENCES "public"."properties"("zpid") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "property_images" ADD CONSTRAINT "property_images_zpid_properties_zpid_fk" FOREIGN KEY ("zpid") REFERENCES "public"."properties"("zpid") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "properties" ADD CONSTRAINT "properties_zpid_unique" UNIQUE("zpid");