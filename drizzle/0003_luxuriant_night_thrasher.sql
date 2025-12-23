ALTER TABLE "orgs" ADD COLUMN "description" text;--> statement-breakpoint
ALTER TABLE "orgs" ADD COLUMN "is_public" boolean DEFAULT false NOT NULL;