-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TYPE "public"."post_post_type_enum" AS ENUM('post', 'page', 'story', 'series');--> statement-breakpoint
CREATE TYPE "public"."post_status_enum" AS ENUM('draft', 'scheduled', 'review', 'published');--> statement-breakpoint
CREATE TABLE "tags" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL,
	"slug" text NOT NULL,
	"description" text,
	"schema" text,
	"featured_image_url" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	CONSTRAINT "UQ_d90243459a697eadb8ad56e9092" UNIQUE("name"),
	CONSTRAINT "UQ_b3aa10c29ea4e61a830362bd25a" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "meta_option" (
	"id" serial PRIMARY KEY NOT NULL,
	"meta_value" json NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"post_id" integer,
	CONSTRAINT "UQ_057d0ee39abddb52ee2f891d0e4" UNIQUE("post_id")
);
--> statement-breakpoint
CREATE TABLE "post" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(96) NOT NULL,
	"post_type" "post_post_type_enum" DEFAULT 'post' NOT NULL,
	"slug" varchar(256) NOT NULL,
	"status" "post_status_enum" DEFAULT 'draft' NOT NULL,
	"content" text,
	"schema" json,
	"featured_image_url" varchar(1024),
	"publish_on" timestamp with time zone,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"author_id" integer,
	CONSTRAINT "UQ_cd1bddce36edc3e766798eab376" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" serial PRIMARY KEY NOT NULL,
	"first_name" varchar(96) NOT NULL,
	"lastName" varchar NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "meta_option" ADD CONSTRAINT "FK_057d0ee39abddb52ee2f891d0e4" FOREIGN KEY ("post_id") REFERENCES "public"."post"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "post" ADD CONSTRAINT "FK_2f1a9ca8908fc8168bc18437f62" FOREIGN KEY ("author_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
*/