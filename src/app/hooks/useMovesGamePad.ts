import { useCallback, useEffect, useState } from 'react';
import { MoveDetail } from '../models/pokemon-model';

const TOTAL_ROWS = 2;
const TOTAL_COLS = 2;

export function useMovesGamePad(
  moves: [MoveDetail, MoveDetail, MoveDetail, MoveDetail],
  setMove: (move: MoveDetail) => void,
  isTurnOver: boolean
) {
  const movesMatrix = [
    [moves[0], moves[1]],
    [moves[2], moves[3]],
  ];
  const [selectedRow, setSelectedRow] = useState(0);
  const [selectedCol, setSelectedCol] = useState(0);

  const handleClick = useCallback(
    (rowIndex: number, colIndex: number) => {
      setSelectedRow(rowIndex);
      setSelectedCol(colIndex);
      const selectedMove = movesMatrix[rowIndex][colIndex];
      if (!isTurnOver) return;
      setMove(selectedMove);
    },
    [setMove]
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowUp':
          setSelectedRow((prev) => (prev > 0 ? prev - 1 : prev));
          break;
        case 'ArrowDown':
          setSelectedRow((prev) => (prev < TOTAL_ROWS - 1 ? prev + 1 : prev));
          break;
        case 'ArrowLeft':
          setSelectedCol((prev) => (prev > 0 ? prev - 1 : prev));
          break;
        case 'ArrowRight':
          setSelectedCol((prev) => (prev < TOTAL_COLS - 1 ? prev + 1 : prev));
          break;
        case 'Enter':
          handleClick(selectedRow, selectedCol);
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedRow, selectedCol, handleClick]);

  return {
    handleClick,
    movesMatrix,
    selectedCol,
    selectedRow,
  };
}
