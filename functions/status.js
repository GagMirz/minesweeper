export const setStatus = (gameMedia, status) => {
    gameMedia.statusBar.innerHTML = status;
}

export const setFlags = (gameMedia, flag) => {
    gameMedia.flagsBar.innerHTML = flag;
}

export const setTimer = (gameObj, gameMedia) => {
    gameMedia.timerBar.innerHTML = gameObj.timer;
}

const random = (number) => Math.floor(Math.random() * number);
export const giveCheers = (gameMedia) => {
    return gameMedia.cheers[random(gameMedia.cheers.length)];
}
