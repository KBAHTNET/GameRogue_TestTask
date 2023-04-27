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
    this.direction = 0; //0 - watch rigth, 1 - watch left, 2 - watch top, 3 - watch bottom

    this.health = 100;
    this.damage = 10;

    /**@type {GameMap}*/
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
        
        if(directionLambda.lambdaX === 1) {
          this.direction = 0;
        } else if (directionLambda.lambdaX === -1) {
          this.direction = 1;
        } else if (directionLambda.lambdaY === -1) {
          this.direction = 2;
        } else if (directionLambda.lambdaY === 1) {
          this.direction = 3;
        }
      }
      this.isUpdate = true;
    }

    const playMoveSound = () => {
      const sound = new Audio('./sounds/move.mp3');
      sound.play();
    };

    playMoveSound();

  }

  getDamage(damage) {
    this.health -= damage;
    if(this.health < 0) this.health = 0;

    new Audio('./sounds/damaged.mp3').play();
  }

  attack() {
    this.map.createDamagedZone({x:this.position.x + 1, y:this.position.y}, this.damage);
    this.map.createDamagedZone({x:this.position.x - 1, y:this.position.y}, this.damage);
    this.map.createDamagedZone({x:this.position.x, y:this.position.y + 1}, this.damage);
    this.map.createDamagedZone({x:this.position.x, y:this.position.y - 1}, this.damage);

    const createAttackEffect = () => {
      const attackBlock = document.createElement('div');
      
      attackBlock.style.position = 'absolute';
      attackBlock.style.left = '0';
      attackBlock.style.top = '0';
      attackBlock.style.zIndex = '100';

      setTimeout(() => {
        attackBlock.classList.remove('attack-effect');
        attackBlock.remove();
      }, 200);

      attackBlock.classList.add('attack-effect');
      this.tile.appendChild(attackBlock);

    };
    createAttackEffect();

    new Audio('./sounds/hit.mp3').play();
  }

  /**
   *  
   * @param {{lambdaX: number, lambdaY: number}} directionLambda 
   */
  isCanMove(directionLambda) {
    try {
    const waitPos = {x: this.position.x + directionLambda.lambdaX, y: this.position.y + directionLambda.lambdaY};
    if(/*this.map[waitPos.y][waitPos.x] &&*/ this.map.getCell(waitPos.x, waitPos.y) === 1) {
      return true;
    }
  }
  catch(e) {
    return false;
  }
    return false;
  }
}