import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function UserLeftArenaModal({ isOpen }: { isOpen: boolean }) {
  const t = useTranslations('userLeftArenaModal');
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="relative w-3/6 max-w-full min-h-[180px] p-4 flex flex-col justify-center items-center text-center bg-background border-2 border-foreground text-textPrimary z-10">
        <h2>{t('title')}</h2>
        <Link
          href="/"
          className="bg-inherit px-4 py-2 cursor-pointer text-inherit mt-2 hover:shadow-lg"
        >
          {t('cta')}
        </Link>
      </div>
    </div>
  );
}
