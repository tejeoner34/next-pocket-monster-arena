'use client';
import { useMultiplayerContext } from '@/app/hooks';
import { useCopyClipboard } from '@/app/hooks/useCopyClipboard';
import FindPlayerForm from '@/app/ui/components/find-player-form.component';
import ReceiveChallengedModal from '@/app/ui/components/receive-challenge-modal.component';

export default function Page() {
  const { challengerId, onlineId, declineChallenge, acceptChallenge } = useMultiplayerContext();
  const { isCopied, copyToClipboard } = useCopyClipboard();

  return (
    <div className="w-full h-full flex justify-center pt-2.5">
      <div className="min-w-[350px] max-w-[500px] h-fit border-8 border-white p-4 flex flex-col items-center justify-center text-center shadow-lg">
        <h2 className="text-xs leading-5">Your ID: {onlineId}</h2>
        <div>
          <button
            className="px-2 py-1 cursor-pointer text-black bg-white rounded-md"
            onClick={() => copyToClipboard(onlineId)}
          >
            {isCopied ? 'Copied' : 'Copy ID'}
          </button>
        </div>
        <FindPlayerForm />
      </div>
      <ReceiveChallengedModal
        challenderId={challengerId}
        isOpen={!!challengerId}
        onAccept={acceptChallenge}
        onDecline={declineChallenge}
      />
    </div>
  );
}
