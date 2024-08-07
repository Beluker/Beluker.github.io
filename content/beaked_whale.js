/*
declare this:
    window.inputManager = this[t(312)];
    window.app = this;
at this breakpoint:
    this[t(440)] = new iE(this)
*/
// const title = "Beaked Whale Glitch",
// game_version = "59",
// author = "Crisps";

var ctrl_overlay = document.createElement('div')
document.querySelector('div.game').insertBefore(ctrl_overlay, document.querySelector('div.game').children[0])
ctrl_overlay.outerHTML = '<div id="ctrl-overlay" style="width: 100%;height: 100%;position: absolute;display: block;z-index:10000;pointer-events:none;"></div>'
function showCtrlOverlay(e) {
    if (e.ctrlKey || e.metaKey || e.altKey) {
        if (app._0x1c84fe.myAnimals[0].visibleFishLevel != 101) {
            document.getElementById('ctrl-overlay').style.pointerEvents = 'all'
        }
        else if (!e.shiftKey) {
            if (app._0x1c84fe.myAnimals[0].visibleFishLevel == 101)
            document.getElementById('ctrl-overlay').style.pointerEvents = 'all'
        }
        else {
            document.getElementById('ctrl-overlay').style.pointerEvents = 'none'
        }
    }
}
async function beakedWhale(){
    setTimeout(() => {
        inputManager._0x10143d(375);
    }, 0);
    setTimeout(() => {
        inputManager._0x10143d(5000);
    }, 50);
    setTimeout(() => {
        inputManager._0x10143d(5000);
    }, 100);
}
async function pufferDash(){
    setTimeout(() => {
        inputManager._0x10143d(-500);
    }, 0);
    setTimeout(() => {
        inputManager._0x10143d(-500);
    }, 200);
    setTimeout(() => {
        inputManager._0x10143d(-500);
    }, 300);
}
window.addEventListener("keydown", function(e){ 
    showCtrlOverlay(e)
}, false);
window.addEventListener("click", function(e) {
        if (e.ctrlKey || e.metaKey) {
            if(e.shiftKey && app._0x1c84fe.myAnimals[0].visibleFishLevel == 107){
                beakedWhale();
            } else if(e.shiftKey && app._0x1c84fe.myAnimals[0].visibleFishLevel == 65){
                pufferDash();
            } else if (e.shiftKey && app._0x1c84fe.myAnimals[0].visibleFishLevel != 101) {
                inputManager._0x10143d(-500);
            } else {
                inputManager._0x10143d(5000);
            }
        }
        if (e.altKey) {
            inputManager._0x10143d(350);
        }
}, false);
window.addEventListener("keyup",
    function(e) {
        if (!e.ctrlKey || e.metaKey && !e.altKey) {
        document.getElementById('ctrl-overlay').style.pointerEvents = 'none'
    }
}, false);
