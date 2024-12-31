import { pgTable, unique, serial, varchar, text, timestamp, foreignKey, json, integer, pgEnum } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const postPostTypeEnum = pgEnum("post_post_type_enum", ['post', 'page', 'story', 'series'])
export const postStatusEnum = pgEnum("post_status_enum", ['draft', 'scheduled', 'review', 'published'])


export const tags = pgTable("tags", {
	id: serial().primaryKey().notNull(),
	name: varchar({ length: 100 }).notNull(),
	slug: text().notNull(),
	description: text(),
	schema: text(),
	featuredImageUrl: text("featured_image_url"),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
	deletedAt: timestamp("deleted_at", { mode: 'string' }),
}, (table) => [
	unique("UQ_d90243459a697eadb8ad56e9092").on(table.name),
	unique("UQ_b3aa10c29ea4e61a830362bd25a").on(table.slug),
]);

export const metaOption = pgTable("meta_option", {
	id: serial().primaryKey().notNull(),
	metaValue: json("meta_value").notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
	postId: integer("post_id"),
}, (table) => [
	foreignKey({
			columns: [table.postId],
			foreignColumns: [post.id],
			name: "FK_057d0ee39abddb52ee2f891d0e4"
		}).onDelete("cascade"),
	unique("UQ_057d0ee39abddb52ee2f891d0e4").on(table.postId),
]);

export const post = pgTable("post", {
	id: serial().primaryKey().notNull(),
	title: varchar({ length: 96 }).notNull(),
	postType: postPostTypeEnum("post_type").default('post').notNull(),
	slug: varchar({ length: 256 }).notNull(),
	status: postStatusEnum().default('draft').notNull(),
	content: text(),
	schema: json(),
	featuredImageUrl: varchar("featured_image_url", { length: 1024 }),
	publishOn: timestamp("publish_on", { withTimezone: true, mode: 'string' }),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
	authorId: integer("author_id"),
}, (table) => [
	foreignKey({
			columns: [table.authorId],
			foreignColumns: [user.id],
			name: "FK_2f1a9ca8908fc8168bc18437f62"
		}),
	unique("UQ_cd1bddce36edc3e766798eab376").on(table.slug),
]);

export const user = pgTable("user", {
	id: serial().primaryKey().notNull(),
	firstName: varchar("first_name", { length: 96 }).notNull(),
	lastName: varchar().notNull(),
	email: text().notNull(),
	password: text().notNull(),
}, (table) => [
	unique("UQ_e12875dfb3b1d92d7d7c5377e22").on(table.email),
]);
