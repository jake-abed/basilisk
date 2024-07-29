import {
	generateUploadButton,
	generateUploadDropzone,
} from '@uploadthing/react';

import type { OurFileRouter } from '@/app/api/uploadthing/core';

//Export the generated UI components from UploadThing
export const UploadButton = generateUploadButton<OurFileRouter>();
export const UploadDropzone = generateUploadButton<OurFileRouter>();
