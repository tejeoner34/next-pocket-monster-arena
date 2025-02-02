import { MoveDetail } from '@/app/models/pokemon-model';
import React, { useEffect, useState } from 'react';

type InfoBoxProps = {
  boxMessage: string;
  moves: MoveDetail[];
};

export default function InfoBox({ boxMessage, moves }: InfoBoxProps) {
  // Track current selection with row and column indices
  const [selectedRow, setSelectedRow] = useState(0);
  const [selectedCol, setSelectedCol] = useState(0);
  const [movesMatrix, setMovesMatrix] = useState<MoveDetail[][]>([]);

  // Total rows and columns in the grid
  const totalRows = 2;
  const totalCols = 2;
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowUp':
          setSelectedRow((prev) => (prev > 0 ? prev - 1 : prev));
          break;
        case 'ArrowDown':
          setSelectedRow((prev) => (prev < totalRows - 1 ? prev + 1 : prev));
          break;
        case 'ArrowLeft':
          setSelectedCol((prev) => (prev > 0 ? prev - 1 : prev));
          break;
        case 'ArrowRight':
          setSelectedCol((prev) => (prev < totalCols - 1 ? prev + 1 : prev));
          break;
        case 'Enter':
          const selectedIndex = selectedRow * totalCols + selectedCol;
          if (moves[selectedIndex]) {
            console.log(`Selected move: ${moves[selectedIndex].name}`);
          }
          break;
        default:
          break;
      }
    };

    // Add event listener when component mounts
    window.addEventListener('keydown', handleKeyDown);

    // Clean up event listener when component unmounts
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [moves]);

  useEffect(() => {
    setMovesMatrix([
      [moves[0], moves[1]],
      [moves[2], moves[3]],
    ]);
  }, [moves]);
  return (
    <div>
      <div className="flex h-[140px] relative border-8 border-[#361e1e] z-[500]">
        <div className="bg-[#334f70] text-white border-8 border-[#dbb46d] w-1/2 flex items-center justify-center p-4">
          <p className={`leading-[30px] ${boxMessage === 'criticalHit' ? 'text-yellow-500' : ''}`}>
            {boxMessage}
          </p>
        </div>
        <div className="bg-foreground relative w-1/2 border-8 border-[#6e4d8c] flex flex-wrap justify-center text-xs pl-4">
          {movesMatrix.map((row, rowIndez) => {
            return row.map((move, columIndex) => {
              const isSelected = selectedRow === rowIndez && selectedCol === columIndex;
              return (
                <div
                  key={columIndex}
                  tabIndex={0}
                  className={`relative w-[45%] rounded-lg flex items-center cursor-pointer p-2 m-1 ${
                    isSelected ? 'bg-gray-200' : ''
                  }`}
                  // onClick={() => chooseMove(move, i)}
                >
                  <p className="text-black">{move.name}</p>
                </div>
              );
            });
          })}
          {/* {hasSelectedMove && (
  <div className="absolute w-full h-full bg-gray-200 opacity-50 left-0"></div>
)} */}
        </div>
      </div>
    </div>
  );
}
