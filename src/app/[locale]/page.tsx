import { Link } from '@/i18n/routing';
import ThemeButtons from '../ui/components/theme-buttons';
import { useTranslations } from 'next-intl';
import { routes } from '../routes';

export default function Home() {
  const t = useTranslations('home');
  return (
    <div className=" flex flex-col items-center justify-center h-full">
      <div className="bg-foreground shadow-lg p-8 w-full max-w-2xl">
        <div className="flex flex-col justify-center items-center bg-backgroundSecondary">
          <div className="mb-6">
            <h2 className="text-lg font-medium mb-2 text-textTertiary ">{t('chooseLanguage')}</h2>
            <div className="flex justify-center space-x-4">
              <Link
                href={routes.home}
                locale="en"
                className="bg-buttonPrimary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                {t('english')}
              </Link>
              <Link
                href={routes.home}
                locale="jp"
                className="bg-buttonSecondary py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                {t('japanese')}
              </Link>
            </div>
          </div>

          <ThemeButtons />

          <div className="mb-6 justify-items-center">
            <h2 className="text-lg font-medium mb-2 text-textTertiary">{t('playerVsCpu')}</h2>
            <div className="flex justify-center space-x-4">
              <Link
                href={routes.arena}
                className="bg-buttonTertiary font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                {t('play')}
              </Link>
            </div>
          </div>
          <div className="mb-6 justify-items-center">
            <h2 className="text-lg font-medium mb-2 text-textTertiary">{t('multiplayer')}</h2>
            <div className="flex justify-center space-x-4">
              <Link
                href={routes.findPlayer}
                className="bg-buttonTertiary font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                {t('play')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
