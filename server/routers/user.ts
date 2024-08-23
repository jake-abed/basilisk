import { publicProcedure, privateProcedure, router } from '../trpc';
import { z } from 'zod';
import {
	getFirstUser,
	getUserByEmail,
	addUser,
	updateUserInfo,
} from '@/lib/utils/users';
import { auth } from '@/auth';

const UserSchema = z.object({
	id: z.number(),
	username: z.string(),
	email: z.string(),
	image: z.string().default(''),
});

export const userRouter = router({
	getFirstUser: privateProcedure.query(getFirstUser),
	currentUser: privateProcedure.query(async () => {
		const userInfo = await auth();
		if (userInfo === null) {
			throw new Error('No current session!');
		}
		if (userInfo.user === undefined) {
			throw new Error('User undefined!');
		}
		return userInfo.user;
	}),
	getUserByEmail: privateProcedure.input(z.string()).query(async (opts) => {
		return getUserByEmail(opts.input);
	}),
	addUser: publicProcedure
		.input(z.object({ email: z.string(), image: z.string().optional() }))
		.mutation(async (opts) => {
			const { email, image } = opts.input;
			return await addUser(email, image);
		}),
	updateUser: privateProcedure.input(UserSchema).mutation(async (opts) => {
		const user = opts.input;
		return await updateUserInfo(user);
	}),
});
