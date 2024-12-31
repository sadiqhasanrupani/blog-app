import { relations } from "drizzle-orm/relations";
import { post, metaOption, user } from "./schema";

export const metaOptionRelations = relations(metaOption, ({one}) => ({
	post: one(post, {
		fields: [metaOption.postId],
		references: [post.id]
	}),
}));

export const postRelations = relations(post, ({one, many}) => ({
	metaOptions: many(metaOption),
	user: one(user, {
		fields: [post.authorId],
		references: [user.id]
	}),
}));

export const userRelations = relations(user, ({many}) => ({
	posts: many(post),
}));