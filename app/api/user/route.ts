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

const CreateUser = UserSchema.omit({ id: true });

export async function POST(request: Request) {
	const body = await request.json();
	//Expects body to be in correct format.
	try {
		const { username, email, image } = CreateUser.parse(body);
		await sql`
			INSERT INTO users (username, email, image)
			VALUES (${username}, ${email}, ${image})
		`;
		return NextResponse.json('Fuck yeah, user added!', { status: 200 });
	} catch (error) {
		console.error(error);
		return NextResponse.json({ error }, { status: 500 });
	}
}
