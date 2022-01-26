import { surroundingCells } from './map.js';

//creating matrix for view control
export function createViewMap(width, height) {
    let viewMap = new Array(height);
    for (let i = 0; i < height; ++i) {
        viewMap[i] = (new Array(Number(width))).fill(2);
    }
    return viewMap;
}

//click event
//Coppied code, forgive me Duck
export function mousePosition(canvas, event) {
    let rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
    return [event.which, y, x];
}

//matrix indexes from coordinates
export function coordsToIndex(coords) {
    let index = [,];
    index[0] = Math.floor((coords[0] - 2) / 32);
    index[1] = Math.floor((coords[1] - 2) / 32);
    return index;
}

//in this function we will open cells
//why muhahaha? cause before writing it, I knew that it's going to be a hell
//just a reminder that there was an awfull function like this
export function openCellMuhahaha(viewLand, gameLand, indexes) {
}

//for opencellmuhahahah it's just opening one cell and trying to open others
function neighbourIndexes(i, j) {
    return [[i - 1, j - 1], [i - 1, j], [i - 1, j + 1],
    [i, j - 1], [i, j + 1],
    [i + 1, j - 1], [i + 1, j], [i + 1, j + 1]];
}
//open Cell's
export function openCells(viewLand, gameLand, i, j, steps = { c: 0 }) {
    //if index is out of bound return 0
    if (i < 0 || j < 0 || i > viewLand.length - 1 || j > viewLand[0].length) return 0;
    //if flaged or just opened return 0
    if (viewLand[i][j] == 6 || viewLand[i][j] == 3) return 0;
    //if it is flagged on needed amount
    if (viewLand[i][j] == 4 && surroundingCells(viewLand, i, j, 6) == gameLand[i][j] && gameLand[i][j] != 0 && steps.c == 0) {
        ++steps.c;
        let counter = 0;
        let neighbours = neighbourIndexes(i, j);
        for (let t = 0; t < 8; ++t) {
            try { if (gameLand[neighbours[t][0]][neighbours[t][1]] == 9 && viewLand[neighbours[t][0]][neighbours[t][1]] == 2) return -1; } catch (e) { }
            openCells(viewLand, gameLand, neighbours[t][0], neighbours[t][1], steps);
        }
        return 1;
    } else if (viewLand[i][j] == 4) {
        return 0;
    }
    if (gameLand[i][j] == 0 && viewLand[i][j] == 2) {
        viewLand[i][j] = 3;
        steps.c = 1;
        let neighbours = neighbourIndexes(i, j);
        for (let t = 0; t < 8; ++t) {
            openCells(viewLand, gameLand, neighbours[t][0], neighbours[t][1], steps);
        }
        return 1;
    } else if (gameLand[i][j] < 9  /*to make sure it's first*/) {
        viewLand[i][j] = 3;
        steps.c = 1;
        return 1;
    } else if (gameLand[i][j] == 9 && steps.c == 0) {
        return -1;
    }
}
