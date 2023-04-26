//@ts-check
'use strict';

class Enemy extends Person {
  constructor(map) {
    const pos = map.findRandomFreePos();
    super(pos[0], pos[1], './images/tile-E.png', map);

    this.damage = getRandomInt(20, 60);
    this.maxSteps = getRandomInt(10, 20);
    this.waitBeforeAttack = getRandomInt(100, 400);
    this.lazy = getRandomInt(10,100); //то как долго будет думать перед тем куда сходить
  }

  walk() {
    if(this.lazy > 0) {
      return this.lazy--;
    }
    this.lazy = getRandomInt(10, 100);

    // let accessWays = [
    //   [this.position.x + 1, this.position.y],
    //   [this.position.x - 1, this.position.y],
    //   [this.position.x, this.position.y + 1],
    //   [this.position.x, this.position.y - 1]
    // ];
    let lambdaWays = [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1]
    ]

    // debugger;
    let way = getRandomInt(0, lambdaWays.length);
    while(!this.isCanMove({lambdaX:lambdaWays[way][0], lambdaY:lambdaWays[way][1]})) {
      lambdaWays = lambdaWays.filter((it, i, arr) => i !== way);
      way = getRandomInt(0, lambdaWays.length);
    }

    this.move({lambdaX:lambdaWays[way][0], lambdaY:lambdaWays[way][1]});
  }
}