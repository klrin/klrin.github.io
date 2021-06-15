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
class Item {
  constructor(name, description, varname) {
    this.name = name;
    this.description = description;
    this.varname = varname;
    things[this.name] = varname;
  }
  read() {
    describe(this.description);
  }
}

class Room {
  constructor(name, description, objects) {
    this.name = name;
    this.description = description;
    this.objects = objects;
  }
}

const things = {
  "":""
};

//Rooms---
var currentroom = "entryway";
let entryway = new Room("The Entryway", "You are in a drab, cell like room with no doors. There is a window on the east wall and a plaque on the west wall.", ["plaque", "window", "wall", "floor", "bug", "myself"]);


//Things--
let plaque = new Item("plaque", "The plaque reads: I'm too lazy to make a good adventure.", "plaque");
let thewindow = new Item("window", "You peer out the window, finding a strange stream of 1's and 0's. You think you can make out the word error.", "thewindow");
let thewall = new Item("wall", "The wall is boring.", "thewall");
let thefloor = new Item("floor", "The floor is boring, apart from a bug crawling across it.", "thefloor");
let thebug = new Item("bug", "The bug is green, but you also notice 1's and 0's flowing out of it's shell.", "thebug");
let theself = new Item("myself", "You are a bug.", "theself");
console.log(eval(currentroom).name);
function look(arg) {
  console.log(eval(currentroom).name);
  if (arg == "") {
    describe(eval(currentroom).name);
    describe(eval(currentroom).description);
  } else {
    if (eval(currentroom).objects.includes(arg)) {
      describe(eval(things[arg]).description);
    } else {
      describe("You see no "+arg+" of interest.");
    }
  }
}

function respond() {
  if (inputval == "") {
    describe("Time passes...");
  } else if(inputval.includes("look")) {
    var item = inputval.replace("look", "").replace(" at ", "");
    look(item);
  }
}

// TODO: 
