import { ArenaProvider } from '@/app/context';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ArenaProvider>
      <div className="w-full grid place-items-center">
        <div className="w-full max-w-[1000px] m-4 flex flex-col justify-center gap-4 relative border-[10px] border-solid border-white">
          {children}
        </div>
      </div>
    </ArenaProvider>
  );
}
