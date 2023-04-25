class Game {
  constructor() {
    this.kills = 0;
    this.timer = 0;
    this.fps = 60;

    /**@type {'game'|'pause'|null}*/
    this.gameState = 'game';

    this.map = new GameMap({width:35, height:21});

    const pos = this.map.findRandomFreePos(); //[x, y]
    this.actor = new Actor(pos[0], pos[1], this.map); //(x, y)

    /**@type {Array<Enemy>}*/
    this.enemies = [];

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
      this.DrawActor();
      // this.DrawInventory();
      
      this.timer += 1000 / this.fps;
      DrawTimer(this.timer);
      DrawKills(this.kills);
      DrawStats(this.actor);
    }
  }

  generateEnemy() {
    const pos = this.map.findRandomFreePos(); //[x, y]
    const enemy = new Enemy(pos[0], pos[1], this.map); //(x, y)
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

  DrawEnemies() {

  }

  //#endregion
}