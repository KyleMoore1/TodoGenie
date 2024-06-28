CREATE TABLE IF NOT EXISTS "todos_table" (
	"id" uuid PRIMARY KEY NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	"user_id" uuid NOT NULL,
	"title" text NOT NULL,
	"completed" boolean NOT NULL
);
