const fillCellIMG = (contex, img, position) => {
    contex.drawImage(img, position[1] * 32 + 2, position[0] * 32 + 2);
}

const drawCloseCell = (contex, position) => {
    contex.fillStyle = "gray";
    contex.fillRect(position[0], position[1], 30, 30);
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
    6: loadImage("pictures/six.png"),
    7: loadImage("pictures/seven.png"),
    8: loadImage("pictures/eight.png"),
    9: loadImage("pictures/mine.png"),
    10: loadImage("pictures/flag.png")
}

export const loadCanvas = ({ contex, height, width }, { canvas }) => {
    //prevent right click menu
    canvas.oncontextmenu = (e) => { e.preventDefault(); };

    canvas.width = width * 32 + 2;
    canvas.height = height * 32 + 2;

    //fill background
    contex.fillStyle = "#565656";
    contex.fillRect(0, 0, width * 32 + 2, height * 32 + 2);

    //fill canvas with gray cells
    for (let i = 2; i < width * 32; i += 32) {
        for (let j = 2; j < height * 32; j += 32) {
            drawCloseCell(contex, [i, j]);
        }
    }
}

export const renderViewMap = ({ contex, board, viewMap, height, width }, { images }) => {
    let amountOfOpenedCells = 0;
    for (let i = 0; i < height; ++i) {
        for (let j = 0; j < width; j++) {
            switch (viewMap[i][j]) {
                case 1:
                    drawCloseCell(contex, [j * 32 + 2, i * 32 + 2]);
                    //state rendered
                    ++viewMap[i][j];
                    break;
                case 3:
                    fillCellIMG(contex, images[board[i][j]], [i, j]);
                    //state rendered
                    ++viewMap[i][j];
                    ++amountOfOpenedCells;
                    break;
                case 5:
                    fillCellIMG(contex, images[10], [i, j]);
                    //state rendered
                    ++viewMap[i][j];
                    break;
            }
        }
    }
    return amountOfOpenedCells;
}


export const fullOpen = ({ viewMap, height, width }) => {
    //open cells
    for (let i = 0; i < height; ++i) {
        for (let j = 0; j < width; ++j) {
            viewMap[i][j] = 3;
        }
    }
}
