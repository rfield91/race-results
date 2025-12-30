ALTER TABLE "orgs" ADD COLUMN "motorsportreg_org_id" text;--> statement-breakpoint
ALTER TABLE "orgs" ADD CONSTRAINT "orgs_motorsportreg_org_id_key" UNIQUE("motorsportreg_org_id");