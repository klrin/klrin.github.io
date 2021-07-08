
let lastScrollTop = 0;
function navbar() {
  let scrolldiv = document.getElementsByTagName('nav')[0];
  let st = window.pageYOffset;
  if (st > lastScrollTop){
      scrolldiv.style.top = "-4em";
   } else {
      scrolldiv.style.top = ".5em";
   }
  lastScrollTop = st;
}

function togglenightmode() {
  document.getElementsByTagName('html')[0].classList.toggle("nightmode");
  document.getElementsByTagName('nav')[0].classList.toggle("nightshadow");
  document.getElementsByTagName('table')[0].classList.toggle("nighttext");
  document.getElementsByClassName('textarea')[0].classList.toggle("nighttext");
}
