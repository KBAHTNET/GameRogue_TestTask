'use strict';

//Взаимодействие с интерфейсом

/**@type {HTMLDivElement}*/const gameBtn = document.querySelector('.start-btn');
/**@type {HTMLDivElement}*/const statsBtn = document.querySelector('.toggle-statusbar');
/**@type {HTMLDivElement}*/const inventoryBtn = document.querySelector('.toggle-inventory');

/**
 * @param {Game} game 
 */
function initInterface(game) {
  
  gameBtn.addEventListener('click', () => ToggleGameState(game));
  gameBtn.innerText = "Поставить на паузу";

  statsBtn.addEventListener('click', toggleToStats);
  inventoryBtn.addEventListener('click', toggleToInventory);

  function toggleToStats(e) {
    const containerTemplate = document.createElement('div');
    containerTemplate.classList.add('stats');
    containerTemplate.innerHTML = `
                                    <div class="health">
                                      <div class="health-img"></div>
                                      <div class="health-progress"></div>
                                      <div class="health-text"></div>
                                    </div>
                                    <div class="damage">
                                      <div class="damage-img"></div>
                                      <div class="damage-progress"></div>
                                      <div class="damage-text"></div>
                                    </div>
                                  `;

    document.querySelector('.active-statusbar').classList.remove('active-statusbar');
    e.currentTarget.classList.add('active-statusbar');

    const statusbarContainer = document.querySelector('.statusbar-container');
    statusbarContainer.innerHTML = '';
    statusbarContainer.appendChild(containerTemplate);
  }

  function toggleToInventory(e) {
    const containerTemplate = document.createElement('div');
    containerTemplate.classList.add('actor-inventory');

    document.querySelector('.active-statusbar').classList.remove('active-statusbar');
    e.currentTarget.classList.add('active-statusbar');

    const statusbarContainer = document.querySelector('.statusbar-container');
    statusbarContainer.innerHTML = '';
    statusbarContainer.appendChild(containerTemplate);
  }

  /**
   * @param {Game} game 
   */
  function ToggleGameState(game) {
    if (game.gameState === 'game') {
      game.gameState = 'pause';
      gameBtn.innerText = 'Возобновить игру';
    } else {
      game.gameState = 'game';
      gameBtn.innerText = 'Поставить на паузу';
    }
  }
}

/**
 * @param {Actor} actor 
 */
function DrawStats(actor) {
  if(statsBtn.classList.contains('active-statusbar')) {
    /**@type {HTMLDivElement}*/
    const health = document.querySelector('.current-health');
    health.innerText = actor.health + '%';
    health.style.width = actor.health + '%';
    // console.log(actor.health);

    /**@type {HTMLDivElement}*/
    const damage = document.querySelector('.current-damage');
    damage.style.width = actor.damage + '%';
    damage.innerText = actor.damage + '%';
  }
}

/**
 * @param {number} kills 
 */
function DrawKills(kills) {
  /**@type {HTMLDivElement}*/
  const killsContainer = document.querySelector('.kills');
  killsContainer.innerText = `Убийств: ${kills}`;
}

/**
 * 
 * @param {number} time 
 */
 function DrawTimer(time) {
  /**@type {HTMLDivElement}*/
  const timerBlock = document.querySelector('.timer');
  timerBlock.innerText = `Время игры: ${msToTime(Math.round(time))}`;
}