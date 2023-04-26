//@ts-check
'use strict';

//inventory:
//1 - health
//2 - sword

class Actor extends Person {
  constructor(x, y, map) {
    super(x, y, './images/tile-P.png', map);
    this.tile.classList.add('actor-tile');

    this.health = 45;
    this.damage = 5;

    this.inventory = [];
  }

  death() {
    
  }

  // attack() {

  // }
}