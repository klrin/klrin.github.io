
// Random progress bar
var progress = 0;
document.getElementById("pbox").addEventListener("click", (e)=>{
    if (progress < 100) { progress += 10; }
    pbar = document.getElementById("prg");
    pbar.style.width = pbar.children[0].innerHTML = `${progress}%`;
    if (progress >= 100) { pbar.style.backgroundColor = "lightgreen"; }
});




