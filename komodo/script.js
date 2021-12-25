var zlist = []

// Loading overlay
window.addEventListener("load", function() { 
    let lover = document.getElementById("loading-overlay")
    lover.style.animation = "fadeout 1s ease"
    lover.style.pointerEvents = "none"
    setTimeout(function() {lover.style.display = "none"}, 1000)
    checkoverlap()
})

//make main element draggable
Array.from(document.getElementsByClassName("window")).forEach((elem)=>{
    dragElem(elem)
    zlist.push(elem.id)
    elem.addEventListener("mousedown", (e)=>{
        e.stopPropagation()
        windid = e.target.closest("main").id
        zlist.splice(zlist.indexOf(windid), 1)
        zlist.push(windid)
        updateZindex()
    })
})


//WINDOW X - call close function on window x click or on task bar image
Array.from(document.querySelectorAll("header i, aside img")).forEach((elem)=>{
    elem.addEventListener("mousedown", (e)=>{
        e.stopPropagation()
        toggleWindow(e, elem)
    })
})


//Show taskbar when mouse is at bottom of screen
var bheight = parseInt(getStyle("body", "height", true), 10)
window.addEventListener("resize", ()=>{
    bheight = parseInt(getStyle("body", "height", true), 10)
})

window.addEventListener("mousemove", function(e) {
    if (e.clientY > (bheight-15)) {
        document.getElementsByTagName("aside")[0].classList.remove("overlapped")
    } else if (!document.getElementById("aside-div").matches(":hover")) {
        checkoverlap()
    }
})

//Make element draggable
function dragElem(elem) {
    let ix, iy, nx, ny, ax, ay
    if(elem.querySelector(":scope > header")) { // if header element directly inside, drag from that
        header = elem.querySelector(":scope > header")
    } else {
        elem.style.border = "2px solid red"
    }
    header.addEventListener("mousedown", function(e) {
        // change zlist
        ix = e.clientX, iy = e.clientY
        document.addEventListener("mousemove", drag)
        document.addEventListener("mouseup", remove)
    })
    function remove() {
        document.removeEventListener("mousemove", drag)
        document.removeEventListener("mouseup", remove)
    }
    function drag(e) {
        nx = e.clientX, ny = e.clientY
        ax = parseInt(getStyle(elem, "left"), 10)
        ay = parseInt(getStyle(elem, "top"), 10)
        elem.style.left = (ax+nx-ix)+"px"
        elem.style.top = (ay+ny-iy)+"px"
        ix = nx, iy = ny
        checkoverlap()
    }
}
//utility function to get computed style of an element
function getStyle(elem, prop, select=false) {
    if (select) {
        elem = document.querySelector(elem)
    }
    style = window.getComputedStyle(elem)
    return style.getPropertyValue(prop);
}

//checks if any element with window class is overlapping the task bar; if so , hide the task bar by adding 'overlapped'
function checkoverlap() {
    let rect1 = document.getElementById("aside-div").getBoundingClientRect()
    let collapse = false
    Array.from(document.getElementsByClassName("window")).forEach((element) => {
        rect2 = element.getBoundingClientRect()
        let overlap = !(rect1.right < rect2.left || 
            rect1.left > rect2.right || 
            rect1.bottom < rect2.top || 
            rect1.top > rect2.bottom)
        if (overlap && !element.matches(".minimized")) {
            document.getElementsByTagName("aside")[0].classList.add("overlapped")
            collapse = true
        }
    });
    if (!collapse) {
        document.getElementsByTagName("aside")[0].classList.remove("overlapped")
    }
}

//ToggleWindow event, window id
function toggleWindow(e, elem) { //scheme is #game for window, #game-task-icon for taskbar icon
    e.stopPropagation()
    let useid = elem.id
    if (elem.tagName.toLowerCase() == "i") {
        useid = elem.closest("main").id
        windowElem = document.getElementById(useid)  // toggle window minimization if 
        taskbarElem = document.getElementById(useid+"-task-icon")
        windowElem.classList.toggle("minimized")
        taskbarElem.classList.toggle("minimized-tb")
        checkoverlap()
    } else if (document.getElementById(elem.id.slice(0, -10)).matches(".minimized")) { //must be task bar icon, if minimized
        useid = useid.slice(0, -10)
        windowElem = document.getElementById(useid)
        taskbarElem = document.getElementById(useid+"-task-icon")
        windowElem.classList.toggle("minimized")
        taskbarElem.classList.toggle("minimized-tb")
        zlist.splice(zlist.indexOf(useid), 1)
        zlist.push(useid)
        updateZindex()
        checkoverlap()
    } else { // window is open
        useid = useid.slice(0, -10)
        zlist.splice(zlist.indexOf(useid), 1)
        zlist.push(useid)
        updateZindex()
    }
}


function updateZindex() {
    for (let i = (zlist.length-1); i >= 0; i--) {
        document.getElementById(zlist[i]).style.zIndex = 10+i
        document.getElementById(zlist[i]).classList.remove("focused")
        document.getElementById(zlist[i]+"-task-icon").classList.remove("focused-tb")
        if(i==zlist.length-1){
            document.getElementById(zlist[i]+"-task-icon").classList.add("focused-tb")
            document.getElementById(zlist[i]).classList.add("focused")
        }
    }
}