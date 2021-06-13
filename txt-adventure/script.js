var inputval = "";
var turns = 0;

function txsubmit(e) {
  e.preventDefault();
  try {
    var logger = document.getElementsByClassName('body')[0];
    inputval = document.getElementById('txt-entry').value;
    entry(inputval);
    respond();
    logger.scrollTop = logger.scrollHeight;
    document.getElementById('txt-entry').value = "";
    turns += 1;
    document.getElementById('turns').innerHTML = "Turns: "+turns;
  } catch (e) {
   throw new Error(e.message);
  }
  return false;
}

function entry(text) {
  document.getElementsByClassName('body')[0].innerHTML += "<p class='entry'>>>>"+text+"</p>";
}
function describe(text) {
  document.getElementsByClassName('body')[0].innerHTML += "<p class='description'>"+text+"</p>";
}


//Make the DIV element draggagle:
dragElement(document.getElementById("mydiv"));

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    /* if present, the header is where you move the DIV from:*/
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    /* otherwise, move the DIV from anywhere inside the DIV:*/
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

//Storyline-----------------------------------------

function respond() {
  if (inputval == "") {
    describe("Time passes...");
  } else {
    describe(inputval);
  }
}
