import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardAction, CardDescription, CardTitle } from '@/components/ui/card';

export default function Home() {
  const tools = [
    {
      id: 1,
      title: 'Fréquence Cardiaque Max',
      description: "Calcul FCM + zones d'entraînements",
      url: '/tools/fcm',
    },
    {
      id: 2,
      title: 'Vitesse Max Aérobie',
      description: 'Zones de VMA',
      url: '/tools/vma',
    },
  ];

  return (
    <>
      <div className="">
        {/* <h1 className="text-center font-bold text-3xl">En cours de développement</h1> */}
        {/* <h2>Cours plus juste, progresse plus vite</h2>
        <p>
          FCM, VMA, allures, prédictions de chrono - tous les calculs dont tu as
          besoin pour structurer ton entraînement, réunis dans une interface
          claire.
        </p> */}
      </div>

      <div className="mx-auto my-5">
        <h3 className="text-2xl font-bold text-center mb-5">Les outils</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 px-5">
          {tools.map((tool) => (
            <Card key={tool.id} className="px-3">
              <CardTitle className="text-center">{tool.title}</CardTitle>
              <CardDescription className="text-center">{tool.description}</CardDescription>
              <CardAction className="flex justify-center w-full">
                <Link href={tool.url}>
                  <Button>Accéder</Button>
                </Link>
              </CardAction>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
