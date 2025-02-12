type ReceiveChallengeModalProps = {
  isOpen: boolean;
  challenderId: string;
  onAccept: () => void;
  onDecline: () => void;
};

export default function ReceiveChallengedModal({
  isOpen,
  challenderId,
  onAccept,
  onDecline,
}: ReceiveChallengeModalProps) {
  if (!isOpen) return null;
  return (
    <>
      <div className="fixed inset-0 bg-black opacity-50 z-10"></div>

      <div className="fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-600 p-4 border-8 border-black flex flex-col items-center justify-center text-center z-20 w-2/3 max-w-[90%]">
        <p className="leading-5 text-wrap">{challenderId} is challenging you to a battle!</p>
        <button onClick={onAccept} className="mt-8 p-4 bg-green-500 text-white rounded">
          Accept
        </button>
        <button onClick={onDecline} className="mt-8 p-4 bg-red-500 text-white rounded">
          Decline
        </button>
      </div>
    </>
  );
}
