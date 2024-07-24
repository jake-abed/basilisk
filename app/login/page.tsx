import Link from 'next/link';
import { signIn } from '@/auth';

export default function Page() {
	return (
		<main className='flex min-h-screen flex-col items-center justify-center p-24'>
			<div className='flex justify-center items-center flex-col min-w-72 min-h-[50svh] bg-stone-900 rounded-xl p-8 gap-8'>
				<h1 className='text-center text-3xl text-stone-200 font-extrabold'>
					LOGIN OR SIGNUP
				</h1>
				<form
					action={async (formData) => {
						'use server';
						await signIn('sendgrid', formData);
					}}
				>
					<input type='text' name='email' placeholder='john@dark.souls'></input>
					<button type='submit'>LOGIN</button>
				</form>
			</div>
		</main>
	);
}
