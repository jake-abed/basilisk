import Link from 'next/link';

export default function Home() {
	return (
		<main className='flex min-h-screen flex-col items-center justify-center p-24'>
			<div className='flex justify-center items-center flex-col min-w-72 min-h-[50svh] bg-stone-900 rounded-xl p-8 gap-8'>
				<h1 className='text-center text-3xl text-stone-200 font-extrabold p-4'>
					BASILISK
				</h1>
				<Link
					href='/login'
					className='text-xl text-center w-1/2 font-bold text-stone-200 bg-stone-600 px-12 py-4 rounded-xl hover:bg-stone-700'
				>
					LOGIN
				</Link>
			</div>
		</main>
	);
}
