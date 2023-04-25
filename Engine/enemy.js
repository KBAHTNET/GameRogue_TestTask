//@ts-check
'use strict';

class Enemy extends Person {
  constructor(map) {
    super();
    this.damage = getRandomInt(20, 60);

    this.maxSteps = getRandomInt(10, 20);

    this.waitBeforeAttack = getRandomInt(100, 400);

    this.map = map;
  }

  walk() {
    let accessWays = [
      [this.position.x + 1, this.position.y],
      [this.position.x - 1, this.position.y],
      [this.position.x, this.position.y + 1],
      [this.position.x, this.position.y - 1]
    ];

    let way = getRandomInt(0, accessWays.length);
    while(!this.isCanMove({lambdaX:accessWays[way][0], lambdaY:accessWays[way][1]})) {
      accessWays = accessWays.filter((it, i, arr) => {i !== way});
      way = getRandomInt(0, accessWays.length);
    }

    this.move({lambdaX:accessWays[way][0], lambdaY:accessWays[way][1]});
  }
}