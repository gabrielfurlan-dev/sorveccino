CREATE TABLE IF NOT EXISTS "adicionais" (
	"id" text PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"nome" text NOT NULL,
	"categoria" text NOT NULL,
	"preco" numeric NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "customers" (
	"id" text PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"name" text NOT NULL,
	"cpf" text,
	"email" text,
	"phone" text,
	"zipCode" text,
	"address" text,
	"city" text,
	"state" text,
	"number" text,
	"complement" text,
	"neighborhood" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "embalagens" (
	"id" text PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"tamanho" numeric NOT NULL,
	"unidade_medida" text NOT NULL,
	"id_item" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "orders" (
	"id" text PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"acais" jsonb,
	"discount_code" text,
	"customer_id" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "itens" (
	"id" text PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"nome" text NOT NULL,
	"categoria" text NOT NULL,
	"preco" numeric NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "promocoes" (
	"id" text PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"nome" text NOT NULL,
	"categoria" text NOT NULL,
	"preco" numeric NOT NULL,
	"dias_da_semana" jsonb NOT NULL,
	"ativo" boolean NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "embalagens" ADD CONSTRAINT "embalagens_id_item_itens_id_fk" FOREIGN KEY ("id_item") REFERENCES "public"."itens"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "orders" ADD CONSTRAINT "orders_customer_id_customers_id_fk" FOREIGN KEY ("customer_id") REFERENCES "public"."customers"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
