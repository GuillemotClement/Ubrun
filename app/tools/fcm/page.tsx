import { Card, CardHeader, CardTitle } from "@/components/ui/card";

export default function FcmPage() {
  return (
    <div className="flex gap-x-2">
      <Card className="flex-1 flex justify-center">
        <CardHeader>
          <CardTitle>Fréquence Cardiaque</CardTitle>
        </CardHeader>
      </Card>
    </div>
  );
}
