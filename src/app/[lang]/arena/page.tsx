export default function page() {
  //   return  <div className="max-w-[1000px] mx-auto p-4 flex flex-col justify-center gap-4 relative">
  //   <div className="relative overflow-hidden h-[540px] rounded bg-gradient-to-b from-[#242400] to-[#DDECE0] pt-4">
  //     {pokemon && pokemonOpponent && (
  //       <>
  //         <div className="flex flex-row-reverse justify-around">
  //           {pokemonOpponent && <PokemonComponent className="arena__opponent-container" pokemon={pokemonOpponent} isOpponent={true} />}
  //         </div>
  //         <div className="flex justify-around items-center w-full">
  //           <PokemonComponent className="arena__pokemon-container" pokemon={pokemon} />
  //         </div>
  //       </>
  //     )}
  //     <div className="flex h-[140px] relative bottom-[46px] border-8 border-[#361e1e] z-[500]">
  //       <div className="bg-[#334f70] text-white border-6 border-[#dbb46d] w-1/2 flex items-center justify-center p-4">
  //         <p className={`leading-[30px] ${boxMessage === 'criticalHit' ? 'text-yellow-500' : ''}`}>
  //           {boxMessage}
  //         </p>
  //       </div>
  //       <div className="relative w-1/2 border-7 border-[#6e4d8c] flex flex-wrap justify-center text-xs pl-4">
  //         {pokemonMoves?.length ? (
  //           pokemonMoves.map((move, i) => (
  //             <div key={i} className="relative w-[45%] rounded-lg flex items-center cursor-pointer p-2 bg-blue-400 m-1" onClick={() => chooseMove(move, i)}>
  //               <p className="text-white">{move.name}</p>
  //             </div>
  //           ))
  //         ) : (
  //           <PokeballSpinner />
  //         )}
  //         {hasSelectedMove && <div className="absolute w-full h-full bg-gray-200 opacity-50 left-0"></div>}
  //       </div>
  //     </div>
  //   </div>
  //   <div>
  //     <button onClick={() => setMovesContainerOpen(!movesContainerOpen)} className="hidden text-black w-full p-2 rounded mt-2" disabled={hasSelectedMove}>
  //       Choose Move
  //     </button>
  //     <div className={`bg-gray-700 w-full flex flex-col items-center gap-4 p-4 absolute left-0 bottom-0 z-[1000] transition-all duration-150 ease-in-out ${movesContainerOpen ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none translate-y-[50px]'}`}>
  //       {pokemonMoves?.map((move, i) => (
  //         <div key={i} className="w-[90%] text-center bg-aquamarine p-4 cursor-pointer" onClick={() => { chooseMove(move, i); setMovesContainerOpen(false); }}>
  //           <p>{move.name}</p>
  //         </div>
  //       ))}
  //     </div>
  //   </div>
  // </div>;
}
