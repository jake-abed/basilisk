import * as trpcNext from '@trpc/server/adapters/next';
import { auth } from '@/auth';

export async function createContext({
	req,
	res,
}: trpcNext.CreateNextContextOptions) {
	async function getUserFromAuth() {
		try {
			const user = await auth();
			return !!user?.user;
		} catch (e) {
			console.error(e);
			return null;
		}
	}
	const user = await getUserFromAuth();
	return {
		user,
	};
}
export type Context = Awaited<ReturnType<typeof createContext>>;
