import type { NextAuthConfig } from 'next-auth';
import { getUserByEmail } from './lib/utils/users';
import PostgresAdapter from '@auth/pg-adapter';
import { Pool } from '@neondatabase/serverless';
import Sendgrid from 'next-auth/providers/sendgrid';

const pool = new Pool({ connectionString: process.env.POSTGRES_URL });

export const authConfig = {
	adapter: PostgresAdapter(pool),
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
	providers: [
		Sendgrid({
			from: 'admin@jakeabed.dev',
		}),
	],
} satisfies NextAuthConfig;
