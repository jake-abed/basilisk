import { publicProcedure, router } from '../trpc';
import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { User } from '@/lib/types/definitions';

const UserSchema = z.object({
	id: z.string(),
	username: z.string(),
	email: z.string(),
	image: z.string().default(''),
});

export const userRouter = router({
	getFirstUser: publicProcedure.query(getFirstUser),
	getUserByEmail: publicProcedure.input(z.string()).query(async (opts) => {
		return getUserByEmail(opts.input);
	}),
	addUser: publicProcedure
		.input(z.object({ email: z.string(), image: z.string().optional() }))
		.mutation(async (opts) => {
			const { email, image } = opts.input;
			console.log(email, image);
			return await addUser(email, image);
		}),
});

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
		console.log(email, image);
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
