
//filling image on cell
const fillCellIMG = (gameObj, img, position) => {
    gameObj.contex.drawImage(img, position[1] * 32 + 2, position[0] * 32 + 2);
}

//Draws closed cell, position in pixel
const drawCloseCell = (gameObj, position) => {
    gameObj.contex.fillStyle = "gray";
    gameObj.contex.fillRect(position[0], position[1], 30, 30);
}

//load images and return object
export const loadImages = () => {
    //open cell
    var p0 = new Image();
    p0.src = "pictures/zero.png"
    //numbers
    var p1 = new Image();
    p1.src = "pictures/one.png";
    var p2 = new Image();
    p2.src = "pictures/two.png";
    var p3 = new Image();
    p3.src = "pictures/three.png";
    var p4 = new Image();
    p4.src = "pictures/four.png";
    var p5 = new Image();
    p5.src = "pictures/five.png";
    var p6 = new Image();
    p6.src = "pictures/six.png";
    var p7 = new Image();
    p7.src = "pictures/seven.png";
    var p8 = new Image();
    p8.src = "pictures/eight.png";
    //mines
    var pm = new Image();
    pm.src = "pictures/mine.png";
    //flags
    var pf = new Image();
    pf.src = "pictures/flag.png";
    let graPhic = {
        0: p0,
        1: p1,
        2: p2,
        3: p3,
        4: p4,
        5: p5,
        6: p6,
        7: p7,
        8: p8,
        9: pm,
        10: pf
    }
    return graPhic;
}

//filling canvas board closed cells
export const loadCanvas = (gameObj, gameMedia) => {
    //preventing right click menu
    gameMedia.canvas.oncontextmenu = (e) => { e.preventDefault(); };

    //seting size of canvas
    gameMedia.canvas.width = gameObj.width * 32 + 2;
    gameMedia.canvas.height = gameObj.height * 32 + 2;

    //filling background
    gameObj.contex.fillStyle = "#565656";
    gameObj.contex.fillRect(0, 0, gameObj.width * 32 + 2, gameObj.height * 32 + 2);

    //filling canvas with gray cells
    for (let i = 2; i < gameObj.width * 32; i += 32) {
        for (let j = 2; j < gameObj.height * 32; j += 32) {
            drawCloseCell(gameObj, [i, j]);
        }
    }
}

//rendering according to viewMap
export const renderViewMap = (gameObj, gameMedia) => {
    let amountOfOpenedCells = 0;
    for (let i = 0; i < gameObj.height; ++i) {
        for (let j = 0; j < gameObj.width; j++) {
            switch (gameObj.viewMap[i][j]) {
                //opening cell
                case 1:
                    drawCloseCell(gameObj, [j * 32 + 2, i * 32 + 2]);
                    //to state it rendered
                    ++gameObj.viewMap[i][j];
                    break;
                case 3:
                    fillCellIMG(gameObj, gameMedia.images[gameObj.board[i][j]], [i, j]);
                    //to state it rendered
                    ++gameObj.viewMap[i][j];
                    ++amountOfOpenedCells;
                    break;
                case 5:
                    fillCellIMG(gameObj, gameMedia.images[10], [i, j]);
                    //to state it rendered
                    ++gameObj.viewMap[i][j];
                    break;
            }
        }
    }
    return amountOfOpenedCells;
}

//opening full map
export const rendFullOpen = (gameObj, gameMedia) => {
    //making all cells open not rendered
    for (let i = 0; i < gameObj.height; ++i) {
        for (let j = 0; j < gameObj.width; ++j) {
            gameObj.viewMap[i][j] = 3;
        }
    }
    renderViewMap(gameObj, gameMedia);
}