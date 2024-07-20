import { sql } from '@vercel/postgres';
import { type Note } from '@/lib/types/definitions';

type NoteOpts = {
	limit: number;
	page: number;
};

export async function getRecentNotesByUser(
	userId: string,
	opts: NoteOpts = { limit: 10, page: 1 }
) {
	let offset: number = opts.page === 1 ? 0 : opts.page - 1 * opts.limit;
	try {
		const res = await sql`
				SELECT user_id, content, image, created_at
					FROM NOTES WHERE user_id = ${userId}
					ORDER BY created_at DESC
					LIMIT ${opts.limit} OFFSET ${offset}
			`;
		return res.rows;
	} catch (error) {
		console.error(error);
		return error;
	}
}

export async function getMostRecentNotes(
	opts: NoteOpts = { limit: 20, page: 1 }
) {
	let offset: number = opts.page === 1 ? 0 : opts.page - 1 * opts.limit;
	try {
		const res = await sql`
			SELECT user_id, content, image, created_at
				FROM NOTES ORDER BY created_at DESC
				LIMIT ${opts.limit} OFFSET ${offset}
		`;
		return res.rows;
	} catch (error) {
		console.error(error);
		return error;
	}
}

export async function createNote(
	userId: string,
	content: string,
	image: string | null = null
) {
	try {
		const res = await sql`
			INSERT INTO notes
				(user_id, content, image)
				(${userId}, ${content}, ${image})
		`;
		return res;
	} catch (error) {
		console.error(error);
		return error;
	}
}
