import { getDictionary } from './dictionaries';
import Link from 'next/link';
import ThemeButtons from '../ui/components/theme-buttons';
import Header from '../ui/components/header';

export default async function Home({ params: { lang } }: { params: { lang: string } }) {
  const { home } = await getDictionary(lang);
  return (
    <div className=" flex flex-col items-center justify-center min-h-screen">
      <Header />
      <div className="bg-foreground shadow-lg p-8 w-full max-w-2xl">
        <div className="flex flex-col justify-center items-center bg-backgroundSecondary">
          <div className="mb-6">
            <h2 className="text-lg font-medium mb-2 text-textTertiary ">{home.chooseLanguage}</h2>
            <div className="flex space-x-4">
              <Link
                href="/en"
                className="bg-buttonPrimary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                {home.english}
              </Link>
              <Link
                href="/jp"
                className="bg-buttonSecondary py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                {home.japanese}
              </Link>
            </div>
          </div>

          <ThemeButtons translations={home} />

          <div className="mb-6 justify-items-center">
            <h2 className="text-lg font-medium mb-2 text-textTertiary">{home.playMultiplayer}</h2>
            <div className="flex space-x-4">
              <Link
                href="/"
                className="bg-buttonTertiary font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                {home.multiplayer}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
