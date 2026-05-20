import { Geist, Geist_Mono, Inter } from 'next/font/google';
import Script from 'next/script';

import { layoutMetadata } from '@/lib/metadata';
import { cn } from '@/lib/utils';

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import ReactQueryProvider from '@/components/providers/ReactQueryProvider';

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
        <ReactQueryProvider>
          <main className="flex-1 container mx-auto py-10">{children}</main>
        </ReactQueryProvider>
        <Footer />
        <Script
          src="https://stats.ubrun.fr/script.js"
          data-website-id="593be361-33d4-4ac2-b85a-558bf6d8a004"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
