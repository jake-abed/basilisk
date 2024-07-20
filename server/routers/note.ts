import { publicProcedure, privateProcedure, router } from '../trpc';
import { z } from 'zod';
import { auth } from '@/auth';

export const noteRouter = router({
	getNewestPost: privateProcedure.query(async () => 'Hi!'),
});
