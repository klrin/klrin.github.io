function generateRandomColor(){
    let maxVal = 0xFFFFFF; // 16777215
    let randomNumber = Math.random() * maxVal; 
    randomNumber = Math.floor(randomNumber);
    randomNumber = randomNumber.toString(16);
    let randColor = randomNumber.padStart(6, 0);   
    return `#${randColor.toUpperCase()}`
}
var colorChangeInterval = 6 //in seconds
document.getElementsByTagName("html")[0].style.transition = `all ${colorChangeInterval}s linear`;

(function bob() {
    let htmlElem = document.getElementsByTagName("html")[0];
    htmlElem.style.backgroundColor = generateRandomColor();
    setTimeout(bob, colorChangeInterval * 1000);
})()


class Tone {
    constructor (freq) {
        this.freq = freq
        this.context = new AudioContext()
        this.o = this.context.createOscillator()
        this.g = this.context.createGain()
        this.o.frequency.value = freq
        this.o.type = freq
    }

    start(freq){
        this.o.connect(this.g)
        this.g.connect(this.context.destination)
        this.o.start(0)
    }
    beep(dur) {
        this.start()
        setTimeout(()=>{this.stop()}, dur)
    }
    stop() {
        this.g.gain.exponentialRampToValueAtTime(
            0.00001, this.context.currentTime + 0.04
        )
    }
}

bob = new Tone(1000);
window.addEventListener("click", ()=>{
    bob.beep(500);
})



