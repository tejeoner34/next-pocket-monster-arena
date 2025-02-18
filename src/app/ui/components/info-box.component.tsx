import { ArenaMoves } from '@/app/models/pokemon-model';
import InfoBoxMovesPad from './info-box-moves-pad.component';
import { useGameStyleMessage } from '@/app/hooks/useGameStyleMessage';

type InfoBoxProps = {
  boxMessage: string;
  moves: ArenaMoves;
  isTurnOver: boolean;
  onChoseMove: (move: ArenaMoves[0]) => void;
};

export default function InfoBox({ boxMessage, moves, isTurnOver, onChoseMove }: InfoBoxProps) {
  const { typedMessage } = useGameStyleMessage(boxMessage);
  return (
    <div>
      <div className="flex h-[140px] relative border-8 border-infoBoxBorder z-[500]">
        <div className="bg-infoBoxBackground border-8 border-infoBoxMovesBorder w-1/2 flex items-center justify-center p-4">
          <p
            className={`leading-[30px] ${
              typedMessage === 'criticalHit' ? 'text-infoBoxCriticalDamageText' : ''
            }`}
          >
            {typedMessage}
          </p>
        </div>
        <InfoBoxMovesPad moves={moves} isTurnOver={isTurnOver} onChoseMove={onChoseMove} />
      </div>
    </div>
  );
}
