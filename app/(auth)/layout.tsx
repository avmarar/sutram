import { ClerkProvider } from '@clerk/nextjs';
import type { Metadata } from 'next';

import '../globals.css';

export const metadata: Metadata = {
    title: 'ThreadLoom',
    description: 'ThreadLoom • Community discussions woven together'
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <ClerkProvider>
            <html lang="en">
                <body className={`{inter.className} bg-dark-1`}>
                    <div className="w-full flex justify-center items-center min-h-screen">{children}</div>
                </body>
            </html>
        </ClerkProvider>
    );
};

export default RootLayout;
