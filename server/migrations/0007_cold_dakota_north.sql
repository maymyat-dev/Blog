CREATE TABLE "emailVerificationToken" (
	"id" text NOT NULL,
	"token" text NOT NULL,
	"expires" timestamp NOT NULL,
	"email" text NOT NULL,
	CONSTRAINT "emailVerificationToken_id_token_pk" PRIMARY KEY("id","token")
);
