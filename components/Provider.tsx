'use client';

import { useState } from 'react';
import { QueryClient } from '@tanstack/react-query';
import { trpc } from '@/app/_trpc/client';
import { httpBatchLink } from '@trpc/react-query';

export default function Provider() {
	const [queryClient] = useState(() => new QueryClient());
}
