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
