CREATE TABLE "roles" (
	"role" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"effective_at" timestamp with time zone DEFAULT now() NOT NULL,
	"is_enabled" boolean DEFAULT true NOT NULL,
	CONSTRAINT "roles_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "user_roles" (
	"id" uuid NOT NULL,
	"role" text NOT NULL,
	"effective_at" timestamp with time zone DEFAULT now() NOT NULL,
	"is_negated" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_id_users_id_fk" FOREIGN KEY ("id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_role_roles_role_fk" FOREIGN KEY ("role") REFERENCES "public"."roles"("role") ON DELETE cascade ON UPDATE no action;