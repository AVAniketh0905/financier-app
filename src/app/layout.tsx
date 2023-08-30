import '@/styles/globals.css';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ContextProvider } from '@/context/contextProvider';
import NextTopLoader from 'nextjs-toploader';
import Topbar from '@/components/topbar/Topbar';
import Footer from '@/components/Footer';
import { cn } from '@/lib/utils';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Financier',
  icons: ['financier-logo.png'],
  description: 'A personal finance tracking app built with Next.js and Prisma.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body
        className={cn(
          'flex min-h-screen flex-col bg-background',
          inter.className
        )}
      >
        <NextTopLoader
          color='hsl(var(--primary))'
          crawlSpeed={200}
          easing='ease'
          speed={200}
          shadow='0 0 10px hsl(var(--primary)),0 0 5px hsl(var(--accent))'
        />
        <ContextProvider>
          <Topbar />
          <div className='md:py-18 container h-fit grow py-2'>{children}</div>
          <Footer />
        </ContextProvider>
      </body>
    </html>
  );
}
