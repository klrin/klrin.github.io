






function showtocopy(e) {

}

Array.from(document.getElementsByClassName("clicktocopy")).forEach((e)=>{
    e.addEventListener("click", (p)=>{
        navigator.clipboard.writeText(p.target.innerText);
    })
    e.addEventListener("mouseover", showtocopy)
})
document.getElementById("catsleeping").addEventListener("click", (e) => {
    e.target.style.display = "none";
})