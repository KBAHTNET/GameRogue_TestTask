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
    this.ticksForGenEnemy = 500;

    /**@type {Array<StatsUpgrade>}*/
    this.HPs = [];
    this.maxHPs = 10;
    this.ticksForGenHP = 500;

    /**@type {Array<StatsUpgrade>}*/
    this.swordUPs = [];
    this.maxSwordUPs = 2;
    this.ticksForGenSW = 500;

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

      let enemiesToRemove = [];
      if(this.enemies) {
        this.enemies.forEach(enemy => {
          this.map.checkPersonsForDamage(enemy);
          enemy.watchToAttack(this.actor);
          if(enemy.health <= 0) {
            enemiesToRemove.push(enemy);
            enemy.tile.remove();
          } else {
            enemy.walk();
            this.DrawPerson(enemy);
          }
        });
      }
      this.enemies = this.enemies.filter(it => !enemiesToRemove.includes(it));
      this.kills += enemiesToRemove.length;
      enemiesToRemove = null;

      this.map.checkPersonsForDamage(this.actor);
      if(this.actor.health <= 0) {
        this.gameState = "over";
        debugger;

        new Audio('./sounds/death.mp3').play();
        const text = document.createElement('div');
        text.innerText = "П О Т Р А Ч Е Н О";
        text.style.opacity = "0";
        text.style.zIndex = '1000';
        text.style.position = "fixed";
        text.style.top = "50%";
        text.style.left = "40%";

        document.body.appendChild(text);

        const int = setInterval(() => {
          if(text.style.opacity < 0.95) {
            text.style.opacity = parseFloat(text.style.opacity) + 0.1;
          } else {
            clearInterval(int);
          }
        }, 20);
      }
      this.map.damagedZones = [];

      let HPsToRemove = [];
      if(this.HPs) {
        this.HPs.forEach(HP => {
          if(HP.checkForCollision(this.actor)) {
            HPsToRemove.push(HP);
          }
          if(!HP.isUsed) {
            this.DrawStatsUPs(HP);
          } else {
            HP.tile.remove();
          }
        });
      }
      this.HPs = this.HPs.filter(it => !HPsToRemove.includes(it));
      HPsToRemove = null;

      let swordsUPsToRemove = [];
      if(this.swordUPs) {
        this.swordUPs.forEach(swup => {
          if(swup.checkForCollision(this.actor)) {
            swordsUPsToRemove.push(swup);
          }
          if(!swup.isUsed) {
            this.DrawStatsUPs(swup);
          } else {
            swup.tile.remove();
          }
        });
      }
      this.swordUPs = this.swordUPs.filter(it => !swordsUPsToRemove.includes(it));
      swordsUPsToRemove = null;

      this.ticksForGenEnemy--;
      if(this.maxEnemies > this.enemies.length && this.ticksForGenEnemy < 0) {
        this.enemies.push(new Enemy(this.map));
        this.ticksForGenEnemy = 1000;
      }

      this.ticksForGenHP--;
      if(this.maxHPs > this.HPs.length && this.ticksForGenHP < 0) {
        const position = this.map.findRandomFreePos();
        this.HPs.push(new StatsUpgrade('hp', getRandomInt(10, 40), {x: position[0], y: position[1]}));
        this.ticksForGenHP = 1000;
      }

      this.ticksForGenSW--;
      if(this.maxSwordUPs > this.swordUPs.length && this.ticksForGenSW < 0) {
        const position = this.map.findRandomFreePos();
        this.swordUPs.push(new StatsUpgrade('sw', getRandomInt(3, 15), {x: position[0], y: position[1]}));
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
      // new Audio('./sounds/death.mp3').play();
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

  /**@type {StatsUpgrade}*/
  DrawStatsUPs(thing) {
    if(!thing.isRendered) {
      const tilePos = thing.position.y * this.map.mapBlocks[0].length + thing.position.x;
      const tileToDraw = document.querySelectorAll('.tile')[tilePos];
      
      const tile = thing.tile;
      tile.style.width = tileToDraw.style.width;
      tile.style.height = tileToDraw.style.height;

      const field = document.querySelector('.field');

      tile.style.top = tileToDraw.getBoundingClientRect().y - field.getBoundingClientRect().y + 'px';
      tile.style.left = tileToDraw.getBoundingClientRect().x - field.getBoundingClientRect().x + 'px';

      field.appendChild(tile);

      thing.isRendered = true;
    }
  }

  DrawEnemies() {

  }

  /**
   * 
   * @param {Person} person 
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

      tile.innerHTML = `
        <div class="hp-progress" style="top:-10px;left:0;position:relative;width:100%;height:5px;background-color:gray;">
          <div class="hp-current" style="width:${person.health}%;height:100%;background-color:red;"box-shadow:0 0 7px 3px red></div>
        </div>
      `;
  
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