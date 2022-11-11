


const jsConfetti = new JSConfetti()

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
}

window.addEventListener("load", (e) => {
    document.getElementById("tardy").value = ""
    document.getElementById("safe").value = ""
    resetWheel()
})

let tardy = 4
let safe = 1
let spun = false

document.getElementById("tardy").addEventListener("keyup", (e) => {
    tardy = +e.target.value
    resetWheel()
})
document.getElementById("safe").addEventListener("keyup", (e) => {
    safe = +e.target.value
    resetWheel()
})

document.getElementById("start").addEventListener("click", (e) => {
    if (spun) {
        resetWheel()
    }
    theWheel.startAnimation();
})
document.getElementById("reset").addEventListener("click", (e) => {
    resetWheel()
})

function resetWheel() {
    let slicearray = []
    for (let i = 0; i<tardy; i++) {
        slicearray.push({'fillStyle' : 'pink', 'text' : 'Tardy'})
    }
    for (let i=0; i<safe; i++) {
        slicearray.push({'fillStyle' : 'skyblue', 'text' : 'No Tardy'})
    }
    shuffle(slicearray)
    console.log(slicearray)
    console.log(safe, tardy)
    theWheel = new Winwheel({
        'canvasId': 'canvas',
        'numSegments'  : tardy+safe,     // Specify number of segments.
        'outerRadius'  : 305,   // Set outer radius so wheel fits inside the background.
        'textFontSize' : 35,    // Set font size as desired.
        'segments'     :        // Define segments including colour and text.
        slicearray,
        'animation' :           // Specify the animation to use.
        {
            'type'     : 'spinToStop',
            'duration' : 5,     // Duration in seconds.
            'spins'    : 8,     // Number of complete spins.
            'callbackFinished' : alertPrize
        }
    }, false);
    theWheel.stopAnimation(false);
    theWheel.rotationAngle = 0;
    theWheel.draw();
    spun=false
}
function alertPrize(indicatedSegment) {
    document.getElementById("popup").style.visibility = "visible"
    document.querySelector("#popup h2").innerText = indicatedSegment.text
    s1 = document.getElementById("s1")
    f1 = document.getElementById("f1")
    if (indicatedSegment.text == "No Tardy") {
        s1.currentTime = 0
        s1.play()
        document.getElementById("popup").classList.add("good")
        jsConfetti.addConfetti({
            emojis: ['🌈', '⚡️', '💥', '✨', '💫', '🌸'],
         })
    } else {
        f1.currentTime = 0
        f1.play()
        document.getElementById("popup").classList.remove("good")
    }
    document.getElementById("popup").addEventListener("click", (e) => {
        document.getElementById("popup").style.visibility = "hidden"
        s1.pause()
        f1.pause()
    })
    spun = true
}
