'use client';
import { useMultiplayerContext } from '@/app/hooks';
import { useCopyClipboard } from '@/app/hooks/useCopyClipboard';
import { REQUEST_STATUSES, RequestStatusType } from '@/app/models';
import FindPlayerForm from '@/app/ui/components/find-player-form.component';
import PokeballSpinner from '@/app/ui/components/pokeball-spinner.component';
import ReceiveChallengedModal from '@/app/ui/components/receive-challenge-modal.component';
import { useTranslations } from 'next-intl';

export const requestStatusMessages: Record<RequestStatusType, string> = {
  [REQUEST_STATUSES.PENDING]: 'waitingResponse',
  [REQUEST_STATUSES.ACCEPTED]: 'opponentAccepted',
  [REQUEST_STATUSES.REJECTED]: 'opponentRejected',
  [REQUEST_STATUSES.NO_USER]: 'noUserFound',
  [REQUEST_STATUSES.NOT_SENT]: '',
};

export default function Page() {
  const t = useTranslations('findPlayer');
  const { receivedChallenge, onlineId, declineChallenge, acceptChallenge, challengeRequestStatus } =
    useMultiplayerContext();
  const { isCopied, copyToClipboard } = useCopyClipboard();
  const showSpinner =
    challengeRequestStatus.status === REQUEST_STATUSES.PENDING ||
    challengeRequestStatus.status === REQUEST_STATUSES.ACCEPTED;

  return (
    <div className="w-full h-full flex justify-center pt-2.5">
      <div className="min-w-[350px] max-w-[500px] h-fit border-8 border-white p-4 flex flex-col items-center justify-center text-center shadow-lg">
        <h2 className="text-xs leading-5">
          {t('title')}
          {onlineId}
        </h2>
        <div>
          <button
            className="px-2 py-1 cursor-pointer text-black bg-white rounded-md"
            onClick={() => copyToClipboard(onlineId)}
          >
            {isCopied ? t('copied') : t('copy-id')}
          </button>
        </div>
        <FindPlayerForm />

        {challengeRequestStatus.isSent && (
          <p>{t(`requestStatus.${requestStatusMessages[challengeRequestStatus.status]}`)}</p>
        )}
      </div>
      <ReceiveChallengedModal
        challenderId={receivedChallenge.challengerId}
        isOpen={!!receivedChallenge.challengerId}
        onAccept={acceptChallenge}
        onDecline={declineChallenge}
      />
      {showSpinner && <PokeballSpinner />}
    </div>
  );
}
