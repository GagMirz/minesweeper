//board blank
/*let board = {
    height : 0,
    width : 0,
    land : []
}*/
//creating board object
export function createBoard() {
    return {
        height: 0,
        width: 0,
        land: []
    };
}

//seting land size, you should check valid size before calling this function
export function setLandSize(boardObj, height, width) {
    boardObj.height = height;
    boardObj.width = width;
}

//creates land matrix(two dimensional array of mXn size) filled with 0
export function createLand(boardObj) {
    boardObj.land = new Array(boardObj.height);
    for (let i = 0; i < boardObj.height; ++i) {
        boardObj.land[i] = new Array(boardObj.width).fill(0);
    }

}

//generates random coordinate in range of board's land
export function randomCoordinate(boardObj) {
    return [Math.floor(Math.random() * (boardObj.height)),
    Math.floor(Math.random() * (boardObj.width))];
}

//returns distance square between two given points
//this is used to check if cell is neighbor cell to starting cell
export function distanceSquare(firstCoordinate, secondCoordinate) {
    return Math.pow(firstCoordinate[0] - secondCoordinate[0], 2) +
        Math.pow(firstCoordinate[1] - secondCoordinate[1], 2);
}

//with this function we randomly put mines on land
//except starting point and it's neighborhood :o
export function fillMines(boardObj, startCoordinate) {
    let randomMine;
    //amount of mines are equal width*height/6 for some purposes -/\-
    for (let i = 0; i <= (boardObj.width * boardObj.height / 6); ++i) {
        randomMine = randomCoordinate(boardObj);
        //here we check generated mine cell distance square from starting cell
        //if it's greater then 2 it's not neighbor cell
        if (distanceSquare(randomMine, startCoordinate) > 2 && boardObj.land[randomMine[0]][randomMine[1]] != 9) {
            boardObj.land[randomMine[0]][randomMine[1]] = 9;
        } else {
            --i;
        }
    }
}

//takes sum of surrounding elements
//coordinateV -> vertical
//coordinateH -> horizontal
export function surroundingCells(board, coordinateV, coordinateH, aimNumber) {
    let sum = 0, val = 0;
    for (let i = coordinateV - 1; i <= coordinateV + 1; ++i) {
        for (let j = coordinateH - 1; j <= coordinateH + 1; ++j) {
            //if we get out of boundaries trying to sum cell's neighbor's mines amount
            //it will just give error or undefined
            try {
                //if it's undefined equation will be false/0
                val = board[i][j] == aimNumber;
            } catch (error) {
                //if we try access element of undefined we would get error
                //we just put 0 in val and get further
                val = 0;
            }
            sum += val;
        }
    }
    return sum;
}

//after puting mines
//we need to numerate cells depending on amount of mines
export function fillNumbers(boardObj) {
    for (let i = 0; i < boardObj.height; ++i) {
        for (let j = 0; j < boardObj.width; ++j) {
            if (boardObj.land[i][j] != 9) {
                boardObj.land[i][j] = surroundingCells(boardObj.land, i, j, 9);
            }
        }
    }
}
