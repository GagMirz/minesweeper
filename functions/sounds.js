export const soundsObj = {
    "start" : new Audio("./sounds/sharingan.mp3"),
    "click" : new Audio("./sounds/nya.mp3"),
    "loose1" : new Audio("./sounds/megu.mp3"), 
    "loose2" : new Audio("./sounds/boom.mp3"),
    "win" : new Audio("./sounds/congrats.mp3")
}

//stoping all sounds and puting on start
export const stopPreviousSound = (gameMedia) => {
    for(const key in gameMedia.sounds){
        gameMedia.sounds[key].pause();
        gameMedia.sounds[key].currentTime = 0;
    }
}