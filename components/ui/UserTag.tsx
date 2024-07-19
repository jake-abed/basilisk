import Link from 'next/link';

export function UserTag({
	username,
	pic,
}: {
	username: string | undefined | null;
	pic: string | undefined | null;
}) {
	return (
		<>
			<div className='flex flex-col justify-end items-end gap-4 p-4'>
				{!!pic ? (
					<img className='rounded-full' src={pic} width={50} height={50} />
				) : (
					<div className='rounded-full bg-slate-700'></div>
				)}
				<Link
					href='/logout'
					className='text-xs text-center font-bold text-stone-200'
				>
					LOGOUT
				</Link>
			</div>
		</>
	);
}
