import { useMultiplayerContext } from '@/app/hooks';

export default function FindPlayerForm() {
  let rivalId = '';
  const { onlineId, challengeUser } = useMultiplayerContext();

  return (
    <form
      className="flex flex-col items-center max-w-[400px] w-full"
      action={() => {
        challengeUser({ challengerId: onlineId, rivalId });
      }}
    >
      <input
        type="text"
        placeholder="Type Rival ID"
        className="p-2 w-full border border-gray-300 rounded-md text-black"
        onChange={(e) => (rivalId = e.target.value)}
      />
      <p className="text-white">Error Message</p>
      <button
        type="submit"
        className="max-w-[300px] p-2 cursor-pointer text-black bg-white rounded-md"
      >
        Challenge
      </button>
      <p>Challenge Status Message</p>
      <button
        type="button"
        className="max-w-[300px] p-2 cursor-pointer text-black bg-white rounded-md"
      >
        Go to Battle
      </button>
    </form>
  );
}
