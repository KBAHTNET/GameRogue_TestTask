//@ts-check
'use strict';

class StatsUpgrade {
  /**
   * @param {'hp'|'sw'} type 
   * @param {number} value
   * @param {Person} person
   * @param {{x: number, y: number}} position
   */
  constructor(type, value, person, position) {
    this.type = type;
    this.value = value
    this.person = person;

    this.position = position;
  }

  execUP() {
    switch (this.type) {
      case "hp":
        this.person.health += this.value;
        this.playSoundRestoreHealth();
        break;
      case "sw":
        this.person.damage += this.value;
        this.playSoundUpgradeSW();
        break;
      default:
        break;
    }
  }

  checkForCollision(x, y) {
    
  }

  playSoundRestoreHealth() {
    const sound = new Audio('./sounds/health.mp3');
    sound.play();
  }

  playSoundUpgradeSW() {
    const sound = new Audio('./sounds/swup.mp3');
    sound.play();
  }

}