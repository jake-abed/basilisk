import { sql } from '@vercel/postgres';
import type { User } from '@/lib/types/definitions';

async function getFirstUser() {
	try {
		const res = await sql`SELECT * FROM users ORDER BY created_at ASC LIMIT 1`;
		console.log(res.rows[0]);
		return res.rows[0];
	} catch (error) {
		console.error(error);
		return error;
	}
}

async function getUserByEmail(email: string) {
	try {
		const res = await sql`
			SELECT * FROM users
				WHERE email
				LIKE ${email}
				LIMIT 1`;
		return res.rows[0];
	} catch (error) {
		console.error(error);
		return error;
	}
}

async function updateUserInfo(user: User) {
	try {
		const res = await sql`
			UPDATE users
				SET username = ${user.username}, image = ${user.image}
				WHERE id = ${user.id}
		`;
		return res.rows;
	} catch (error) {
		console.error(error);
		return error;
	}
}

async function addUser(email: string, image: string | null = null) {
	try {
		const res = await sql`
			INSERT INTO users
				(username, email, image)
				VALUES (${email}, ${email}, ${image})`;
		return res;
	} catch (error) {
		console.error(error);
		return error;
	}
}

export { getFirstUser, getUserByEmail, addUser, updateUserInfo };
