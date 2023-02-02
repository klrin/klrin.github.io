
bademojis = ["👙", "💩", "🚽", "😂", "💣", "😍", "📉", "😱", "🎎", "🔥", "📧", "〽️", "🌚", "👀", "👹", "👅", "💨", "🤡", "💀", "🌝", "😡", "🦟", "👎"]
badwords = ["YOLO", "Bae", "Cray Cray", "Whatevskies", "Obvi", "Totes", "Deets", "Dat", "Wut", "Ok Boomer", "Got Damn"]
insert = ["👏", "🤯", "🙄"]
sounds = ["siren.wav", "ding.wav", "fart.mp3", "cat.wav", "baby.wav", "scream.ogg", "siren.wav", "joke.wav", "high.wav", "fart2.wav"]
binary = [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, false]
function rchoose(l, n=false) {
    if (!n) {
        return l[Math.floor(Math.random() * l.length)]
    }
    chosen = []
    for (i=0; i<n; i++) {
        chosen.push(l[Math.floor(Math.random() * l.length)])
    }
    return chosen
}
playing = false
clicked = false
PlaySound = function () {
    if (!playing) {
        var audio = new Audio("lull.wav");
        audio.loop = true;
        audio.play();
        playing = true
        
    } else {
        var audio = new Audio(rchoose(sounds));
        audio.loop = false;
        audio.play();
        setTimeout(function() {
            audio.pause();
        }, 15000);
    }
     

}



function popup() {
    confirm(rchoose(badwords))
}
document.addEventListener("click", () => {
    PlaySound()
    clicked = true
})
document.addEventListener('contextmenu', (e) => {
    e.preventDefault()
    popup()
});


tripy = () => {
    Array.from(document.querySelectorAll("*")).forEach((e) => {
        if (rchoose(binary)) {
            return
        }
        if (e.style.backgroundColor == "white") {
            e.style.backgroundColor = "black"
        } else {
            e.style.backgroundColor = "white"
        }
    })
}
document.addEventListener("pointermove", tripy)
window.addEventListener("load", ()=>{
    setInterval(tripy, 100)
})
setInterval(() => {
    document.title = rchoose(bademojis, 2).join("") + rchoose(badwords, 4).join(rchoose(insert))
    
    if (clicked) {
        PlaySound()
    }
}, 1000)