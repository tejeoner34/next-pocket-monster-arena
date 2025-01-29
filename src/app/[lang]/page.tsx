import Image from 'next/image';
import { getDictionary } from './dictionaries';
import Link from 'next/link';
import ThemeButtons from '../ui/components/theme-buttons';

export default async function Home({ params: { lang } }: { params: { lang: string } }) {
  const { home } = await getDictionary(lang);
  return (
    <div className=" flex flex-col items-center justify-center min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <Image
          src="/img/pokeball.png"
          alt="Pokeball"
          className="w-10 h-10"
          width={40}
          height={40}
        />
        <h1 className="text-2xl font-bold">POCKET MONSTER ARENA</h1>
        <Image
          src="/img/pokeball.png"
          alt="Pokeball"
          className="w-10 h-10"
          width={40}
          height={40}
        />
      </div>
      <div className="bg-foreground rounded-lg shadow-lg p-8 w-96">
        <div className="bg-backgroundSecondary">
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

          <div className="mb-6">
            <h2 className="text-lg font-medium mb-2 text-textTertiary">{home.playMultiplayer}</h2>
            <div className="flex space-x-4">
              <button className="bg-buttonTertiary font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                {home.multiplayer}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
