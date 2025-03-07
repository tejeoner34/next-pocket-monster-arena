import { useMovesGamePad } from '@/app/hooks/useMovesGamePad';
import { MoveDetail } from '@/app/models/pokemon-model';

type InfoBoxMovesPadProps = {
  moves: [MoveDetail, MoveDetail, MoveDetail, MoveDetail];
  isTurnOver: boolean;
  onChoseMove: (move: MoveDetail) => void;
};

export default function InfoBoxMovesPad({ moves, isTurnOver, onChoseMove }: InfoBoxMovesPadProps) {
  const { handleClick, movesMatrix, selectedCol, selectedRow } = useMovesGamePad(
    moves,
    onChoseMove,
    isTurnOver
  );

  return (
    <div className="bg-foreground relative w-1/2 border-8 border-[#6e4d8c] flex flex-wrap justify-center text-xs pl-4">
      {movesMatrix.map((row, rowIndex) => {
        return row.map((move, colIndex) => {
          const isSelected = selectedRow === rowIndex && selectedCol === colIndex;
          return (
            <button
              key={colIndex}
              className={`relative w-[45%] rounded-lg flex items-center p-2 m-1 text-left ${
                isSelected ? 'selected' : ''
              }`}
              onClick={() => handleClick(rowIndex, colIndex)}
            >
              <p className="text-black">{move.name}</p>
            </button>
          );
        });
      })}
      {!isTurnOver && <div className="absolute w-full h-full bg-gray-200 opacity-50 left-0"></div>}
      <style jsx>{`
        .selected::before {
          content: '\A';
          border-style: solid;
          border-width: 10px 15px 10px 0;
          border-color: transparent #dd4397 transparent transparent;
          position: absolute;
          left: -19px;
          transform: rotate(180deg);
        }
      `}</style>
    </div>
  );
}
