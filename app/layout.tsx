import { Geist, Geist_Mono, Inter } from 'next/font/google';

import { layoutMetadata } from '@/lib/metadata';
import { cn } from '@/lib/utils';

import Footer from '@/components/Footer';
import Header from '@/components/Header';

import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata = layoutMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        'h-full',
        'antialiased',
        geistSans.variable,
        geistMono.variable,
        'font-sans',
        inter.variable
      )}
    >
      <body className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 container mx-auto py-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
