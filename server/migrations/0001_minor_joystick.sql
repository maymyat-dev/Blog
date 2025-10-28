ALTER TABLE "blog" ALTER COLUMN "id" SET DATA TYPE serial;--> statement-breakpoint
ALTER TABLE "blog" ALTER COLUMN "id" DROP IDENTITY;--> statement-breakpoint
ALTER TABLE "blog" DROP COLUMN "title";