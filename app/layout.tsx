import { Suspense } from 'react';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

import Header from '../components/Header/Header';
import Providers from './provider';

export const metadata: Metadata = {
  metadataBase: new URL('https://rental-car-zeta-livid.vercel.app'),
  title: {
    default: 'Rental Car | Find your perfect rental car',
    template: '%s | Rental Car',
  },
  description:
    'Browse available rental cars, compare prices, and find the right car for your next journey.',
  applicationName: 'Rental Car',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Rental Car',
    title: 'Rental Car | Find your perfect rental car',
    description:
      'Browse available rental cars, compare prices, and find the right car for your next journey.',
  },
};

const manrope = localFont({
  src: [
    { path: '../public/fonts/Manrope-Regular.woff2', weight: '400' },
    { path: '../public/fonts/Manrope-Medium.woff2', weight: '500' },
    { path: '../public/fonts/Manrope-SemiBold.woff2', weight: '600' },
    { path: '../public/fonts/Manrope-Bold.woff2', weight: '700' },
  ],
  variable: '--font-manrope',
  display: 'swap',
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={manrope.variable} data-scroll-behavior="smooth">
      <body>
        <Suspense
          fallback={<header style={{ height: 'var(--header-height)' }} />}
        >
          <Header />
        </Suspense>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
