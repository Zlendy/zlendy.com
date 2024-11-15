import * as v from 'valibot';

export const NoteFileSchema = v.object({
	id: v.string(),
	comment: v.nullish(v.string()),
	thumbnailUrl: v.string()
});

export const NoteFileListSchema = v.array(NoteFileSchema);

export const NoteSchema = v.object({
	id: v.string(),
	text: v.nullish(v.string()),
	files: NoteFileListSchema
});

export const NoteListSchema = v.array(NoteSchema);
