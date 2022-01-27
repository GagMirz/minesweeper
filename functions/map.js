//generates board
export const createBoard = (gameObj, gameMedia) => {
    gameObj.height = Number(gameMedia.heightInput.value);
    gameObj.width = Number(gameMedia.widthInput.value);
    if (gameObj.height < 5 || gameObj.width < 5) {
        return 1;
    }
    gameObj.board = new Array(gameObj.height);
    for (let i = 0; i < gameObj.height; ++i) {
        gameObj.board[i] = new Array(gameObj.width).fill(0);
    }
    return 0;
}

export const createViewMap = (gameObj) => {
    gameObj.viewMap = new Array(gameObj.height);
    for (let i = 0; i < gameObj.height; ++i) {
        gameObj.viewMap[i] = new Array(gameObj.width).fill(2);
    }
}

//generates random coordinate in range of board's land
export const randomCoordinate = (gameObj) => {
    return [Math.floor(Math.random() * (gameObj.height)),
    Math.floor(Math.random() * (gameObj.width))];
}

//returns distance square between two given points
//this is used to check if cell is neighbor cell to starting cell
export const distanceSquare = (firstCoordinate, secondCoordinate) => {
    return Math.pow(firstCoordinate[0] - secondCoordinate[0], 2) +
        Math.pow(firstCoordinate[1] - secondCoordinate[1], 2);
}

//with this function we randomly put mines on land
//except starting point and it's neighborhood :o
export const fillMines = (gameObj) => {
    let randomMine;
    //amount of mines are equal width*height/6 for some purposes -/\-
    for (let i = 0; i <= (gameObj.width * gameObj.height / 6); ++i) {
        randomMine = randomCoordinate(gameObj);
        //here we check generated mine cell distance square from starting cell
        //if it's greater then 2 it's not neighbor cell
        if (distanceSquare(randomMine, gameObj.clickPosition) > 2 && gameObj.board[randomMine[0]][randomMine[1]] != 9) {
            gameObj.board[randomMine[0]][randomMine[1]] = 9;
        } else {
            --i;
        }
    }
}

//takes sum of surrounding elements
//coordinateV -> vertical
//coordinateH -> horizontal
export const surroundingCells = (matrix, coordinateV, coordinateH, aimNumber) => {
    let sum = 0, val = 0;
    for (let i = coordinateV - 1; i <= coordinateV + 1; ++i) {
        for (let j = coordinateH - 1; j <= coordinateH + 1; ++j) {
            //if we get out of boundaries trying to sum cell's neighbor's mines amount
            //it will just give error or undefined
            try {
                //if it's undefined equation will be false/0
                val = matrix[i][j] == aimNumber;
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
export const fillNumbers = (gameObj) => {
    for (let i = 0; i < gameObj.height; ++i) {
        for (let j = 0; j < gameObj.width; ++j) {
            if (gameObj.board[i][j] != 9) {
                gameObj.board[i][j] = surroundingCells(gameObj.board, i, j, 9);
            }
        }
    }
}
