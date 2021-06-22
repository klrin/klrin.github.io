
// Variables:

let inputval = "", turns = 0, saveindex = 0, currentroom = "entryway", lastcommand = ["", "", "", "", "", "", "", "", "", ""];



//--------------------------------------------------
//--------------------USER-INTERFACE----------------
//--------------------------------------------------



function txsubmit(e) { //What happens when the input is submitted
  e.preventDefault();
  try {
    let log = document.getElementsByClassName('body')[0],
    txtbox = document.getElementById('txt-entry');
    inputval = txtbox.value;
    entry(inputval);
    respond();
    log.scrollTop = log.scrollHeight;
    txtbox.value = "";
    turns += 1;
    document.getElementById('turns').innerHTML = "Turns: "+turns;
  } catch (e) {
   throw new Error(e.message);
  }
  return false;
}

function entry(text) { // For user input
  document.getElementsByClassName('body')[0].innerHTML += "<p class='entry'>>>>"+text+"</p>";
}
function describe(text) { // For computer-generated text
  document.getElementsByClassName('body')[0].innerHTML += "<p class='description'>"+text+"</p>";
}

// ----History for text box with up and down arrows

function history(e) {
  e = e || window.event;
  if (e.keyCode == '38') { // up arrow
    if (saveindex > 0) { saveindex -= 1; }
    document.getElementById('txt-entry').value = lastcommand[saveindex];
    e.preventDefault();
    e.preventDefault();
  } else if (e.keyCode == '40') { // down arrow
    if (saveindex < 10) { saveindex += 1; }
    if (saveindex == 10) { document.getElementById('txt-entry').value = ""; }
    else { document.getElementById('txt-entry').value = lastcommand[saveindex]; }
    e.preventDefault();
  }
}

//---Make the DIV element draggagle:

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


//--------------------------------------------------
//--------------------STORYLINE---------------------
//--------------------------------------------------


class Item { //---Classes
  constructor(name, description) {
    this.name = name;
    this.description = description;
  }
}

class Room {
  constructor(name, description, objects, x, y) {
    this.name = name;
    this.description = description;
    this.objects = objects;
    this.x = x;
    this.y = y;
    this.features = {room: this.description};
  }
  feature(name, description) {
    if (typeof(name)=="string") {
      this.features[name] = description;
    } else {
      for (let i = 0; i < name.length; i++) {
        this.features[name[i]] = description;
      }
    }
  }
}



// Define Rooms---

//Entryway
let entryway = new Room("The Entryway", "You are in a drab, cell like room with no doors. There is a window on the east wall and a plaque on the west wall.", ["knife"]);
//features
entryway.feature(["plaque", "sign", "westwall", "west", "w"], "The plaque reads: I'm too lazy to make a good adventure.");
entryway.feature(["window", "eastwall", "east", "e"], "You peer out the window, finding a strange stream of 1's and 0's. You think you can make out the word error.");
entryway.feature("wall", "The wall is boring.");
entryway.feature("floor", "The floor is boring, apart from a bug crawling across it.");
entryway.feature(["ground", "floor"] , "The ground is boring, apart from a bug crawling across it.");
entryway.feature("bug", "The bug is green, but you also notice 1's and 0's flowing out of it's shell.");
entryway.feature("shell", "The shell is dull.");
entryway.feature("self", "You are a bug.");
entryway.feature("error", "It hurts your eyes to look at the error.");
entryway.feature(["1", "one", "0", "zero"], "You lose the number in the stream of digits.");
entryway.feature("cell", "AUOAUND!! -- You think you have a spazm.");
//Things--

let knife = new Item("Knife", "A sharp metal blade fixed to a worn handle.");

function look(arg) {
  if (arg == "") {
    describe(eval(currentroom).name+":");
    describe(eval(currentroom).description);
  } else {
    if (arg in eval(currentroom).features) {
      describe(eval(currentroom).features[arg]);
    } else {
      describe("You see no "+arg+" of interest.");
    }
  }
}

var common = ["a", "able", "about", "across", "after", "all", "almost", "also", "am", "among", "an", "and", "any", "are", "as", "at", "be", "because", "been", "but", "by", "can", "cannot", "could", "dear", "did", "do", "does", "either", "else", "ever", "every", "for", "from", "get", "got", "had", "has", "have", "he", "her", "hers", "him", "his", "how", "however", "i", "if", "in", "into", "is", "it", "its", "just", "least", "let", "like", "likely", "may", "me", "might", "most", "must", "my", "neither", "no", "nor", "not", "of", "off", "often", "on", "only", "or", "other", "our", "own", "rather", "said", "say", "says", "she", "should", "since", "so", "some", "than", "that", "the", "their", "them", "then", "there", "these", "they", "this", "tis", "to", "too", "twas", "us", "wants", "was", "we", "were", "what", "when", "where", "which", "while", "who", "whom", "why", "will", "with", "would", "yet", "you", "your", "ain't", "aren't", "can't", "could've", "couldn't", "didn't", "doesn't", "don't", "hasn't", "he'd", "he'll", "he's", "how'd", "how'll", "how's", "i'd", "i'll", "i'm", "i've", "isn't", "it's", "might've", "mightn't", "must've", "mustn't", "shan't", "she'd", "she'll", "she's", "should've", "shouldn't", "that'll", "that's", "there's", "they'd", "they'll", "they're", "they've", "wasn't", "we'd", "we'll", "we're", "weren't", "what'd", "what's", "when'd", "when'll", "when's", "where'd", "where'll", "where's", "who'd", "who'll", "who's", "why'd", "why'll", "why's", "won't", "would've", "wouldn't", "you'd", "you'll", "you're", "you've"];

var lookwords = ["look", "examine", "l"];
function sanitize(txt, list) {
	  var expStr = list.join("|");
	  return txt.replace(new RegExp('\\b(' + expStr + ')\\b', 'gi'), ' ')
                    .replace(/\s{2,}/g, ' ');
}



function respond() {
  //Command History
  lastcommand.push(inputval);
  if (lastcommand.length > 10) { lastcommand.shift(); }
  saveindex = lastcommand.length;

  // Sanitize inputval
  inputval = sanitize(inputval, common);
  console.log(inputval);
  inputval = inputval.toLowerCase().split(" ");
  console.log(inputval);


}

// TODO:
