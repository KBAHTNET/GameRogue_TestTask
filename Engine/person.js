class Person {
  constructor (x, y, tileImg, map) {
    /**@type {HTMLDivElement}*/this.tile = document.createElement('div');
    this.tile.style.backgroundImage = `url(${tileImg})`;
    this.tile.classList.add('tile');
    this.tile.style.zIndex = '1';
    this.tile.style.position = 'absolute';

    this.isUpdate = false;
    this.isRendered = false;

    this.position = {x, y}

    this.health = 100;
    this.damage = 10;

    this.map = map;

  }

  /**
   *  
   * @param {{lambdaX: number, lambdaY: number}} directionLambda 
   */
  move(directionLambda) {
    if (this.isCanMove) {
      const waitPos = {x: this.position.x + directionLambda.lambdaX, y: this.position.y + directionLambda.lambdaY};
      if(this.map.getCell(waitPos.x, waitPos.y) === 1) {
        this.position.x = waitPos.x;
        this.position.y = waitPos.y;
      }
      this.isUpdate = true;
    }
  }

  /**
   *  
   * @param {{lambdaX: number, lambdaY: number}} directionLambda 
   */
  isCanMove(directionLambda) {
    try {
    const waitPos = {x: this.position.x + directionLambda.lambdaX, y: this.position.y + directionLambda.lambdaY};
    if(this.map[waitPos.y][waitPos.x] && this.map.getCell(waitPos.x, waitPos.y) === 1) {
      return true;
    }
  }
  catch{
    return false;
  }
    return false;
  }
}