'use client';
import { trpc } from '../_trpc/client';
import { UserTag } from '../../components/ui/UserTag';

export default function Page() {
	const userQuery = trpc.user.currentUser.useQuery();
	const user = userQuery?.data?.user;

	console.log(userQuery.isLoading);

	return (
		<>
			<header className='flex flex-row justify-between w-full'>
				<h1 className='text-slate-200 font-extrabold text-lg p-4'>BASILISK</h1>
				{userQuery.isLoading ? (
					<div className='flex flex-col justify-end items-end animate-pulse p-4 gap-4'>
						<div className='bg-slate-700 w-[50px] h-[50px] rounded-full'></div>
						<p className='text-xs text-center font-bold text-stone-200'>
							LOADING
						</p>
					</div>
				) : user?.email && user?.image ? (
					<UserTag username={user?.email} pic={user?.image} />
				) : null}
			</header>
		</>
	);
}
