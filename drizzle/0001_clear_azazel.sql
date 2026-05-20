CREATE TABLE "role" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar,
	CONSTRAINT "role_title_unique" UNIQUE("title")
);
--> statement-breakpoint
CREATE TABLE "user_role" (
	"user_id" text NOT NULL,
	"role_id" integer NOT NULL,
	CONSTRAINT "user_role_user_id_role_id_pk" PRIMARY KEY("user_id","role_id")
);
