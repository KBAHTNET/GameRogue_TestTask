//@ts-check
'use strict';
document.addEventListener('DOMContentLoaded', main);

function main() {
  injectScripts();
}

function injectScripts() {
  const scripts = [ './Engine/person.js', './Engine/actor.js', './Engine/enemy.js', './Engine/interface.js', './Engine/controller.js',
                    './Engine/game.js', './Engine/map.js', './Engine/utils.js', 
                  ];

  const scriptsNumber = scripts.length;

  // const readyScripts = [];

  // scripts.forEach(scriptPath => {
  //   const script = document.createElement('script');
  //   script.type = 'text/javascript';
  //   script.src = scriptPath;
  //   document.body.appendChild(script);

  //   script.onload = () => readyScripts.push(1);
  // });
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


  // while(scripts) {
  //   const scriptPath = scripts.shift();
  //   const script = document.createElement('script');
  //   script.type = 'text/javascript';
  //   // @ts-ignore
  //   script.src = scriptPath;
  //   document.body.appendChild(script);

  // }

  // const waitInterval = setInterval(() => {
  //   if(readyScripts.length === scriptsNumber ) {
  //     clearInterval(waitInterval);
  //     new Game().init();
  //   }
  // }, 10);
}

