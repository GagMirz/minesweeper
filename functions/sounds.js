//loading sound files
//0 on start
//1 on click
//2 & 3 on loose
//4 on win
export const loadSounds = () => {
    return [new Audio("./sounds/sharingan.mp3"), new Audio("./sounds/nya.mp3")
        , new Audio("./sounds/megu.mp3"), new Audio("./sounds/boom.mp3")
        , new Audio("./sounds/congrats.mp3")];
}

//stoping all sounds and puting on start
export const stopPreviousSound = (gameMedia) => {
    for (let i = 0; i < gameMedia.sounds.length; ++i) {
        gameMedia.sounds[i].pause();
        gameMedia.sounds[i].currentTime = 0;
    }
}