import { MultiplayerProvider } from '@/app/context';
import { OnlineArenaProvider } from '@/app/context/online-arena.context';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <MultiplayerProvider>
      <OnlineArenaProvider>
        <div className="w-full grid place-items-center">
          <div className="w-full max-w-[1000px] m-4 flex flex-col justify-center gap-4 relative border-[10px] border-solid border-white">
            {children}
          </div>
        </div>
      </OnlineArenaProvider>
    </MultiplayerProvider>
  );
}
