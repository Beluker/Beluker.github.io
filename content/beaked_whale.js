var ctrl_overlay = document.createElement('div')
document.querySelector('div.game').insertBefore(ctrl_overlay, document.querySelector('div.game').children[0])
ctrl_overlay.outerHTML = '<div id="ctrl-overlay" style="width: 100%;height: 100%;position: absolute;display: block;z-index:10000;pointer-events:none;"></div>'
function showCtrlOverlay(e) {
    if (e.ctrlKey || e.metaKey || e.altKey) {
        if (game.currentScene.myAnimal._visibleFishLevel != 101) {
            document.getElementById('ctrl-overlay').style.pointerEvents = 'all'
        }
        else if (!e.shiftKey) {
            if (game.currentScene.myAnimal._visibleFishLevel == 101)
            document.getElementById('ctrl-overlay').style.pointerEvents = 'all'
        }
        else {
            document.getElementById('ctrl-overlay').style.pointerEvents = 'none'
        }
    }
}
async function superShot() {
    setTimeout(() => {
        game.inputManager.handleLongPress(1);
    }, 0)
    setTimeout(() => {
        game.inputManager.handleLongPress(5000);
    }, 250);
    setTimeout(() => {
        console.log(game.currentScene.entityManager.entitiesList);
    }, 300);
}

async function beakedWhale() {
  // setTimeout(() => {
  //   game.inputManager.handleLongPress(5000);
  // }, 50);
  // setTimeout(() => {
  //   game.inputManager.handleLongPress(375);
  // }, 50);
  // setTimeout(() => {
  //   game.inputManager.handleLongPress(5000);
  // }, 100);
  //
  //
  setTimeout(() => {
    game.inputManager.handleLongPress(375);
  }, 0);
  setTimeout(() => {
    game.inputManager.handleLongPress(5000);
  }, 50);
  setTimeout(() => {
    game.inputManager.handleLongPress(5000);
  }, 100);
    }

    async function orcaWhale() {
        setTimeout(() => {
          game.inputManager.handleLongPress(5000)
        }, 0);
        setTimeout(() => {
          game.inputManager.handleLongPress(-500)
        }, 150);
        setTimeout(() => {
          game.inputManager.handleLongPress(-500)
        }, 300);
        setTimeout(() => {
          game.inputManager.handleLongPress(-500)
        }, 450);
        setTimeout(() => {
          game.inputManager.handleLongPress(-500)
        }, 600);

    }
async function haliButt() {
        game.inputManager.handleLongPress(5000);
 setTimeout(() => {
        game.inputManager.handleLongPress(5000);
      }, 751);
 setTimeout(() => {
        game.inputManager.handleLongPress(5000);
      }, 751);

}
async function bullyShark() {
        game.inputManager.handleLongPress(-500);
 setTimeout(() => {
        game.inputManager.handleLongPress(-500);
      }, 250);
 setTimeout(() => {
        game.inputManager.handleLongPress(-500);
      }, 500);

}
async function garFish(){
setTimeout(() => {
  game.inputManager.handleLongPress(5000);
}, 0);
setTimeout(() => {
  game.inputManager.handleLongPress(-500);
}, 100);
}
window.addEventListener("keydown",
function(e) {
        showCtrlOverlay(e)
    },
    false);
    window.addEventListener("click",
    function(e) {
        if (e.ctrlKey || e.metaKey) {
            if (e.shiftKey && (game.currentScene.myAnimal._visibleFishLevel == 109 || game.currentScene.myAnimal._visibleFishLevel == 100)) {
                console.log('hi')
                superShot()
            }
            else if(e.shiftKey && game.currentScene.myAnimal._visibleFishLevel == 107){

 beakedWhale();



}
else if(e.shiftKey && game.currentScene.myAnimal._visibleFishLevel == 111){

 haliButt();



}
else if(e.shiftKey && game.currentScene.myAnimal._visibleFishLevel == 11){

 orcaWhale();



}
else if(e.shiftKey && game.currentScene.myAnimal._visibleFishLevel == 86){

 garFish();



}
else if(e.shiftKey && game.currentScene.myAnimal._visibleFishLevel == 104){

 bullyShark();



}
            else if (e.shiftKey && game.currentScene.myAnimal._visibleFishLevel != 101) {
                game.inputManager.handleLongPress(-500)
            }
            else {
                game.inputManager.handleLongPress(5000)
            }
        }
        if (e.altKey) {
            game.inputManager.handleLongPress(350)
        }
    },
    false);
    window.addEventListener("keyup",
    function(e) {
        if (!e.ctrlKey || e.metaKey && !e.altKey) {
        document.getElementById('ctrl-overlay').style.pointerEvents = 'none'
    }
},
false);
