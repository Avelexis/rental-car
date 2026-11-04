import { Suspense } from 'react';
import localFont from 'next/font/local';
import './globals.css';

import Header from '../components/Header/Header';
import Providers from './provider';

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
    <html lang="en" className={manrope.variable}>
      <body>
        <Suspense fallback={<header style={{ height: 'var(--header-height)' }} />}>
          <Header />
        </Suspense>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
