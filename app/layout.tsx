import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Provider from '@/app/_trpc/Provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Basilisk - Cursed Social Media',
	description: `It'll make you really want to go home. You don't have the right, O, you don't have the right.`,
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body className={inter.className}>
				<Provider>{children}</Provider>
			</body>
		</html>
	);
}
