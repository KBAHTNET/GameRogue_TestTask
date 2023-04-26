//@ts-check
'use strict';

class StatsUpgrade {
  /**
   * @param {'hp'|'sw'} type 
   * @param {number} value
   * @param {{x: number, y: number}} position
   */
  constructor(type, value, position) {
    this.type = type;
    this.value = value

    this.position = position;

    this.tile = document.createElement('div');
    this.tile.classList.add('tile');

    switch (type) {
      case "hp":
        this.tile.classList.add('hp')
        this.tile.style.backgroundImage = 'url(./images/tile-HP.png)';
        this.tile.style.zIndex = "99";
        break;
      case "sw":
        this.tile.classList.add('sw')
        this.tile.style.backgroundImage = 'url(./images/tile-SW.png)';
        this.tile.style.zIndex = "98";
        break;
    }

    this.tile.style.position = "absolute";

    /**@type {boolean}*/
    this.isRendered = false;
  }

  /**
   * 
   * @param {Person} person 
   */
  execUP(person) {
    switch (this.type) {
      case "hp":
        person.health += this.value;
        this.playSoundRestoreHealth();
        break;
      case "sw":
        person.damage += this.value;
        this.playSoundUpgradeSW();
        break;
      default:
        break;
    }
  }

  /**
   * 
   * @param {Person} person 
   */
  checkForCollision(person) {
    if(person.position.x === this.position.x && person.position.y === this.position.y) {
      this.execUP(person);
    }
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