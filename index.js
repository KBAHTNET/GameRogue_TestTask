//@ts-check
'use strict';
document.addEventListener('DOMContentLoaded', main);

function main() {
  alert("Начать");
  injectScripts();
}

function injectScripts() {
  const scripts = [ './Engine/person.js', './Engine/actor.js', './Engine/enemy.js', './Engine/actor_stats.js',
                    './Engine/interface.js', './Engine/controller.js',
                    './Engine/game.js', './Engine/map.js', './Engine/utils.js', 
                  ];

  let scriptNumber = 0;
  const loadscript = () => {
    if (scriptNumber === scripts.length) {
      return new Game().init();
    };

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = scripts[scriptNumber];
    document.body.appendChild(script);

    script.onload = () => {
      scriptNumber++;
      loadscript();
    };
  };

  loadscript();
}

