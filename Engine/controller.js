'use strict';

//Управление персонажем

/**
 * 
 * @param {Actor} actor 
 */
function initActorController(actor) {
  window.addEventListener('keyup', (e) => {
    if(e.key === 'w') {
      actor.move({lambdaX:0,lambdaY:-1});
    }
    if(e.key === 'a') {
      actor.move({lambdaX:-1,lambdaY:0});
    }

    if(e.key === 's') {
      actor.move({lambdaX:0,lambdaY:1});
    }
    if(e.key === 'd') {
      actor.move({lambdaX:1,lambdaY:0});
    }

    if(e.key === ' ') {

    }
    console.log(e);
  });
}