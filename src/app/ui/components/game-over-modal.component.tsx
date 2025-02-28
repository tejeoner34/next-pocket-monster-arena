import { routes } from '@/app/routes';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

export default function GameOverModal({
  isOpen,
  onClose,
  onAccept,
}: {
  isOpen: boolean;
  onClose: () => void;
  onAccept: () => void;
}) {
  const t = useTranslations('gameOverModal');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50" onClick={onClose}></div>

      <div className="relative w-3/6 max-w-full min-h-[180px] p-4 flex flex-col justify-center items-center text-center bg-background border-2 border-foreground text-textPrimary z-10">
        <h2 className="text-lg">{t('title')}</h2>
        <button className="bg-inherit px-4 py-2 text-inherit mt-4 shadow-lg" onClick={onAccept}>
          {t('playAgain')}
        </button>
        <Link href={routes.home} className="bg-inherit px-4 py-2 text-inherit mt-2 shadow-lg">
          {t('exit')}
        </Link>
      </div>
    </div>
  );
}
