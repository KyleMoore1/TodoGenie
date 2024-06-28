ALTER TABLE "todos_table" ADD COLUMN "content" text;--> statement-breakpoint
ALTER TABLE "todos_table" ADD COLUMN "completed_at" timestamp;--> statement-breakpoint
ALTER TABLE "todos_table" ADD COLUMN "project_id" uuid;--> statement-breakpoint
ALTER TABLE "todos_table" ADD COLUMN "due_date" timestamp;--> statement-breakpoint
ALTER TABLE "todos_table" ADD COLUMN "todo_priority" integer;