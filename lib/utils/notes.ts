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
				SELECT user_id, content, image, fine, foul, cursed, created_at
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
			SELECT n.id, n.user_id AS "userId", u.name as "username", u.image as "profilePic", n.content, n.image, n.fine, n.foul, n.cursed, n.created_at as "createdAt"
				FROM notes as n INNER JOIN users AS u ON u.id = n.user_id ORDER BY created_at DESC
				LIMIT ${opts.limit} OFFSET ${offset}
		`;
		return res.rows;
	} catch (error) {
		console.error(error);
		return error;
	}
}

export async function createNote(
	userId: number,
	content: string,
	image: string = ''
) {
	try {
		const res = await sql`
			INSERT INTO notes
				(user_id, content, image)
				VALUES (${userId}, ${content}, ${image})
		`;
		return res;
	} catch (error) {
		console.error(error);
		return error;
	}
}
