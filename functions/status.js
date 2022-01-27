//seting status
export const setStatus = (gameMedia, status) => {
    gameMedia.statusBar.innerHTML = status;
}

//seting bomb amount - up flag amount
export const setFlagsBar = (gameMedia, flag) => {
    gameMedia.flagsBar.innerHTML = flag;
}

//seting timer's time
export const setTimer = (gameMedia) => {
    gameMedia.timerBar.innerHTML = gameMedia.timer;
}

//cheering content
export const giveCheers = () => {
    let cheerings = ["NICE", "COOL", "HEROIC", "MAGNIFICENT",
                    "WHOLESOME", "GOD MOVE", "GREAT", "JUST DO IT",
                    "TOUGH", "KAWAIIII"];
    return cheerings[Math.floor(Math.random()*cheerings.length)];
}