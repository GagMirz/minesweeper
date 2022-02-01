import { imagesObj } from './functions/graphic.js';
import { soundsObj } from './functions/sounds.js';
import { start, click } from './functions/mechanics.js'

const gameMedia = {
    sounds: soundsObj,
    images: imagesObj,
    cheers: ["NICE", "COOL", "HEROIC", "MAGNIFICENT",
    "WHOLESOME", "GOD MOVE", "GREAT", "JUST DO IT",
    "TOUGH", "KAWAIIII", "CUTE", "ABSOLUTE"],
    heightInput: document.getElementById("height"),
    widthInput: document.getElementById("width"),
    buttonInput: document.getElementById("button"),
    statusBar: document.getElementById("statusBar"),
    flagsBar: document.getElementById("flagAmount"),
    timerBar: document.getElementById("timer"),
    canvas: document.getElementById("canvas")
}

const gameObj = {
    contex: canvas.getContext("2d"),
    board: new Array(2),
    viewMap: new Array(2),
    width: 0,
    height: 0,
    flags: 0,
    timerId: 0,
    timer: 0,
    state: -1,
    openedCells: 0,
    mousePosition: new Array(2),
    clickPosition: new Array(2),
    clickState: 0
}

// Add mouse events 
gameMedia.buttonInput.addEventListener("click", () => { start(gameObj, gameMedia) });
gameMedia.canvas.addEventListener("mousedown", (mouseEvent) => {
    click(gameObj, gameMedia, mouseEvent);
});
