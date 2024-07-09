import { sql } from '@vercel/postgres';

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

export { getFirstUser, getUserByEmail, addUser };
