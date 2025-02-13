import { useMultiplayerContext } from '@/app/hooks';
import { useState } from 'react';

export default function FindPlayerForm() {
  const [rivalId, setRivalId] = useState('');
  const { onlineId, challengeUser } = useMultiplayerContext();

  return (
    <form
      className="flex flex-col items-center max-w-[400px] w-full"
      onSubmit={(e) => {
        e.preventDefault();
        challengeUser({ challengerId: onlineId, rivalId });
      }}
    >
      <input
        type="text"
        placeholder="Type Rival ID"
        className="p-2 w-full border border-gray-300 rounded-md text-black"
        onChange={(e) => setRivalId(e.target.value)}
      />
      <button
        type="submit"
        className="max-w-[300px] p-2 cursor-pointer text-black bg-white rounded-md"
      >
        Challenge
      </button>
    </form>
  );
}
