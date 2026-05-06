import { ZoneData } from '@/lib/services/fcm';

type NameZone =
  | 'Endurance fondamentale'
  | 'Endurance active'
  | 'Seuil aerobie'
  | 'Seuil anareobie'
  | 'VO2 Max';

type FcmZoneRowProps = {
  zone: ZoneData;
};

export default function FcmZoneRow({ zone }: FcmZoneRowProps) {
  const { title, min, max, minPurcent, maxPurcent } = zone;

  let style = 'border h-10 w-10 rounded flex justify-center items-center';
  let nameZone: NameZone;

  switch (title) {
    case 'Z1':
      style += ' bg-green-500';
      nameZone = 'Endurance fondamentale';
      break;
    case 'Z2':
      style += ' bg-blue-500';
      nameZone = 'Endurance active';
      break;
    case 'Z3':
      style += ' bg-yellow-500';
      nameZone = 'Seuil aerobie';
      break;
    case 'Z4':
      style += ' bg-orange-500';
      nameZone = 'Seuil anareobie';
      break;
    case 'Z5':
      style += ' bg-red-500';
      nameZone = 'VO2 Max';
      break;
  }

  return (
    <div className="border flex justify-between p-3 my-3 rounded">
      <div className="flex gap-x-3">
        <div className={style}>{zone.title}</div>

        <div className="flex flex-col">
          <p className="font-bold">{nameZone}</p>
          <p>
            {minPurcent}% - {maxPurcent}%
          </p>
        </div>
      </div>

      <div className="flex gap-x-2">
        <div className="font-bold text-2xl">
          {min} - {max}
        </div>
        <div className="">BPM</div>
      </div>
    </div>
  );
}
