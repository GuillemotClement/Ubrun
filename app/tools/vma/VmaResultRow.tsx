import { VmaData } from '@/lib/types/calculator';

type VmaResultRowProp = {
  zone: VmaData;
};

export default function VmaResultRow({ zone }: VmaResultRowProp) {
  const { title, name, minValue, maxValue, minPurcent, maxPurcent } = zone;

  const style = 'border h-10 w-10 rounded flex justify-center items-center';

  return (
    <div className="border flex justify-between p-3 my-3 rounded">
      <div className="flex gap-x-3">
        <div className={style}>{title}</div>

        <div className="flex flex-col">
          <p className="font-bold">{name}</p>
          <p>
            {minPurcent}% - {maxPurcent}%
          </p>
        </div>
      </div>

      <div className="flex gap-x-2 items-center">
        <div className="font-bold text-2xl">
          {maxValue} - {minValue}
        </div>
        <div className="">Min/km</div>
      </div>
    </div>
  );
}
