/*function generateRandomColor(){
    let maxVal = 0xFFFFFF; // 16777215
    let randomNumber = Math.random() * maxVal; 
    randomNumber = Math.floor(randomNumber);
    randomNumber = randomNumber.toString(16);
    let randColor = randomNumber.padStart(6, 0);   
    return `#${randColor.toUpperCase()}`
}
var colorChangeInterval = 5 //in seconds
document.getElementsByTagName("html")[0].style.transition = `all ${colorChangeInterval}s linear`;

(function bob() {
    let htmlElem = document.getElementsByTagName("html")[0];
    htmlElem.style.backgroundColor = generateRandomColor();
    setTimeout(bob, colorChangeInterval * 1000);
})()
*/



