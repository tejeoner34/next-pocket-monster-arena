export default function Page() {
  return (
    <div className="w-full h-full flex justify-center pt-2.5">
      <div className="min-w-[350px] max-w-[500px] h-fit border-8 border-white p-4 flex flex-col items-center justify-center text-center shadow-lg">
        <h2 className="text-xs leading-5">Your ID</h2>
        <div>
          <button className="px-2 py-1 cursor-pointer text-black bg-white rounded-md">
            Copy ID
          </button>
        </div>
        <p className="text-[11px] opacity-60">Challenge Information</p>
        <form className="flex flex-col items-center max-w-[400px] w-full">
          <input
            type="text"
            placeholder="Type Rival ID"
            className="p-2 w-full border border-gray-300 rounded-md"
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
      </div>
    </div>
  );
}
