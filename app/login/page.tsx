import Link from 'next/link';
import { signIn } from '@/auth';

export default function Page() {
	return (
		<main className='flex min-h-screen flex-col items-center justify-center p-24'>
			<div className='flex justify-center items-center flex-col min-w-72 min-h-[50svh] bg-stone-900 rounded-xl p-8 gap-8'>
				<h1 className='text-center text-3xl text-stone-200 font-extrabold'>
					LOGIN OR SIGNUP
				</h1>
				<form action={loginWithGitHub}>
					<button type='submit'>LOGIN WITH GITHUB</button>
				</form>
				<form action={loginWithDiscord}>
					<button type='submit'>LOGIN WITH DISCORD</button>
				</form>
			</div>
		</main>
	);
}

async function loginWithGitHub() {
	'use server';
	await signIn('github');
}

async function loginWithDiscord() {
	'use server';
	await signIn('discord');
}
