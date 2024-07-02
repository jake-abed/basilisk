import { publicProcedure, router } from '../trpc';
import { z } from 'zod';

const UserSchema = z.object({
	id: z.string(),
	username: z.string(),
	email: z.string(),
	image: z.string().default(''),
});

export const userRouter = router({
	getFirstUser: publicProcedure.query(async () => {
		return 'Groovy Q';
	}),
});
