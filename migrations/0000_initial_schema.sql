-- Initial database schema for business website
-- Generated from shared/schema.ts

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Users table (existing)
CREATE TABLE IF NOT EXISTS "users" (
	"id" varchar PRIMARY KEY DEFAULT gen_random_uuid(),
	"username" text NOT NULL,
	"password" text NOT NULL,
	CONSTRAINT "users_username_unique" UNIQUE("username")
);

-- Companies table for multi-tenant support
CREATE TABLE IF NOT EXISTS "companies" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"name" varchar(255) NOT NULL,
	"description" text,
	"founded_year" integer,
	"mission" text,
	"values" text[],
	"created_at" timestamp DEFAULT now()
);

-- Team members
CREATE TABLE IF NOT EXISTS "team_members" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"company_id" uuid,
	"name" varchar(255) NOT NULL,
	"role" varchar(255) NOT NULL,
	"bio" text,
	"image_url" varchar(500),
	"experience" text[],
	"order_index" integer DEFAULT 0,
	"is_active" boolean DEFAULT true
);

-- Services
CREATE TABLE IF NOT EXISTS "services" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"company_id" uuid,
	"title" varchar(255) NOT NULL,
	"description" text,
	"capabilities" text[],
	"process_steps" text[],
	"images" text[],
	"order_index" integer DEFAULT 0
);

-- Product categories
CREATE TABLE IF NOT EXISTS "product_categories" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"company_id" uuid,
	"name" varchar(255) NOT NULL,
	"description" text,
	"parent_id" uuid,
	"order_index" integer DEFAULT 0
);

-- Products
CREATE TABLE IF NOT EXISTS "products" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"company_id" uuid,
	"name" varchar(255) NOT NULL,
	"description" text,
	"specifications" jsonb,
	"images" text[],
	"materials" text[],
	"price_range" varchar(50),
	"is_featured" boolean DEFAULT false,
	"category_id" uuid
);

-- Projects
CREATE TABLE IF NOT EXISTS "projects" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"company_id" uuid,
	"title" varchar(255) NOT NULL,
	"client" varchar(255),
	"location" varchar(255),
	"brand" varchar(255),
	"segment" varchar(100),
	"description" text,
	"challenges" text[],
	"solutions" text[],
	"results" text[],
	"images" jsonb,
	"completed_at" date,
	"is_featured" boolean DEFAULT false
);

-- Blog posts
CREATE TABLE IF NOT EXISTS "blog_posts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"company_id" uuid,
	"title" varchar(255) NOT NULL,
	"slug" varchar(255) NOT NULL,
	"excerpt" text,
	"content" text NOT NULL,
	"author" varchar(255),
	"category" varchar(100),
	"tags" text[],
	"featured_image" varchar(500),
	"published_at" timestamp,
	"is_published" boolean DEFAULT false,
	CONSTRAINT "blog_posts_slug_unique" UNIQUE("slug")
);

-- Downloadable guides
CREATE TABLE IF NOT EXISTS "guides" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"company_id" uuid,
	"title" varchar(255) NOT NULL,
	"description" text,
	"file_url" varchar(500) NOT NULL,
	"file_size" varchar(20),
	"download_count" integer DEFAULT 0,
	"requires_lead_capture" boolean DEFAULT true,
	"is_active" boolean DEFAULT true
);

-- Contact form submissions
CREATE TABLE IF NOT EXISTS "contact_submissions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"company_id" uuid,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"phone" varchar(50),
	"project_type" varchar(100),
	"message" text NOT NULL,
	"submitted_at" timestamp DEFAULT now(),
	"status" varchar(50) DEFAULT 'new'
);

-- Add foreign key constraints
DO $$ BEGIN
 ALTER TABLE "team_members" ADD CONSTRAINT "team_members_company_id_companies_id_fk" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "services" ADD CONSTRAINT "services_company_id_companies_id_fk" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "product_categories" ADD CONSTRAINT "product_categories_company_id_companies_id_fk" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "product_categories" ADD CONSTRAINT "product_categories_parent_id_product_categories_id_fk" FOREIGN KEY ("parent_id") REFERENCES "product_categories"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "products" ADD CONSTRAINT "products_company_id_companies_id_fk" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "products" ADD CONSTRAINT "products_category_id_product_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "product_categories"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "projects" ADD CONSTRAINT "projects_company_id_companies_id_fk" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "blog_posts" ADD CONSTRAINT "blog_posts_company_id_companies_id_fk" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "guides" ADD CONSTRAINT "guides_company_id_companies_id_fk" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "contact_submissions" ADD CONSTRAINT "contact_submissions_company_id_companies_id_fk" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;