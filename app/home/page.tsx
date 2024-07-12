'use client';
import { trpc } from '../_trpc/client';

export default function Page() {
	const user = trpc.user.currentUser.useQuery();
	return (
		<section>
			<h1>WELCOME INTO BASILISK</h1>
			<p>{user ? user?.data?.user?.email : ''}</p>
			{user.data?.user?.image ? (
				<img
					className='rounded-full'
					src={user.data?.user?.image}
					width={50}
					height={50}
				/>
			) : (
				<></>
			)}
		</section>
	);
}
