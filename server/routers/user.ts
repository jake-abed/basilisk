import { publicProcedure, router } from '../trpc';
import { z } from 'zod';
import { getFirstUser, getUserByEmail, addUser } from '@/lib/utils/users';
import { auth } from '@/auth';

const UserSchema = z.object({
	id: z.string(),
	username: z.string(),
	email: z.string(),
	image: z.string().default(''),
});

export const userRouter = router({
	getFirstUser: publicProcedure.query(getFirstUser),
	currentUser: publicProcedure.query(async () => {
		return await auth();
	}),
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
