var canvas = document.querySelector("#canvas-container > canvas");
var ctrl_overlay = document.createElement('div');
document.querySelector('div.game').insertBefore(ctrl_overlay, document.querySelector('div.game').children[0]);
ctrl_overlay.outerHTML = '<div id="ctrl-overlay" style="width: 100%;height: 100%;position: absolute;display: block;z-index:10000;pointer-events:none;"></div>'
function showCtrlOverlay(e) {
    if (e.ctrlKey || e.metaKey || e.altKey) {
        document.getElementById('ctrl-overlay').style.pointerEvents = 'all';
    }
}
async function beaked_whale(){
    //use echo ability
    setTimeout(()=>{
        game.inputManager.handleLongPress(350);
    }, 0);

    //fire a bubble
    setTimeout(()=>{
        game.inputManager.handleLongPress(1000);
    }, 75);

    //fire a bubble
    setTimeout(()=>{
        game.inputManager.handleLongPress(1000);
    }, 150);
}
window.addEventListener("keydown",function(e) {
        showCtrlOverlay(e)
    },  false);
    window.addEventListener("click", function(e) {
        if (e.ctrlKey || e.metaKey) {
            if(e.shiftKey && game.currentScene.myAnimal._visibleFishLevel === 107){
                beaked_whale();
            }
        }
    }, false);
window.addEventListener("keyup", function(e) {
    if (!e.ctrlKey || e.metaKey && !e.altKey) {
        document.getElementById('ctrl-overlay').style.pointerEvents = 'none'
    }
}, false);
