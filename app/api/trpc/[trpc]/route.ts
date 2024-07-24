import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { appRouter } from '@/server/index';
import { type Context } from '@/server/context';

const handler = (req: Request) =>
	fetchRequestHandler({
		endpoint: '/api/trpc',
		req,
		router: appRouter,
		//@ts-ignore
		createContext: (ctx: Context) => ctx,
		credentials: 'include',
		headers: {
			'Access-Control-Allow-Origin': '*',
		},
	});
export { handler as GET, handler as POST };
