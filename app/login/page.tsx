import Link from 'next/link';
import { signIn } from '@/auth';

export default function Page() {
	return (
		<main className='flex min-h-screen flex-col items-center justify-center p-24'>
			<div className='flex justify-center items-center flex-col min-w-72 min-h-[50svh] bg-stone-900 rounded-lg p-8 gap-8'>
				<h1 className='text-center text-3xl text-stone-200 font-extrabold'>
					LOGIN OR SIGNUP
				</h1>
				<form
					className='flex flex-col gap-4'
					action={async (formData) => {
						'use server';
						await signIn('sendgrid', formData);
					}}
				>
					<input
						className='border-solid border-4 border-emerald-950 invalid:border-red-700 focus-visible:outline-none focus-visible:border-4 focus-visible:border-emerald-700 focus-visible:border-solid focus:border-none bg-stone-200 text-md text-stone-900 p-2 rounded-lg'
						type='email'
						name='email'
						placeholder='john@dark.souls'
						required
					></input>
					<button
						type='submit'
						className='bg-stone-700 text-stone-200 font-extrabold text-xl p-4 rounded-lg'
					>
						LOGIN
					</button>
				</form>
			</div>
		</main>
	);
}
