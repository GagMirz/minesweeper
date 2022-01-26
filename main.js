import { createBoard, setLandSize, createLand, fillMines, fillNumbers } from './functions/map.js';
import { fillCellIMG, loadImages, loadCanvas, renderViewMap, rendFullOpen, alertStatus } from './functions/graphic.js';
import { createViewMap, mousePosition, coordsToIndex, openCellMuhahaha, openCells } from "./functions/mechanics.js";

//loading images
var graPhic = loadImages();
//loading soundeffects
var sounds = [new Audio("./sounds/sharingan.mp3"), new Audio("./sounds/nya.mp3")
    , new Audio("./sounds/megu.mp3"), new Audio("./sounds/boom.mp3")
    , new Audio("./sounds/congrats.mp3")]
var cheerStatus = ["COOL", "NICE", "SUPER", "AWESOME", "GREATE", "HEROICAL", "MAGESTIC"];
//taking canvas
var canvas = document.getElementById("canvas");
var cont = canvas.getContext("2d");
//geting statusbar
var statusBar = document.getElementById("statusBar");
//start
let button = document.getElementById("button");
//timer interval id 
let timerId = 0;
let timerElement = document.getElementById("timer");
button.addEventListener("click", () => {
    //sound effect
    sounds[0].play()
    //get height and width
    let height = document.getElementById("height").value;
    let width = document.getElementById("width").value;

    //check if size is valid
    //if not will get out o function
    if (height < 5 || width < 5) {
        alertStatus(statusBar, "MIN HEIGHT & WIDTH IS 5");
        return 0;
    }
    //start alert
    alertStatus(statusBar, "START JOURNEY");
    //creating board object
    let board = createBoard();
    //creating land
    setLandSize(board, height, width);
    createLand(board);
    //loading canvas
    loadCanvas(canvas, cont, width, height);
    //making zero timer
    clearInterval(timerId);
    timerElement.innerHTML = "0";
    //amount of open cells
    let openCell = 0;
    //states if game has started
    //0 start, 1 going, 2 state
    let gameState = 0;
    //flag counter backward and writing it
    let flagAmount = Math.floor(width * height / 6 + 1);
    let flagHolder = document.getElementById("flagAmount");
    flagHolder.innerHTML = flagAmount;
    //creating open cells map
    //1/2 closed not rendered/rendered
    //3/4 open not rendered/rendered
    //5/6 flag not rendered/rendered
    let viewMap = createViewMap(width, height);
    //mouse down event
    canvas.addEventListener("mousedown", (e) => {
        //also plays on bomb ;_;
        sounds[1].play();
        //loosed or won
        if (gameState == 2) {
            return 0;
        }
        //getting mouse coordinates and making it position in matrix
        let mouse = mousePosition(canvas, e);
        //mouseSide is 1 for left, 2 for middle, 3 for right
        let mouseSide = mouse[0], mouseCoord = [mouse[1], mouse[2]];
        //index to approach through matrix
        let coordIndex = coordsToIndex(mouseCoord);
        //amount of opened cells for click
        let amount = 0;
        //depending on mouse side
        if (mouseSide == 1) {
            //if it's opening first cell, we will
            if (gameState == 0) {
                //start game, filling mines, depending on our first cell
                fillMines(board, coordIndex);
                fillNumbers(board);
                //making game active
                gameState = 1;
                //start timer
                let timerValue = 1;
                timerId = setInterval(() => {
                    timerElement.innerHTML = timerValue;
                    ++timerValue;
                }, 1000);
            }
            //if point is flagged do nothing
            if (viewMap[coordIndex[0]][coordIndex[1]] == 6) {
                return;
            }
            //open cell function
            //if amount = -1 loose
            amount = openCells(viewMap, board.land, coordIndex[0], coordIndex[1]);
        } else if (mouseSide == 3) {
            //puting flag or taking it of
            if (viewMap[coordIndex[0]][coordIndex[1]] == 4) {
                return 0;
            } else if (viewMap[coordIndex[0]][coordIndex[1]] == 6) {
                //taking of flag
                viewMap[coordIndex[0]][coordIndex[1]] = 1;
                flagHolder.innerHTML = ++flagAmount;
            } else {
                //putting flag
                viewMap[coordIndex[0]][coordIndex[1]] = 5;
                flagHolder.innerHTML = --flagAmount;
            }
        }
        openCell += renderViewMap(cont, graPhic, viewMap, board.land);
        //chechking if have touched a bomb
        //end game
        if (amount == -1) {
            clearInterval(timerId);
            rendFullOpen(cont, graPhic, viewMap, board.land);
            alertStatus(statusBar, "BOOM");
            gameState = 2;
            sounds[2].play();
            sounds[3].play();
            return 0;
        } else if (amount == 1) {
            alertStatus(statusBar, cheerStatus[Math.floor(Math.random() * cheerStatus.length)]);
        }
        //check if all is open
        //game win
        if (openCell == width * height - Math.floor(width * height / 6 + 1)) {
            clearInterval(timerId);
            rendFullOpen(cont, graPhic, viewMap, board.land);
            alertStatus(statusBar, "NICE, YOU DID IT");
            gameState = 2;
            sounds[4].play();
            return 0;
        }
    });
});