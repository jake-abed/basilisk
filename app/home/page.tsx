'use client';
import { trpc } from '../_trpc/client';

export default function Page() {
	const mostRecentNotes = trpc.notes.getMostRecentNotes.useQuery({
		limit: 10,
		page: 1,
	});

	return (
		<div className='flex flex-col gap-4 p-4'>
			{mostRecentNotes?.data
				? mostRecentNotes.data.map((note) => (
						<p className='bg-emerald-950 p-2'>{note.content}</p>
				  ))
				: null}
		</div>
	);
}
