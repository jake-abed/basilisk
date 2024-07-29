'use client';
import { trpc } from '../_trpc/client';
import { Note } from '@/lib/types/definitions';

export default function Page() {
	const mostRecentNotes = trpc.notes.getMostRecentNotes.useQuery({
		limit: 20,
		page: 1,
	});
	const notes = mostRecentNotes.data as Array<Note>;

	return (
		<div className='flex flex-col gap-4 p-4'>
			{mostRecentNotes?.data
				? notes.map((note: Note) => (
						<div
							className='bg-emerald-950 p-4 rounded-lg flex flex-col gap-4'
							key={note.id}
						>
							<div className='flex justify-between items-center'>
								<img
									src={note.profilePic}
									height={48}
									width={48}
									className='rounded-full'
								></img>
								<p className='text-md font-bold text-stone-200'>
									{note.username}
								</p>
							</div>
							<p className='text-stone-200 font-normal text-lg'>
								{note.content}
							</p>
						</div>
				  ))
				: null}
		</div>
	);
}
