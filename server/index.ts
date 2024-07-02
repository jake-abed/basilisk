import { publicProcedure, router } from './trpc';
import { userRouter } from './routers/user';

export const appRouter = router({
	sayHi: publicProcedure.query(async () => {
		console.log('Hi!');
		return 'Hi!';
	}),
	user: userRouter,
});

export type AppRouter = typeof appRouter;
