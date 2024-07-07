import type { NextAuthConfig } from 'next-auth';
import Github from 'next-auth/providers/github';
import Discord from 'next-auth/providers/discord';

export const authConfig = {
	pages: {
		signIn: '/login',
	},
	callbacks: {
		authorized({ auth, request: { nextUrl } }) {
			const isLoggedIn = !!auth?.user;
			const isOnLoginPage = nextUrl.pathname.startsWith('/login');
			const isOnHome = nextUrl.pathname.startsWith('/home');
			if (isLoggedIn && isOnLoginPage) {
				return Response.redirect(new URL('/home', nextUrl));
			} else if (!isLoggedIn && isOnHome) {
				return false;
			}
			return true;
		},
	},
	providers: [Github, Discord],
} satisfies NextAuthConfig;
