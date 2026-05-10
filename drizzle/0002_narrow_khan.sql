CREATE TABLE "message_status" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar NOT NULL,
	CONSTRAINT "message_status_title_unique" UNIQUE("title")
);
--> statement-breakpoint
CREATE TABLE "message" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar,
	"content" text,
	"message_type_id" integer NOT NULL,
	"user_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "message_type" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar NOT NULL,
	CONSTRAINT "message_type_title_unique" UNIQUE("title")
);
--> statement-breakpoint
ALTER TABLE "message" ADD CONSTRAINT "message_message_type_id_message_type_id_fk" FOREIGN KEY ("message_type_id") REFERENCES "public"."message_type"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "message" ADD CONSTRAINT "message_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;