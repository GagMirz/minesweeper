//status bar
export function alertStatus(statusBar, status) {
    statusBar.innerHTML = status;
}

//filling cell image
//call like fillCellIMG(cont, graPhic[numb],position)
export function fillCellIMG(contex, img, position) {
    contex.drawImage(img, position[1] * 32 + 2, position[0] * 32 + 2);
}

//Draws closed cell, position in pixel
export function drawCloseCell(contex, position) {
    contex.fillStyle = "gray";
    contex.fillRect(position[0], position[1], 30, 30);
}

//load images and return object
export function loadImages() {
    //loading images
    //0cell
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
export function loadCanvas(canvas, contex, width, height) {
    //preventing right click menu
    canvas.oncontextmenu = (e) => { e.preventDefault(); };

    //seting size of canvas
    canvas.width = width * 32 + 2;
    canvas.height = height * 32 + 2;

    //filling background
    contex.fillStyle = "#565656";
    contex.fillRect(0, 0, width * 32 + 2, height * 32 + 2);

    //filling canvas with gray cells
    //cont.fillStyle = "gray";
    for (let i = 2; i < width * 32; i += 32) {
        for (let j = 2; j < height * 32; j += 32) {
            //cont.fillRect(i, j, 30, 30);
            drawCloseCell(contex, [i, j]);
        }
    }
}

//rendering according to viewMap
export function renderViewMap(contex, graPhic, viewMap, board) {
    let amountOfOpenedCells = 0;
    for (let i = 0; i < viewMap.length; ++i) {
        for (let j = 0; j < viewMap[0].length; j++) {

            switch (viewMap[i][j]) {
                //opening cell
                case 1:
                    drawCloseCell(contex, [j * 32 + 2, i * 32 + 2]);
                    //to state it rendered
                    ++viewMap[i][j];
                    break;
                case 3:
                    fillCellIMG(contex, graPhic[board[i][j]], [i, j]);
                    //to state it rendered
                    ++viewMap[i][j];
                    ++amountOfOpenedCells;
                    break;
                case 5:
                    fillCellIMG(contex, graPhic[10], [i, j]);
                    //to state it rendered
                    ++viewMap[i][j];
                    break;
            }
        }
    }
    return amountOfOpenedCells;
}

//opening full map
export function rendFullOpen(contex, graPhic, viewMap, board) {
    for (let i = 0; i < viewMap.length; ++i) {
        for (let j = 0; j < viewMap[0].length; ++j) {
            viewMap[i][j] = 3;
        }
    }
    renderViewMap(contex, graPhic, viewMap, board);
}