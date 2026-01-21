import { useState } from "react";
import PurcentForm from "./PurcentForm";
import PurcentResult from "./PurcentResult";

export default function PurcentPage() {
  const [result, setResult] = useState<number>(0);

  return (
    <div className="container mx-auto flex flex-1 flex-col items-center">
      <div className="card flex-1">
        <PurcentForm setResult={setResult} />
      </div>

      {result > 0 && (
        <div className="card flex-1">
          <PurcentResult result={result} />
        </div>
      )}
    </div>
  );
}