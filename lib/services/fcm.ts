import { getPurcentValue } from './calculator';

type ValueUser = {
  age: number;
  gender: Gender;
};

type Gender = 'man' | 'woman';

export type Zone = 'Z1' | 'Z2' | 'Z3' | 'Z4' | 'Z5';

export type ZoneData = {
  title: Zone;
  minPurcent: number;
  maxPurcent: number;
  min: number;
  max: number;
};

export const getFcmWithAge = (age: number, gender: Gender): number => {
  if (gender == 'man') {
    return Math.round(208 - 0.7 * age);
  }

  if (gender == 'woman') {
    return Math.round(206 - 0.88 * age);
  }

  return 0;
};

export const getZoneWithAge = (valueUser: ValueUser): ZoneData[] => {
  const { age, gender } = valueUser;
  const fcMax = getFcmWithAge(age, gender);

  const zoneFc: ZoneData[] = [
    {
      title: 'Z1',
      minPurcent: 0,
      maxPurcent: 60,
      min: 0,
      max: getPurcentValue(fcMax, 60),
    },
    {
      title: 'Z2',
      minPurcent: 60,
      maxPurcent: 70,
      min: getPurcentValue(fcMax, 60),
      max: getPurcentValue(fcMax, 70),
    },
    {
      title: 'Z3',
      minPurcent: 70,
      maxPurcent: 80,
      min: getPurcentValue(fcMax, 70),
      max: getPurcentValue(fcMax, 80),
    },
    {
      title: 'Z4',
      minPurcent: 80,
      maxPurcent: 90,
      min: getPurcentValue(fcMax, 80),
      max: getPurcentValue(fcMax, 90),
    },
    {
      title: 'Z5',
      minPurcent: 90,
      maxPurcent: 120,
      min: getPurcentValue(fcMax, 90),
      max: getPurcentValue(fcMax, 120),
    },
  ];

  return zoneFc;
};

type userValueFc = {
  fcMax: number;
  fcRepos: number;
};

const getFcReserve = (fcm: number, fcr: number) => {
  return fcm - fcr;
};

const getFcValue = (fcReserve: number, fcRepos: number, purcent: number): number => {
  const purcentForCalcul = purcent / 100;

  return Math.round(purcentForCalcul * fcReserve + fcRepos);
};

export const getZoneWithValue = (valueUser: userValueFc): ZoneData[] => {
  const { fcMax, fcRepos } = valueUser;
  const fcReserve = getFcReserve(fcMax, fcRepos);

  const zoneFc: ZoneData[] = [
    {
      title: 'Z1',
      minPurcent: 0,
      maxPurcent: 60,
      min: 0,
      max: getFcValue(fcReserve, fcRepos, 60),
    },
    {
      title: 'Z2',
      minPurcent: 60,
      maxPurcent: 70,
      min: getFcValue(fcReserve, fcRepos, 60),
      max: getFcValue(fcReserve, fcRepos, 70),
    },
    {
      title: 'Z3',
      minPurcent: 70,
      maxPurcent: 80,
      min: getFcValue(fcReserve, fcRepos, 70),
      max: getFcValue(fcReserve, fcRepos, 80),
    },
    {
      title: 'Z4',
      minPurcent: 80,
      maxPurcent: 90,
      min: getFcValue(fcReserve, fcRepos, 80),
      max: getFcValue(fcReserve, fcRepos, 90),
    },
    {
      title: 'Z5',
      minPurcent: 90,
      maxPurcent: 120,
      min: getFcValue(fcReserve, fcRepos, 90),
      max: getFcValue(fcReserve, fcRepos, 120),
    },
  ];

  return zoneFc;
};
