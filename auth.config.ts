import type { NextAuthConfig } from 'next-auth';
import Github from 'next-auth/providers/github';
import Discord from 'next-auth/providers/discord';
import { getUserByEmail } from './lib/utils/users';

export const authConfig = {
	pages: {
		signIn: '/login',
		signOut: '/logout',
	},
	callbacks: {
		async authorized({ auth, request: { nextUrl } }) {
			const isLoggedIn = !!auth?.user;
			const userEmail = auth?.user?.email;
			const isOnLoginPage = nextUrl.pathname.startsWith('/login');
			const isOnHome = nextUrl.pathname.startsWith('/home');
			if (isLoggedIn && isOnLoginPage) {
				if (userEmail) {
					const user = await getUserByEmail(userEmail);
				}
				return Response.redirect(new URL('/home', nextUrl));
			} else if (!isLoggedIn && isOnHome) {
				return false;
			}
			return true;
		},
	},
	providers: [Github, Discord],
} satisfies NextAuthConfig;
