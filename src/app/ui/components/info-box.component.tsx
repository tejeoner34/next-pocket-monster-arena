import { useMovesGamePad } from '@/app/hooks/useMovesGamePad';
import { MoveDetail } from '@/app/models/pokemon-model';

type InfoBoxProps = {
  boxMessage: string;
  moves: MoveDetail[];
};

export default function InfoBox({ boxMessage, moves }: InfoBoxProps) {
  const { handleClick, movesMatrix, selectedCol, selectedRow } = useMovesGamePad(moves);

  return (
    <div>
      <div className="flex h-[140px] relative border-8 border-[#361e1e] z-[500]">
        <div className="bg-[#334f70] text-white border-8 border-[#dbb46d] w-1/2 flex items-center justify-center p-4">
          <p className={`leading-[30px] ${boxMessage === 'criticalHit' ? 'text-yellow-500' : ''}`}>
            {boxMessage}
          </p>
        </div>
        <div className="bg-foreground relative w-1/2 border-8 border-[#6e4d8c] flex flex-wrap justify-center text-xs pl-4">
          {movesMatrix.map((row, rowIndex) => {
            return row.map((move, colIndex) => {
              const isSelected = selectedRow === rowIndex && selectedCol === colIndex;
              return (
                <button
                  key={colIndex}
                  className={`relative w-[45%] rounded-lg flex items-center cursor-pointer p-2 m-1 ${
                    isSelected ? 'selected' : ''
                  }`}
                  onClick={() => handleClick(rowIndex, colIndex)}
                  tabIndex={-1}
                >
                  <p className="text-black">{move.name}</p>
                </button>
              );
            });
          })}
          {/* {hasSelectedMove && (
  <div className="absolute w-full h-full bg-gray-200 opacity-50 left-0"></div>
)} */}
        </div>
      </div>
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
