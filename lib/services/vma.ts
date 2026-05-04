// ici qu'on place la logique
export type VmaData = {
  title: string;
  name: string;
  minPurcent: number;
  maxPurcent: number;
  minValue: string;
  maxValue: string;
};

export const getVmaZone = (vma: number): VmaData[][] => {
  const raceVma: VmaData[] = [
    {
      title: "5",
      name: "5 kilomètres",
      minPurcent: 90,
      maxPurcent: 95,
      minValue: getPurcentValueVma(vma, 90),
      maxValue: getPurcentValueVma(vma, 95),
    },
    {
      title: "10",
      name: "10 kilomètres",
      minPurcent: 85,
      maxPurcent: 90,
      minValue: getPurcentValueVma(vma, 85),
      maxValue: getPurcentValueVma(vma, 90),
    },
    {
      title: "21",
      name: "Semi-marathon",
      minPurcent: 80,
      maxPurcent: 85,
      minValue: getPurcentValueVma(vma, 80),
      maxValue: getPurcentValueVma(vma, 85),
    },
    {
      title: "42",
      name: "Marathon",
      minPurcent: 70,
      maxPurcent: 80,
      minValue: getPurcentValueVma(vma, 70),
      maxValue: getPurcentValueVma(vma, 80),
    },
  ];

  const zoneVma: VmaData[] = [
    {
      title: "Z1",
      name: "Endurance fondamentale",
      minPurcent: 60,
      maxPurcent: 70,
      minValue: getPurcentValueVma(vma, 60),
      maxValue: getPurcentValueVma(vma, 70),
    },
    {
      title: "Z2",
      name: "Endurance active",
      minPurcent: 70,
      maxPurcent: 80,
      minValue: getPurcentValueVma(vma, 70),
      maxValue: getPurcentValueVma(vma, 80),
    },
    {
      title: "Z3",
      name: "Seuil",
      minPurcent: 80,
      maxPurcent: 90,
      minValue: getPurcentValueVma(vma, 80),
      maxValue: getPurcentValueVma(vma, 90),
    },
    {
      title: "Z4",
      name: "VMA longue",
      minPurcent: 90,
      maxPurcent: 100,
      minValue: getPurcentValueVma(vma, 90),
      maxValue: getPurcentValueVma(vma, 100),
    },
    {
      title: "Z5",
      name: "VMA Courte",
      minPurcent: 95,
      maxPurcent: 105,
      minValue: getPurcentValueVma(vma, 95),
      maxValue: getPurcentValueVma(vma, 105),
    },
    {
      title: "Z6",
      name: "Anaérobie",
      minPurcent: 105,
      maxPurcent: 150,
      minValue: getPurcentValueVma(vma, 105),
      maxValue: getPurcentValueVma(vma, 150),
    },
  ];

  return [raceVma, zoneVma];
};

const getPurcentValueVma = (vma: number, purcent: number) => {
  const purcentVma = getPurcentValue(vma, purcent, false);
  return convertSpeedToAllure(purcentVma);
};

const convertSpeedToAllure = (speed: number): string => {
  const allure = 60 / speed;
  const minute = Math.floor(allure);
  const seconde = Math.round((allure - minute) * 60);
  const validSecond = seconde.toString().padStart(2, "0");
  return minute + "'" + validSecond;
};

const getPurcentValue = (
  total: number,
  purcent: number,
  arrondis: boolean = true,
): number => {
  let value = (total * purcent) / 100;

  if (arrondis) {
    value = Math.round(value);
  }

  return value;
};
