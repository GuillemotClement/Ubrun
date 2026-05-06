export const convertSpeedToAllure = (speed: number): string => {
  const allure = 60 / speed;
  const minute = Math.floor(allure);
  const seconde = Math.round((allure - minute) * 60);
  const validSecond = seconde.toString().padStart(2, '0');
  return minute + "'" + validSecond;
};

export const getPurcentValue = (
  total: number,
  purcent: number,
  arrondis: boolean = true
): number => {
  let value = (total * purcent) / 100;

  if (arrondis) {
    value = Math.round(value);
  }

  return value;
};

export const convertAllureToSpeed = (
  minute: number | null,
  second: number | null
): number | null => {
  if (!minute || !second) {
    return null;
  }

  const minPerKm = minute + second / 60;
  const kmh = 60 / minPerKm;

  return Number(kmh.toFixed(2));
};
