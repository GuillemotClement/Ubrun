type CellDataProps = {
  value: string;
};

export default function CellData({ value }: CellDataProps) {
  return <span className="capitalize">{value}</span>;
}