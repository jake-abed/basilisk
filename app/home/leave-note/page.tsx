'use client';
import { trpc } from '../../_trpc/client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Page() {
	const [message, setMessage] = useState<string>('');
	const router = useRouter();
	const createNote = trpc.notes.createNote.useMutation({
		onSuccess: () => {
			console.log('Testing 123');
			router.push('/home');
		},
	});

	return (
		<>
			<form
				className='flex flex-col gap-4'
				onSubmit={(e) => {
					e.preventDefault();
					createNote.mutate({ content: message });
				}}
			>
				<textarea
					maxLength={255}
					name='note'
					rows={6}
					className='border-solid border-4 border-emerald-950 focus-visible:outline-none focus-visible:border-4 focus-visible:border-emerald-700 focus-visible:border-solid focus:border-none bg-stone-200 text-md text-stone-900 p-2 rounded-xl resize-none'
					placeholder='Fine or foul to come...'
					value={message}
					onChange={(e) => {
						setMessage(e.target.value);
					}}
					required
				></textarea>
				<input
					className='bg-stone-600 rounded-lg text-white text-lg font-bold p-2'
					type='submit'
				></input>
			</form>
		</>
	);
}
