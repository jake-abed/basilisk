'use client';
import { trpc } from '../../_trpc/client';
import { useState } from 'react';

export default function Page() {
	const [message, setMessage] = useState<string>('');
	const createNote = trpc.notes.createNote.useMutation();

	return (
		<>
			<form>
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
				<button
					onClick={() => {
						createNote.mutate({ content: message });
					}}
				>
					Create Note
				</button>
			</form>
		</>
	);
}
