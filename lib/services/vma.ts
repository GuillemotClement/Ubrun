import { VmaData } from '../types/calculator';
import { convertSpeedToAllure, getPurcentValue } from './calculator';

// ici qu'on place la logique

export const getVmaZone = (vma: number): VmaData[][] => {
  const raceVma: VmaData[] = [
    {
      title: '5',
      name: '5 kilomètres',
      minPurcent: 90,
      maxPurcent: 95,
      minValue: getPurcentValueVma(vma, 90),
      maxValue: getPurcentValueVma(vma, 95),
    },
    {
      title: '10',
      name: '10 kilomètres',
      minPurcent: 85,
      maxPurcent: 90,
      minValue: getPurcentValueVma(vma, 85),
      maxValue: getPurcentValueVma(vma, 90),
    },
    {
      title: '21',
      name: 'Semi-marathon',
      minPurcent: 80,
      maxPurcent: 85,
      minValue: getPurcentValueVma(vma, 80),
      maxValue: getPurcentValueVma(vma, 85),
    },
    {
      title: '42',
      name: 'Marathon',
      minPurcent: 70,
      maxPurcent: 80,
      minValue: getPurcentValueVma(vma, 70),
      maxValue: getPurcentValueVma(vma, 80),
    },
  ];

  const zoneVma: VmaData[] = [
    {
      title: 'Z1',
      name: 'Endurance fondamentale',
      minPurcent: 60,
      maxPurcent: 70,
      minValue: getPurcentValueVma(vma, 60),
      maxValue: getPurcentValueVma(vma, 70),
    },
    {
      title: 'Z2',
      name: 'Endurance active',
      minPurcent: 70,
      maxPurcent: 80,
      minValue: getPurcentValueVma(vma, 70),
      maxValue: getPurcentValueVma(vma, 80),
    },
    {
      title: 'Z3',
      name: 'Seuil | Tempo',
      minPurcent: 80,
      maxPurcent: 90,
      minValue: getPurcentValueVma(vma, 80),
      maxValue: getPurcentValueVma(vma, 90),
    },
    {
      title: 'Z4',
      name: 'VMA longue - supérieur à 400m',
      minPurcent: 90,
      maxPurcent: 100,
      minValue: getPurcentValueVma(vma, 90),
      maxValue: getPurcentValueVma(vma, 100),
    },
    {
      title: 'Z5',
      name: 'VMA Courte ->100m & <400m',
      minPurcent: 95,
      maxPurcent: 105,
      minValue: getPurcentValueVma(vma, 95),
      maxValue: getPurcentValueVma(vma, 105),
    },
    {
      title: 'Z6',
      name: 'Anaérobie - sprint',
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
