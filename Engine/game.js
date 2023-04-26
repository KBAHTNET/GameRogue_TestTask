class Game {
  constructor() {
    this.kills = 0;
    this.timer = 0;
    this.fps = 60;

    /**@type {'game'|'pause'|'over'|null}*/
    this.gameState = 'game';

    this.map = new GameMap({width:35, height:21});

    const pos = this.map.findRandomFreePos(); //[x, y]
    this.actor = new Actor(pos[0], pos[1], this.map); //(x, y)

    /**@type {Array<Enemy>}*/
    this.enemies = [];
    this.maxEnemies = 10;
    this.ticksForGenEnemy = 1000;

    this.HPs = [];
    this.maxHPs = 10;
    this.ticksForGenHP = 1000;

    this.swordUPs = [];
    this.maxSwordUPs = 2;
    this.ticksForGenSW = 1000;

    this.courotine = null;
  }

  init() {
    const frequency = 1000 / this.fps;
    initInterface(this);
    initActorController(this.actor);
    this.coroutine = setInterval(() => this.tick(), frequency);
  }

  tick() {
    if(this.gameState === 'game') {
      // this.DrawActor();
      // debugger;
      this.DrawPerson(this.actor);
      // this.DrawInventory();
      
      if(this.enemies) {
        this.enemies.forEach(enemy => {
          enemy.walk();
          this.DrawPerson(enemy);
        });
      }

      this.ticksForGenEnemy--;
      if(this.maxEnemies > this.enemies.length && this.ticksForGenEnemy < 0) {
        this.enemies.push(new Enemy(this.map));
        this.ticksForGenEnemy = 1000;
      }

      this.ticksForGenHP--;
      if(this.maxHPs > this.HPs.length && this.ticksForGenHP < 0) {
        // this.HPs.push(new Enemy(this.map));
        this.ticksForGenHP = 1000;
      }

      this.ticksForGenSW--;
      if(this.maxSwordUPs > this.swordUPs.length && this.ticksForGenSW < 0) {
        // this.swordUPs.push(new Enemy(this.map));
        this.ticksForGenSW = 1000;
      }


      this.timer += 1000 / this.fps;
      DrawTimer(this.timer);
      DrawKills(this.kills);
      DrawStats(this.actor);

      if(this.actor.health < 0) {
        this.gameState = 'over';
      }
    }
    if(this.gameState == 'over') {
      new Audio('./sounds/death.mp3').play();
    }
  }

  generateEnemy() {
    const enemy = new Enemy(this.map); //(x, y)
  }


  //#region Renderer


  DrawInventory() {
    if(inventoryBtn.classList.contains('active-statusbar')) {

    }
  }

  DrawHP() {

  }

  DrawEnemies() {

  }

  /**
   * 
   * @param {Person} enemy 
   */
  DrawPerson(person) {
    const renderPerson = () => {
      person.isRendered = false;

      const tilePos = person.position.y * this.map.mapBlocks[0].length + person.position.x;
      const tileToDraw = document.querySelectorAll('.tile')[tilePos];

      // console.log(tileToDraw);
  
      // const tile = document.createElement('div');
      const tile = person.tile;
      // tile.style.backgroundImage = 'url(./images/tile-P.png)';
      // tile.classList.add('actor-tile');
      // tile.classList.add('tile');
      tile.style.zIndex = '10';
      // console.log(this.actor.position);
      tile.style.width = tileToDraw.style.width;
      tile.style.height = tileToDraw.style.height;
  
      // tile.style.position = 'absolute';

      const field = document.querySelector('.field');

      tile.style.top = tileToDraw.getBoundingClientRect().y - field.getBoundingClientRect().y + 'px';
      tile.style.left = tileToDraw.getBoundingClientRect().x - field.getBoundingClientRect().x + 'px';

      switch (person.direction) {
        case 0:
          tile.style.transform = 'scaleX(1)';
          break;
        case 1:
          tile.style.transform = 'scaleX(-1)';
          break;
        case 2:
          tile.style.transform = 'scaleY(-1)';
          break;
        case 3:
          tile.style.transform = 'scaleY(1)';
          break;
      }
  
      field.appendChild(tile);

      // person.tile = tile;

      person.isRendered = true;
    };

    if(person.isUpdate) {
      person.tile.remove();

      renderPerson();
    }

    if(!person.isRendered) {
      renderPerson();
      
    }
  }

  DrawActor() {
    const renderActor = () => {
      this.actor.isRendered = false;

      const tilePos = this.actor.position.y * this.map.mapBlocks[0].length + this.actor.position.x;
      const tileToDraw = document.querySelectorAll('.tile')[tilePos];

      // console.log(tileToDraw);
  
      const tile = document.createElement('div');
      tile.style.backgroundImage = 'url(./images/tile-P.png)';
      tile.classList.add('actor-tile');
      tile.classList.add('tile');
      tile.style.zIndex = '10';
      // console.log(this.actor.position);
      tile.style.width = tileToDraw.style.width;
      tile.style.height = tileToDraw.style.height;
  
      tile.style.position = 'absolute';

      const field = document.querySelector('.field');

      tile.style.top = tileToDraw.getBoundingClientRect().y - field.getBoundingClientRect().y + 'px';
      tile.style.left = tileToDraw.getBoundingClientRect().x - field.getBoundingClientRect().x + 'px';

      switch (this.actor.direction) {
        case 0:
          tile.style.transform = 'scaleX(1)';
          break;
        case 1:
          tile.style.transform = 'scaleX(-1)';
          break;
        case 2:
          tile.style.transform = 'scaleY(-1)';
          break;
        case 3:
          tile.style.transform = 'scaleY(1)';
          break;
      }
  
      field.appendChild(tile);

      this.actor.tile = tile;

      this.actor.isRendered = true;
    };
    if(this.actor.isUpdate) {
      this.actor.tile.remove();

      renderActor();
    }

    if(!this.actor.isRendered) {
      renderActor();
      
    }

    // debugger;
  }

  //#endregion
}