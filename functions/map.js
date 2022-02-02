//generate board
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

export const randomCoordinate = ({ height, width }) => {
    return [Math.floor(Math.random() * (height)),
    Math.floor(Math.random() * (width))];
}

export const distanceSquare = (firstCoordinate, secondCoordinate) => {
    return Math.pow(firstCoordinate[0] - secondCoordinate[0], 2) +
        Math.pow(firstCoordinate[1] - secondCoordinate[1], 2);
}

//except starting point and it's neighborhood :o
export const fillMines = (gameObj) => {
    let randomMine;
    //amount of mines are equal width*height/6 for some purposes -/\-
    for (let i = 0; i <= (gameObj.width * gameObj.height / 6); ++i) {
        randomMine = randomCoordinate(gameObj);
        //neighboor cells dist < 2
        if (distanceSquare(randomMine, gameObj.clickPosition) > 2 && gameObj.board[randomMine[0]][randomMine[1]] != 9) {
            gameObj.board[randomMine[0]][randomMine[1]] = 9;
        } else {
            --i;
        }
    }
}

export const surroundingCells = (matrix, coordinateV, coordinateH, aimNumber) => {
    let sum = 0, val = 0;
    for (let i = coordinateV - 1; i <= coordinateV + 1; ++i) {
        for (let j = coordinateH - 1; j <= coordinateH + 1; ++j) {
            try {
                val = matrix[i][j] == aimNumber;
            } catch (error) {
                val = 0;
            }
            sum += val;
        }
    }
    return sum;
}

export const fillNumbers = (gameObj) => {
    for (let i = 0; i < gameObj.height; ++i) {
        for (let j = 0; j < gameObj.width; ++j) {
            if (gameObj.board[i][j] != 9) {
                gameObj.board[i][j] = surroundingCells(gameObj.board, i, j, 9);
            }
        }
    }
}
