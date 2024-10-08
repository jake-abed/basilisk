import { publicProcedure, privateProcedure, router } from '../trpc';
import { z } from 'zod';
import {
	getMostRecentNotes,
	getRecentNotesByUser,
	createNote,
} from '@/lib/utils/notes';
import { auth } from '@/auth';

const noteSchema = z.object({
	id: z.string(),
	userId: z.string(),
	content: z.string(),
	image: z.string().optional(),
	cursed: z.boolean(),
	createdAt: z.string(),
	lastUpdatedAt: z.string(),
});

const createNoteSchema = noteSchema.omit({
	id: true,
	userId: true,
	cursed: true,
	createdAt: true,
	lastUpdatedAt: true,
});

export const noteRouter = router({
	testRouter: publicProcedure.query(async () => 'Note Router is functional!'),
	getMostRecentNotes: privateProcedure
		.input(z.object({ limit: z.number(), page: z.number() }))
		.query(async (opts) => {
			const { limit, page } = opts.input;
			return await getMostRecentNotes({ limit, page });
		}),
	getLatestNotesByUser: privateProcedure
		.input(z.object({ userId: z.string(), qty: z.number(), page: z.number() }))
		.query(async (opts) => {
			const { userId, qty, page } = opts.input;
			return await getRecentNotesByUser(userId, { limit: qty, page: page });
		}),
	createNote: privateProcedure
		.input(createNoteSchema)
		.mutation(async (opts) => {
			const user = await auth();
			const userId = user?.user?.id;
			if (!userId) throw Error('No such user');
			const { content, image } = opts.input;
			return await createNote(Number(userId), content, image);
		}),
});
