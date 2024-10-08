import { createUploadthing, type FileRouter } from 'uploadthing/next';
import { UploadThingError } from 'uploadthing/server';
import { auth } from '@/auth';

const f = createUploadthing();

export const ourFileRouter = {
	imageUploader: f({ image: { maxFileSize: '2MB' } })
		.middleware(async () => {
			const user = await auth();
			if (!user) throw new UploadThingError('Unauthorized');
			return { userId: user?.user?.id };
		})
		.onUploadComplete(async ({ metadata, file }) => {
			return { uploadedBy: metadata.userId };
		}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
