import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';
import Discord from 'next-auth/providers/discord';

export const { handlers, signIn, signOut, auth } = NextAuth({
	providers: [GitHub, Discord],
});
