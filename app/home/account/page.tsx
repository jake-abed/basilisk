'use client';
import { trpc } from '../../_trpc/client';
import { useState, useRef } from 'react';
import { UploadButton } from '@/lib/utils/uploadthing';
import { useRouter } from 'next/navigation';

export default function Page() {
	const router = useRouter();

	const userQuery = trpc.users.currentUser.useQuery();
	const user = userQuery.data;

	const updateUserInfo = trpc.users.updateUser.useMutation({
		onSuccess: () => {
			router.push('/home/account');
		},
	});
	const [editing, setEdit] = useState(false);
	const [userInfo, setUserInfo] = useState(user);

	return (
		<>
			{userQuery.isLoading ? (
				<div>
					<h2 className='animate-pulse'>LOADING...</h2>
				</div>
			) : editing ? (
				<div className='flex flex-col gap-8 p-10 max-w-5/6 md:max-w-96 bg-stone-900 m-4 rounded-lg text-center font-bold'>
					<p>
						You cannot edit your email address. You signed up with{' '}
						{userInfo?.email}.
					</p>
					<div className='flex flex-col gap-2'>
						<label className='text-left'>Username</label>
						<input
							type='text'
							name='username'
							className='text-stone-950 rounded-lg p-2'
							min={1}
							max={20}
							value={userInfo?.name ? userInfo.name : ''}
							onChange={(e) => {
								setUserInfo({ ...userInfo, name: e.target.value });
							}}
						/>
					</div>
					<div className='flex flex-col gap-6'>
						<h2>Update your PFP!</h2>
						<img
							className='rounded-full m-auto'
							src={userInfo?.image ? userInfo.image : ''}
							alt='Profile picture!'
							width={96}
							height={96}
						/>
						<UploadButton
							className='ut-button:bg-emerald-900 ut-button:ut-readying:bg-emerald-900/50 ut-button:border-solid ut-button:border-stone-200 ut-button:ut-readying:border-stone-200/50 ut-button:border-2 ut-button:ut-uploading:bg-emerald-800 ut-button:ut-uploading:after:bg-emerald-600'
							endpoint='imageUploader'
							onClientUploadComplete={(res) => {
								setUserInfo({ ...userInfo, image: res[0].url });
								console.log(res);
							}}
							onUploadError={(error: Error) => {
								alert(`Error: ${error.message}`);
							}}
						></UploadButton>
					</div>
					<div className='flex flex-row gap-2 justify-center items-center'>
						<button
							className='bg-emerald-900 px-3 py-1 rounded-lg border-stone-200 border-2 border-solid hover:bg-emerald-950'
							onClick={() => {
								setUserInfo(user);
								setEdit(false);
							}}
						>
							Cancel
						</button>
						<button
							className='bg-emerald-900 px-3 py-1 rounded-lg border-stone-200 border-2 border-solid hover:bg-emerald-950'
							onClick={() => {
								if (!userInfo?.id) return;
								updateUserInfo.mutate({
									//@ts-ignore
									email: userInfo?.email,
									id: Number(userInfo?.id),
									//@ts-ignore
									image: userInfo?.image,
									//@ts-ignore
									username: userInfo?.name,
								});
							}}
						>
							Save
						</button>
					</div>
				</div>
			) : (
				<div className='flex flex-col gap-2 p-2 text-lg'>
					<p>User: {user?.name}</p>
					<p>Email: {user?.email}</p>
					<p className='inline'>
						PFP:
						<img
							src={user?.image ? user.image : ''}
							width={64}
							height={64}
							alt={`${user?.name}'s profile picture.`}
							className='rounded-full inline mx-2'
						></img>
					</p>
					<button
						className='bg-emerald-900 px-3 py-1 rounded-lg border-stone-200 border-2 border-solid hover:bg-emerald-950'
						onClick={() => {
							setUserInfo(user);
							setEdit(true);
						}}
					>
						Edit Info
					</button>
				</div>
			)}
		</>
	);
}
