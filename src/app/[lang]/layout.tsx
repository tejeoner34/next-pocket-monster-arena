import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import '../globals.css';
import { pokemon } from '../ui/fonts';
import { ThemeContextProvider } from '../context/theme-context';
import ReactQueryProvider from '../context/query-client';
import Header from '../ui/components/header';
import { ArenaMovesProvider } from '../context/arena-moves-context';
import { ArenaProvider } from '../context/arena.context';

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${pokemon.className} ${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}
      >
        <Header />
        <ReactQueryProvider>
          <ThemeContextProvider>
            <ArenaProvider>
              <ArenaMovesProvider>{children}</ArenaMovesProvider>
            </ArenaProvider>
          </ThemeContextProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
