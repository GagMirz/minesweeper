const fillCellIMG = (gameObj, img, position) => {
    gameObj.contex.drawImage(img, position[1] * 32 + 2, position[0] * 32 + 2);
}

const drawCloseCell = (gameObj, position) => {
    gameObj.contex.fillStyle = "gray";
    gameObj.contex.fillRect(position[0], position[1], 30, 30);
}

const loadImage = (address) => {
    let image = new Image();
    image.src = address;
    return image;
}

export const imagesObj = {
    0: loadImage("pictures/zero.png"),
    1: loadImage("pictures/one.png"),
    2: loadImage("pictures/two.png"),
    3: loadImage("pictures/three.png"),
    4: loadImage("pictures/four.png"),
    5: loadImage("pictures/five.png"),
    6: loadImage("pictures/siz.png"),
    7: loadImage("pictures/seven.png"),
    8: loadImage("pictures/eight.png"),
    9: loadImage("pictures/mine.png"),
    10: loadImage("pictures/flag.png")
}

//fill closed cells
export const loadCanvas = (gameObj, gameMedia) => {
    //prevent right click menu
    gameMedia.canvas.oncontextmenu = (e) => { e.preventDefault(); };

    //set size of canvas
    gameMedia.canvas.width = gameObj.width * 32 + 2;
    gameMedia.canvas.height = gameObj.height * 32 + 2;

    //fill background
    gameObj.contex.fillStyle = "#565656";
    gameObj.contex.fillRect(0, 0, gameObj.width * 32 + 2, gameObj.height * 32 + 2);

    //fill canvas with gray cells
    for (let i = 2; i < gameObj.width * 32; i += 32) {
        for (let j = 2; j < gameObj.height * 32; j += 32) {
            drawCloseCell(gameObj, [i, j]);
        }
    }
}

//render viewMap
export const renderViewMap = (gameObj, gameMedia) => {
    let amountOfOpenedCells = 0;
    for (let i = 0; i < gameObj.height; ++i) {
        for (let j = 0; j < gameObj.width; j++) {
            switch (gameObj.viewMap[i][j]) {
                //open cell
                case 1:
                    drawCloseCell(gameObj, [j * 32 + 2, i * 32 + 2]);
                    //state rendered
                    ++gameObj.viewMap[i][j];
                    break;
                case 3:
                    fillCellIMG(gameObj, gameMedia.images[gameObj.board[i][j]], [i, j]);
                    //state rendered
                    ++gameObj.viewMap[i][j];
                    ++amountOfOpenedCells;
                    break;
                case 5:
                    fillCellIMG(gameObj, gameMedia.images[10], [i, j]);
                    //state rendered
                    ++gameObj.viewMap[i][j];
                    break;
            }
        }
    }
    return amountOfOpenedCells;
}

//opening full map
export const rendFullOpen = (gameObj, gameMedia) => {
    //open cells
    for (let i = 0; i < gameObj.height; ++i) {
        for (let j = 0; j < gameObj.width; ++j) {
            gameObj.viewMap[i][j] = 3;
        }
    }
    //render map
    renderViewMap(gameObj, gameMedia);
}