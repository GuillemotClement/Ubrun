ALTER TABLE "message" ALTER COLUMN "user_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "message" ADD COLUMN "email" varchar NOT NULL;