type ConvertSpeedData = {
  minutes: number;
  secondes: string;
};

export const convertorTool = {
  /**
   * Convertis une vitesse km/h en allure min/km
   *
   * @param {number} speed
   * @returns {ConvertSpeedData}
   */
  convertSpeedToAllure(speed: number): ConvertSpeedData {
    // calcul de l'allure en minute
    const allure = 60 / speed;
    // récupération de la minute
    const minutes = Math.floor(allure);
    // récupération de la seconde
    const secondes = Math.round((allure - minutes) * 60);

    return {
      minutes,
      secondes: secondes.toString().padStart(2, "0"),
    };
  },

  convertAllureToSpeed(minute: number, seconde: number): number {
    const minPerKm = minute + seconde / 60;
    const kmh = 60 / minPerKm;

    return Number(kmh.toFixed(2));
  },
};