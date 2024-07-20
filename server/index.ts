import { publicProcedure, router } from './trpc';
import { userRouter } from './routers/user';
import { noteRouter } from './routers/note';

export const appRouter = router({
	sayHi: publicProcedure.query(async () => {
		console.log('Hi!');
		return 'Hi!';
	}),
	user: userRouter,
	post: noteRouter,
});

export type AppRouter = typeof appRouter;
