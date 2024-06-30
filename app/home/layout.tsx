import React from 'react';

export default function HomeLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<nav className='fixed bottom-0'>
				<ul className='flex w-screen justify-center gap-8'>
					<li>HOME</li>
					<li>NEW POST</li>
					<li>ACCOUNT</li>
				</ul>
			</nav>
			{children}
		</>
	);
}
