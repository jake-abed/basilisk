import Link from 'next/link';
import { signOut } from 'next-auth/react';

export function UserTag({
	username,
	pic,
}: {
	username: string | undefined | null;
	pic: string | undefined | null;
}) {
	return (
		<>
			<div className='flex flex-row-reverse justify-end items-center gap-4 p-4'>
				{!!pic ? (
					<img className='rounded-full' src={pic} width={50} height={50} />
				) : (
					<div className='rounded-full bg-slate-700'></div>
				)}
				<button
					onClick={() => signOut()}
					className='text-xs text-center font-bold text-stone-200'
				>
					LOGOUT
				</button>
			</div>
		</>
	);
}
