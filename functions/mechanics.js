import { createBoard, fillMines, fillNumbers, createViewMap, surroundingCells } from "./map.js"
import { loadCanvas, renderViewMap, fullOpen } from "./graphic.js"
import { setFlags, setTimer, setStatus, giveCheers } from "./status.js";
import { stopPreviousSound } from "./sounds.js";

//alld cell's neighbour cells indexes
const neighbourIndexes = (i, j) => {
    return [[i - 1, j - 1], [i - 1, j], [i - 1, j + 1],
    [i, j - 1], [i, j + 1],
    [i + 1, j - 1], [i + 1, j], [i + 1, j + 1]];
}

//openingCells
export const openCells = (gameObj, gameMedia, i, j, steps = { c: 0 }) => {
    //if index is out of bound return 0
    if (i < 0 || j < 0 || i > gameObj.viewMap.length - 1 || j > gameObj.viewMap[0].length) return 0;
    //if flaged or just opened return 0
    if (gameObj.viewMap[i][j] == 6 || gameObj.viewMap[i][j] == 3) return 0;
    //if it is flagged on needed amount
    //trying to open surrounding cells
    if (gameObj.viewMap[i][j] == 4 && surroundingCells(gameObj.viewMap, i, j, 6) == gameObj.board[i][j] && gameObj.board[i][j] != 0 && steps.c == 0) {
        ++steps.c;
        let neighbours = neighbourIndexes(i, j);
        for (let t = 0; t < 8; ++t) {
            try { if (gameObj.board[neighbours[t][0]][neighbours[t][1]] == 9 && gameObj.viewMap[neighbours[t][0]][neighbours[t][1]] == 2) return -1; } catch (e) { }
            openCells(gameObj, gameMedia, neighbours[t][0], neighbours[t][1], steps);
        }
        return 1;
    } else if (gameObj.viewMap[i][j] == 4) {
        return 0;
    }

    //opening neighbour empty cells
    if (gameObj.board[i][j] == 0 && gameObj.viewMap[i][j] == 2) {
        gameObj.viewMap[i][j] = 3;
        steps.c = 1;
        let neighbours = neighbourIndexes(i, j);
        for (let t = 0; t < 8; ++t) {
            openCells(gameObj, gameMedia, neighbours[t][0], neighbours[t][1], steps);
        }
        return 1;
    } else if (gameObj.board[i][j] < 9) {
        //opeing a cell if it's not a bomb
        gameObj.viewMap[i][j] = 3;
        steps.c = 1;
        gameMedia.sounds["click"].play();
        setStatus(gameMedia, giveCheers(gameMedia));
        return 1;
    } else if (gameObj.board[i][j] == 9 && steps.c == 0) {
        //if it's bomb
        return -1;
    }
}

//click function to pass it to event listener
export const click = (gameObj, gameMedia, mouseEvent) => {
    //chechking gamestate
    if (gameObj.state < 0) {
        return 0;
    }
    //geting mouse position
    let rect = gameMedia.canvas.getBoundingClientRect();
    gameObj.mousePosition = [mouseEvent.clientY - rect.top, mouseEvent.clientX - rect.left];
    gameObj.clickPosition = [Math.floor((gameObj.mousePosition[0] - 2) / 32), Math.floor((gameObj.mousePosition[1] - 2) / 32)]
    let stepStat = 0;
    if (mouseEvent.which == 1) {
        //first click
        stepStat = 0;
        if (gameObj.state == 0) {
            gameObj.state = 1;
            gameObj.openedCells = 0;
            fillMines(gameObj);
            fillNumbers(gameObj);
            //starting timer
            gameObj.timer = 1;
            gameObj.timerId = setInterval(() => {
                setTimer(gameObj, gameMedia);
                ++gameObj.timer;
            }, 1000);
        }
        //if flagged do nothing
        if (gameObj.viewMap[gameObj.clickPosition[0]][gameObj.clickPosition[1]] == 6) {
            return 0;
        }
        //opening 
        stepStat = openCells(gameObj, gameMedia, gameObj.clickPosition[0], gameObj.clickPosition[1]);
    } else if (mouseEvent.which == 3 && gameObj.state == 1) {
        //working on right click, puting flags or taking it off
        //do nothing if cell is open
        if (gameObj.viewMap[gameObj.clickPosition[0]][gameObj.clickPosition[1]] == 4) {
            return 0;
        } else if (gameObj.viewMap[gameObj.clickPosition[0]][gameObj.clickPosition[1]] == 6) {
            ;
            gameObj.viewMap[gameObj.clickPosition[0]][gameObj.clickPosition[1]] = 1;
            setFlags(gameMedia, ++gameObj.flag);
            stopPreviousSound(gameMedia);
            gameMedia.sounds["flag"].play();
        } else {
            gameObj.viewMap[gameObj.clickPosition[0]][gameObj.clickPosition[1]] = 5;
            setFlags(gameMedia, --gameObj.flag);
            stopPreviousSound(gameMedia);
            gameMedia.sounds["flag"].play();
        }
    }

    gameObj.openedCells += renderViewMap(gameObj, gameMedia);
    // loose
    if (stepStat == -1) {
        clearInterval(gameObj.timerId);
        fullOpen(gameObj);
        renderViewMap(gameObj, gameMedia);
        setStatus(gameMedia, "BOOM");
        gameObj.state = -1;
        gameMedia.sounds["loose1"].play();
        gameMedia.sounds["loose2"].play();
        return 0;
    }

    // win
    if (gameObj.openedCells == gameObj.width * gameObj.height - Math.floor(gameObj.width * gameObj.height / 6 + 1)) {
        clearInterval(gameObj.timerId);
        fullOpen(gameObj);
        renderViewMap(gameObj, gameMedia);
        setStatus(gameMedia, "NICE, YOU DID IT");
        gameObj.State = -1;
        gameMedia.sounds["win"].play();
        return 0;
    }
}


// sweep it button
export const start = (gameObj, gameMedia) => {
    if (createBoard(gameObj, gameMedia)) {
        setStatus(gameMedia, "MIN VALUES IS 5");
        return -1;
    }

    //Startscene
    createViewMap(gameObj);
    stopPreviousSound(gameMedia);
    gameMedia.sounds["start"].play();
    setStatus(gameMedia, "START JOURNEY");
    loadCanvas(gameObj, gameMedia);
    clearInterval(gameObj.timerId);
    gameObj.timer = 0;
    gameObj.state = 0;
    setTimer(gameObj, gameMedia);
    gameObj.flag = Math.floor(gameObj.width * gameObj.height / 6 + 1);;
    setFlags(gameMedia, gameObj.flag);
}
