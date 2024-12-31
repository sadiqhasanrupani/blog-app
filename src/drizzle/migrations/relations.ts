import { relations } from "drizzle-orm/relations";
import { post, metaOption } from "./schema";

export const metaOptionRelations = relations(metaOption, ({one}) => ({
	post: one(post, {
		fields: [metaOption.postId],
		references: [post.id]
	}),
}));

export const postRelations = relations(post, ({many}) => ({
	metaOptions: many(metaOption),
}));