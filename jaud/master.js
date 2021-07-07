
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
