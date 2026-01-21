import type { ConvertSpeedToAllure } from "./types/vma";

export const vmaTools = {
  getPurcentVma(purcent: number, vma: number) {
    return vma * (purcent / 100);
  },

  /**
   * Convertis une valeur en km/h en allure min/km
   *
   * @param {number} speed en kilomètre heure
   * @returns {ConvertSpeedToAllure}
   */
  convertSpeedToAllure(speed: number): ConvertSpeedToAllure {
    // calcul l'allure en minute
    const allure = 60 / speed;

    // récupération de la minute
    const minutes = Math.floor(allure);

    // récupération des secondes
    const secondes = Math.round((allure - minutes) * 60);

    return {
      minutes,
      secondes,
    };
  },

  /**
   * Allow to convert allure for human
   *
   * @param {ConvertSpeedToAllure} allure
   * @returns {string}
   */
  convertAllureToString(allure: ConvertSpeedToAllure): string {
    return `${allure.minutes}'${allure.secondes}`;
  },

  /**
   * Génère les valeurs VMA pour le tableau
   *
   * @param {number} speed
   * @param {number} zone
   * @returns {{}}
   */
  getGeneratedValue(speed: number, zone: number) {
    let start = 0;
    let end = 0;

    switch (zone) {
      case 1:
        start = 85;
        end = 90;

        break;
      case 2:
        start = 80;
        end = 85;
        break;
      case 3:
        start = 70;
        end = 80;
        break;
    }

    const startSpeed = this.getPurcentVma(start, speed);
    const endSpeed = this.getPurcentVma(end, speed);

    const allureObjStart = this.convertSpeedToAllure(startSpeed);
    const allureObjEnd = this.convertSpeedToAllure(endSpeed);

    const vmaData = [
      {
        purcent: end,
        allure: this.convertAllureToString(allureObjEnd),
        speed: parseFloat(endSpeed.toFixed(2)),
      },
      {
        purcent: start,
        allure: this.convertAllureToString(allureObjStart),
        speed: parseFloat(startSpeed.toFixed(2)),
      },
    ];

    return vmaData;
  },
};