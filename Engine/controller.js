'use strict';

//Управление персонажем

/**
 * 
 * @param {Actor} actor 
 */
function initActorController(actor) {
  window.addEventListener('keyup', (e) => {
    // debugger;
    if(e.key === 'w' || e.key === 'ц') {
      actor.move({lambdaX:0,lambdaY:-1});
    }
    if(e.key === 'a' || e.key === 'ф') {
      actor.move({lambdaX:-1,lambdaY:0});
    }

    if(e.key === 's' || e.key === 'ы') {
      actor.move({lambdaX:0,lambdaY:1});
    }
    if(e.key === 'd' || e.key === 'в') {
      actor.move({lambdaX:1,lambdaY:0});
    }

    if(e.key === ' ') {

    }
    console.log(e);
  });
}