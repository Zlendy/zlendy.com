import { PUBLIC_FEDIVERSE_HOST } from '$env/static/public';
import * as v from 'valibot';

const FEDIVERSE_HOST_NOPROTOCOL = PUBLIC_FEDIVERSE_HOST.replace(/^https?:\/\//, '');

export type NoteFile = v.InferInput<typeof NoteFileSchema>;
export const NoteFileSchema = v.object({
	id: v.string(),
	comment: v.nullish(v.string()),
	thumbnailUrl: v.string()
});

export type NoteFileList = v.InferInput<typeof NoteFileListSchema>;
export const NoteFileListSchema = v.array(NoteFileSchema);

export type NoteUser = v.InferInput<typeof NoteUserSchema>;
export const NoteUserSchema = v.object({
	name: v.string(),
	username: v.string(),
	host: v.nullish(v.string(), FEDIVERSE_HOST_NOPROTOCOL),
	avatarUrl: v.string()
});

export type Note = v.InferInput<typeof NoteSchema>;
export const NoteSchema = v.object({
	id: v.string(),
	text: v.nullish(v.string()),
	files: NoteFileListSchema,
	reactions: v.record(v.string(), v.number()),
	reactionEmojis: v.record(v.string(), v.string()),
	user: NoteUserSchema,
	renoteCount: v.number(),
	repliesCount: v.number()
});

export type NoteList = v.InferInput<typeof NoteListSchema>;
export const NoteListSchema = v.array(NoteSchema);

export type Emoji = v.InferInput<typeof EmojiSchema>;
export const EmojiSchema = v.object({
	name: v.string(),
	url: v.string()
});

export type EmojiList = v.InferInput<typeof EmojiListSchema>;
export const EmojiListSchema = v.object({
	emojis: v.array(EmojiSchema)
});
