import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { vmaTools } from "../../../utils/vmaTools";

type VmaResultProps = {
  vma: number;
};

type VmaDataProps = {
  purcent: number;
  allure: string;
  speed: number;
};

const columnHelper = createColumnHelper<VmaDataProps>();

const columns = [
  columnHelper.accessor("purcent", {
    header: () => <span>Pourcentage</span>,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("allure", {
    header: () => <span>Allure en min/km</span>,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("speed", {
    header: () => <span>Vitesse en km/h</span>,
    cell: (info) => info.getValue(),
  }),
];

export default function VmaResult({ vma }: VmaResultProps) {
  const numericVma = Number(vma);

  const [zone, setZone] = useState<string>("1");

  const data = useMemo(() => {
    const numericZone = Number(zone);

    return vmaTools.getGeneratedValue(numericVma, numericZone);
  }, [numericVma, zone]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="p-2 flex flex-col">
      <div className="my-5">
        <select
          className="select w-full shadow"
          value={zone}
          onChange={(e) => setZone(e.target.value)}
        >
          <option value={1}>Allure 10km</option>
          <option value={2}>Allure Semi-Marathon</option>
          <option value={3}>Allure Marathon</option>
        </select>
      </div>

      <table className="table w-100 mx-auto">
        <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id} className="text-center">
                {header.isPlaceholder
                  ? null
                  : flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
              </th>
            ))}
          </tr>
        ))}
        </thead>
        <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id} className="text-center">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
}