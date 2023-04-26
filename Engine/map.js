//@ts-check
'use strict';

//type of blocks
//0 - wall
//1 - free
//10 - health
//11 - sword
//100 - actor
//101 - enemy

class GameMap {
  constructor(rectangle) {
    /**@type {Array<Array<number>>}*/this.mapBlocks = [];

    /**@type {{width:number, height:number}}*/this.size = {
      width: rectangle.width,
      height: rectangle.height
    }

    /**@type {Array<{leftTopPointPos: {x:number,y:number}, size: {width:number, height: number}, spawnType:'sword'|'health', spawnPos: {x:number,y:number}}>}*/
    this.rooms = [];

    for (let y = 0; y < rectangle.height; y++) {
      this.mapBlocks[y] = [];
      for (let x = 0; x < rectangle.width; x++) {
        //@ts-ignore
        this.mapBlocks[y][x] = 0;
      }
    }

    this.generateMap();
    this.renderMap();
  }

  checkCollision(x,y) {
    return this.mapBlocks[y][x] > 0 ? true : false; 
  }

  getCell(x, y) {
    return this.mapBlocks[y][x];
  }

  setCell(x, y, val) {
    //@ts-ignore
    this.mapBlocks[y][x] = val;
  }

  generateMap() {
    
    const horizontalLines = getRandomInt(1, 3);
    const horizontals = [];
    for(let i = 0; i < horizontalLines; i ++) {
      let yLine = getRandomInt(1, (this.size.height - 1));
      horizontals.push(yLine);
    }
    horizontals.sort((a, b) => a - b);
    console.log(horizontals);


    const verticalLines = getRandomInt(1, 3);
    const verticals = [];
    for(let i = 0; i < verticalLines; i ++) {
      let xLine = getRandomInt(1,  Math.floor((this.size.height - 1) / 2));
      verticals.push(xLine);
    }
    verticals.sort((a,b) => a - b);

    const roomsNumber = getRandomInt(5, 10);
    const rooms = []; //[x, y, width, height]
    for(let i = 0; i < roomsNumber; i ++) {
      const roomRectangle = [getRandomInt(0, this.size.width), getRandomInt(0, this.size.height), getRandomInt(3,8), getRandomInt(3,8)];
      rooms.push(roomRectangle);
    }

    verticals.forEach(x => {
      for(let i = 0; i < this.mapBlocks.length; i ++) {
        //@ts-ignore
        this.mapBlocks[i][x] = 1;
      }
    });

    horizontals.forEach(y => {
      for(let i = 0; i < this.mapBlocks[y].length; i ++) {
        //@ts-ignore
        this.mapBlocks[y][i] = 1;
      }
    });

    console.log(this.mapBlocks);

    let necessaryHealth = 10;
    let necessarySword = 2;

    rooms.forEach(room => {
      const x0 = room[0];
      const y0 = room[1];
      const width = room[2];
      const height = room[3];
      let hasInterSections = false;
      for (let y = y0; y < y0 + height; y++) {
        for (let x = x0; x < x0 + width; x++) {
          if (x >= this.size.width || y >= this.size.height) {
            break;
          }
          this.setCell(x, y, 1);

          //#region CheckIntersections
          if (!hasInterSections) {
            if(x === x0) {
              //watch to left
              try{
                for(let i = x - 1; i !==0; i--) {
                  if (this.getCell(i, y) === 1) {
                    // debugger;
                    hasInterSections = true;
                    break;
                  }
                }
                for(let i = x - 1; i !==0; i--) {
                  if (this.getCell(i, y) === 1) {
                    break;
                  }
                  //@ts-ignore
                  this.mapBlocks[y][i] = 1;
                }
              } catch{}
            }
          }
          if (!hasInterSections) {
            if(y === y0) {
              //watch to top
              try{
                for(let i = y - 1; i !==0; i--) {
                  if (this.getCell(x, i) === 1) {
                    hasInterSections = true;
                    break;
                  }
                  for(let i = y - 1; i !==0; i--) {
                    if (this.getCell(x, i) === 1) {
                      break;
                    }
                    //@ts-ignore
                    this.mapBlocks[i][x] = 1;
                  }
                } 
              } catch{}
            }
          }
          if (!hasInterSections) {
            if(x === x0 + width - 1) {
              //watch to rigth
              try {
                for (let i = x + 1; i < this.mapBlocks[y].length; i++) {
                  if(this.getCell(i, y) === 1) {
                    hasInterSections = true;
                    break;
                  } 
                }
                for (let i = x + 1; i < this.mapBlocks[y].length; i++) {
                  if(this.getCell(i, y) === 1) {
                    break;
                  }
                  //@ts-ignore
                  this.mapBlocks[y][i] = 1;
                }
              } catch{}
            }
          }
          if (!hasInterSections) {
            if(y === y0 + height - 1) {
              //watch to bottom
              try{
                for(let i = y + 1; i < this.mapBlocks.length; i++) {
                  if(this.getCell(x, i) === 1) {
                    hasInterSections = true;
                    break;
                  }
                }
                for(let i = y + 1; i < this.mapBlocks.length; i++) {
                  if(this.getCell(x, i) === 1) {
                    break;
                  }
                  //@ts-ignore
                  this.mapBlocks[i][x] = 1;
                }
              } catch{}
            }
          }

          //#endregion
        }
        if (y >= this.size.height) {
          break;
        }
      }


      if (necessarySword) {
        necessarySword--;
        const genPosition = {x: Math.floor((x0 + width) / 2), y: Math.floor((y0 + height) / 2)}
        this.rooms.push({leftTopPointPos: {x: x0, y: y0}, size: {width, height}, spawnType: 'sword', spawnPos: genPosition});
      } else {
        necessaryHealth--;
        const genPosition = {x: Math.floor((x0 + width) / 2), y: Math.floor((y0 + height) / 2)}
        this.rooms.push({leftTopPointPos: {x: x0, y: y0}, size: {width, height}, spawnType: 'health', spawnPos: genPosition});
      }
    });

    // while (necessaryHealth) {

    // }
    // while (necessarySword) {
    //   necessaryHealth--;
    // }

    let map = '';
    for(let y = 0; y < this.mapBlocks.length; y++) {
      for(let x = 0; x < this.mapBlocks[y].length; x++) {
        this.getCell(x,y) === 1 ? map += '.' : map += '#';
      }
      map += '\n';
    }
    console.log(map);
  }

  renderMap() {
    const tileSize = {
      width: 0,
      height: 0,
    }

    //@ts-ignore
    /**@type {HTMLDivElement}*/const field = document.querySelector('.field');
    field.innerHTML = '';
    field.style.display = 'flex';
    field.style.flexWrap = 'wrap';

    tileSize.width = parseInt(getComputedStyle(field).width) / this.size.width;
    tileSize.height = parseInt(getComputedStyle(field).height) / this.size.height;

    for(let y = 0; y < this.mapBlocks.length; y++) {
      for(let x = 0; x < this.mapBlocks[y].length; x++) {
        field.appendChild(this.generateTile(this.mapBlocks[y][x], tileSize));
      }
    }
  }

  generateTile(type, size) {
    const tile = document.createElement('div');
    tile.classList.add('tile');
    tile.style.width = `${size.width}px`;
    tile.style.height = `${size.height}px`;
    tile.style.backgroundImage = "url(./images/tile-W.png)";
    // debugger;
    if(type === 0) {
    } else {
      tile.style.backgroundImage = "url(./images/tile-.png)";
    }

    return tile;
  }

  findRandomFreePos() {
    const freeCells = [];
    for(let y = 0; y < this.mapBlocks.length; y++) {
      for (let x = 0; x < this.mapBlocks[y].length; x++) {
        if(this.getCell(x,y) === 1) {
          freeCells.push([x, y]);
        }
      }
    }
    return freeCells[getRandomInt(0, freeCells.length - 1)];
  }

  restoreHils() {
    this.rooms.forEach(room => {
      if(room.spawnType === "health") {
        
      }
    });
  }

  createSwordUp() {

  }
}
