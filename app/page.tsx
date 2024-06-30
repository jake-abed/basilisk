import Image from 'next/image';

export default function Home() {
	return (
		<main className='flex min-h-screen flex-col items-center justify-center p-24'>
			<div className='flex justify-center items-center min-w-72 min-h-[50svh] bg-stone-900 rounded-xl p-8'>
				<h1 className='text-center text-3xl text-stone-200 font-bold'>
					WELCOME TO BASILISK
				</h1>
			</div>
		</main>
	);
}
