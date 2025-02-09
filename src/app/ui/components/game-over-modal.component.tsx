import { useRouter } from 'next/router';
import Link from 'next/link';

export default function GameOverModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const router = useRouter();

  const handlePlayAgain = () => {
    router.push('/arena');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50" onClick={onClose}></div>

      <div className="relative w-3/6 max-w-full min-h-[180px] p-4 flex flex-col justify-center items-center text-center bg-background border-2 border-foreground text-textPrimary z-10">
        <h2>Game Over</h2>
        <p>Message about the game outcome</p>
        <button
          className="bg-inherit px-4 py-2 cursor-pointer text-inherit mt-4 hover:shadow-lg"
          onClick={handlePlayAgain}
        >
          Play Again
        </button>
        <Link
          href="/"
          className="bg-inherit px-4 py-2 cursor-pointer text-inherit mt-2 hover:shadow-lg"
        >
          Exit
        </Link>
      </div>
    </div>
  );
}
