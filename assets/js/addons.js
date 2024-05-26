






Array.from(document.getElementsByClassName("clicktocopy")).forEach((e)=>{
    box = document.createElement("div")
    e.addEventListener("mouseover", (ev)=>{
        box.innerText = "Click to copy"
        box.classList.add("copybox")
        e.appendChild(box)
        ev.target.addEventListener("mouseout", (eve)=>{
            box.remove()
        })
    })
    e.addEventListener("click", (p)=>{
        navigator.clipboard.writeText(p.target.childNodes[0].nodeValue);
        box.innerText = "Copied!"
    })
})