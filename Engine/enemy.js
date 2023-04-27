//@ts-check
'use strict';

class Enemy extends Person {
  constructor(map) {
    const pos = map.findRandomFreePos();
    super(pos[0], pos[1], './images/tile-E.png', map);

    this.damage = getRandomInt(20, 60);
    this.waitBeforeAttack = getRandomInt(5, 50);
    this.lazy = getRandomInt(2,400); //то как долго будет думать перед тем куда сходить
  }

  /**
   * @param {Person} person 
   */
  watchToAttack(person) {
    if(this.waitBeforeAttack) {
      return this.waitBeforeAttack--;
    }
    if((this.position.x === person.position.x + 1 && this.position.y === person.position.y) || 
    (this.position.x === person.position.x - 1 && this.position.y === person.position.y) || 
    (this.position.x === person.position.x && this.position.y === person.position.y + 1) || 
    (this.position.x === person.position.x && this.position.y === person.position.y - 1)) {
      console.log('enemy atack');
      console.log(this.position);
      this.attack();
      this.waitBeforeAttack = getRandomInt(20, 500);
    }
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