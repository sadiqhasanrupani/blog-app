import { pgTable, foreignKey, unique, serial, json, timestamp, integer, varchar, text, index, primaryKey, pgEnum } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const postPostTypeEnum = pgEnum("post_post_type_enum", ['post', 'page', 'story', 'series'])
export const postStatusEnum = pgEnum("post_status_enum", ['draft', 'scheduled', 'review', 'published'])


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

export const tag = pgTable("tag", {
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
	unique("UQ_6a9775008add570dc3e5a0bab7b").on(table.name),
	unique("UQ_3413aed3ecde54f832c4f44f045").on(table.slug),
]);

export const postTagsTag = pgTable("post_tags_tag", {
	postId: integer().notNull(),
	tagId: integer().notNull(),
}, (table) => [
	index("IDX_41e7626b9cc03c5c65812ae55e").using("btree", table.tagId.asc().nullsLast().op("int4_ops")),
	index("IDX_b651178cc41334544a7a9601c4").using("btree", table.postId.asc().nullsLast().op("int4_ops")),
	foreignKey({
			columns: [table.postId],
			foreignColumns: [post.id],
			name: "FK_b651178cc41334544a7a9601c45"
		}).onUpdate("cascade").onDelete("cascade"),
	foreignKey({
			columns: [table.tagId],
			foreignColumns: [tag.id],
			name: "FK_41e7626b9cc03c5c65812ae55e8"
		}).onUpdate("cascade").onDelete("cascade"),
	primaryKey({ columns: [table.postId, table.tagId], name: "PK_e9b7b8e6a07bdccb6a954171676"}),
]);
