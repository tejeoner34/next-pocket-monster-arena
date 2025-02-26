import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { pokemon } from '../ui/fonts';
import '../globals.css';
import Header from '../ui/components/header';

import { ThemeContextProvider } from '../context/theme-context';
import ReactQueryProvider from '../context/query-client';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Languages, routing } from '@/i18n/routing';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Pocket Monster Arena',
  description: 'Pocket Monster Arena game for the web',
};

export default async function LocaleLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as Languages)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();
  return (
    <html lang={locale}>
      <body
        className={`${pokemon.className} ${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}
      >
        <NextIntlClientProvider messages={messages}>
          <Header />
          <ReactQueryProvider>
            <ThemeContextProvider>{children}</ThemeContextProvider>
          </ReactQueryProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
