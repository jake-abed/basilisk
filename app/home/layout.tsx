'use client';
import React from 'react';
import Link from 'next/link';
import { trpc } from '../_trpc/client';
import { UserTag } from '../../components/ui/UserTag';

export default function HomeLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const userQuery = trpc.users.currentUser.useQuery();
	const user = userQuery?.data;

	return (
		<>
			<header className='bg-emerald-950 flex flex-row justify-between items-center w-full'>
				<h1 className='text-slate-200 font-extrabold text-3xl p-4'>BASILISK</h1>
				{userQuery.isLoading ? (
					<div className='flex flex-row-reverse justify-end items-center animate-pulse p-4 gap-4'>
						<div className='bg-slate-700 w-[50px] h-[50px] rounded-full'></div>
						<p className='text-xs text-center font-bold text-stone-200'>
							LOADING...
						</p>
					</div>
				) : user?.email && user?.image ? (
					<UserTag username={user.name} pic={user.image} />
				) : null}
			</header>
			<section className='flex m-auto justify-center items-center pb-24'>
				{children}
			</section>
			<nav className='fixed bottom-0 py-4'>
				<ul className='flex w-screen justify-center gap-4 text-stone-200 font-bold text-sm lg:text-md xl:text-xl'>
					<Link href='/home'>
						<li className=' bg-emerald-900 drop-shadow-2xl border-solid border-stone-200 border-2 rounded-xl px-3 py-2'>
							HOME
						</li>
					</Link>
					<Link href='/home/leave-note'>
						<li className='bg-emerald-900 border-solid border-stone-200 border-2 rounded-xl px-3 py-2'>
							LEAVE NOTE
						</li>
					</Link>
					<Link href='/home/account'>
						<li className='bg-emerald-900 border-solid border-stone-200 border-2 rounded-xl px-3 py-2'>
							ACCOUNT
						</li>
					</Link>
				</ul>
			</nav>
		</>
	);
}
