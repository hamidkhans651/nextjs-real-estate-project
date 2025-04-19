-- Create the role enum type
CREATE TYPE "public"."role" AS ENUM('user', 'admin');

-- Add the role column to the user table
ALTER TABLE "public"."user" ADD COLUMN "role" "public"."role" NOT NULL DEFAULT 'user';

-- Add comment to role column
COMMENT ON COLUMN "public"."user"."role" IS 'User role (user or admin)'; 