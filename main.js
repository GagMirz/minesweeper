import { loadImages } from './functions/graphic.js';
import { loadSounds } from './functions/sounds.js';
import { start, click } from './functions/mechanics.js'
//block 1 loading media, and getting content from html
let gameMedia = {
    sounds: loadSounds(),
    images: loadImages(),
    heightInput: document.getElementById("height"),
    widthInput: document.getElementById("width"),
    buttonInput: document.getElementById("button"),
    statusBar: document.getElementById("statusBar"),
    flagsBar: document.getElementById("flagAmount"),
    timerBar: document.getElementById("timer"),
    canvas: document.getElementById("canvas"),
    timer: 0
}

//block 2 game's main params
let gameObj = {
    contex: canvas.getContext("2d"),
    board: [],
    viewMap: [],
    width: 0,
    height: 0,
    flags: 0,
    timerId: 0,
    state: -1,
    openedCells: 0,
    mousePosition: [,],
    clickPosition: [,],
    clickState: 0
}

//adding events on click and mousedown
gameMedia.buttonInput.addEventListener("click", () => { start(gameObj, gameMedia) });
gameMedia.canvas.addEventListener("mousedown", (mouseEvent) => {
    click(gameObj, gameMedia, mouseEvent);
});