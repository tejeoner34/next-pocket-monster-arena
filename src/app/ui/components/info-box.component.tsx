import { ArenaMoves } from '@/app/models/pokemon-model';
import InfoBoxMovesPad from './info-box-moves-pad.component';

type InfoBoxProps = {
  boxMessage: string;
  moves: ArenaMoves;
};

export default function InfoBox({ boxMessage, moves }: InfoBoxProps) {
  return (
    <div>
      <div className="flex h-[140px] relative border-8 border-infoBoxBorder z-[500]">
        <div className="bg-infoBoxBackground border-8 border-infoBoxMovesBorder w-1/2 flex items-center justify-center p-4">
          <p
            className={`leading-[30px] ${
              boxMessage === 'criticalHit' ? 'text-infoBoxCriticalDamageText' : ''
            }`}
          >
            {boxMessage}
          </p>
        </div>
        <InfoBoxMovesPad moves={moves} />
      </div>
    </div>
  );
}
