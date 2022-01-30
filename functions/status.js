//set status
export const setStatus = (gameMedia, status) => {
    gameMedia.statusBar.innerHTML = status;
}

//set flags
export const setFlags = (gameMedia, flag) => {
    gameMedia.flagsBar.innerHTML = flag;
}

//set timer
export const setTimer = (gameObj, gameMedia) => {
    gameMedia.timerBar.innerHTML = gameObj.timer;
}

//cheering content
export const giveCheers = () => {
    let cheerings = ["NICE", "COOL", "HEROIC", "MAGNIFICENT",
                    "WHOLESOME", "GOD MOVE", "GREAT", "JUST DO IT",
                    "TOUGH", "KAWAIIII", "CUTE", "ABSOLUTE"];
    return cheerings[Math.floor(Math.random()*cheerings.length)];
}