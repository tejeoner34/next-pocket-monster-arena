import { MoveDetail } from '@/app/models/pokemon-model';
import InfoBoxMovesPad from './info-box-moves-pad.component';

type InfoBoxProps = {
  boxMessage: string;
  moves: [MoveDetail, MoveDetail, MoveDetail, MoveDetail];
};

export default function InfoBox({ boxMessage, moves }: InfoBoxProps) {
  return (
    <div>
      <div className="flex h-[140px] relative border-8 border-[#361e1e] z-[500]">
        <div className="bg-[#334f70] text-white border-8 border-[#dbb46d] w-1/2 flex items-center justify-center p-4">
          <p className={`leading-[30px] ${boxMessage === 'criticalHit' ? 'text-yellow-500' : ''}`}>
            {boxMessage}
          </p>
        </div>
        <InfoBoxMovesPad moves={moves} />
      </div>
    </div>
  );
}
