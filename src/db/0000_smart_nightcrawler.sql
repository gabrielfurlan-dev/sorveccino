CREATE TABLE IF NOT EXISTS "acais" (
	"id" text PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"nome" text NOT NULL,
	"categoria" text NOT NULL,
	"tamanho" numeric NOT NULL,
	"unidade_medida" text NOT NULL,
	"preco" numeric NOT NULL,
	"id_embalagem" text,
	"adicionais" jsonb,
	"id_promocao" text,
	"observacoes" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "adicionais" (
	"id" text PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"nome" text NOT NULL,
	"categoria" text NOT NULL,
	"preco" numeric NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "clientes" (
	"id" text PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"nome" text NOT NULL,
	"cpf" text,
	"email" text,
	"telefone" text,
	"cep" text NOT NULL,
	"logradouro" text,
	"complemento" text,
	"bairro" text,
	"uf" text,
	"numero" text,
	"cidade" text
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
CREATE TABLE IF NOT EXISTS "pedidos" (
	"id" text PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"nome_cliente" text NOT NULL,
	"acais" text NOT NULL,
	"cupom_desconto" text NOT NULL,
	"id_cliente" text
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
 ALTER TABLE "acais" ADD CONSTRAINT "acais_id_embalagem_embalagens_id_fk" FOREIGN KEY ("id_embalagem") REFERENCES "public"."embalagens"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "acais" ADD CONSTRAINT "acais_id_promocao_promocoes_id_fk" FOREIGN KEY ("id_promocao") REFERENCES "public"."promocoes"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "embalagens" ADD CONSTRAINT "embalagens_id_item_itens_id_fk" FOREIGN KEY ("id_item") REFERENCES "public"."itens"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pedidos" ADD CONSTRAINT "pedidos_id_cliente_clientes_id_fk" FOREIGN KEY ("id_cliente") REFERENCES "public"."clientes"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
