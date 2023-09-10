let flexbox = document.querySelector(".ongoings .anime-flex");

flexbox.ondragstart = () => false;

flexbox.onpointerdown = function(event) {
  event.preventDefault();
  flexbox.setPointerCapture(event.pointerId);
  flexbox.style.transition = "";
  let startPoint = event.clientX;
  let leftBound = flexbox.offsetLeft;
  let rightBound = document.documentElement.clientWidth - leftBound - 36;
  let flexboxLength = flexbox.scrollWidth;
  let offset;
  if(flexboxLength < rightBound) return;
  console.log("flexboxLength: " + flexboxLength);
  console.log("rightBound: " + rightBound);

  flexbox.onpointermove = function(event) {
    offset = event.clientX - startPoint;
    flexbox.style.transform = `translateX(${offset}px)`;
  }

  flexbox.onpointerleave = function(event) {
    event.preventDefault();
    flexbox.onpointermove = null;
    flexbox.onpointerleave = null;
    console.log(offset);
    flexbox.style.transition = "transform .3s";
    let coords = flexbox.getBoundingClientRect();
    if(coords.left > leftBound) {
      flexbox.style.transform = `translateX(0px)`;
    } else if(flexboxLength + offset < rightBound) {
      flexbox.style.transform = `translateX(-${flexboxLength-rightBound}px)`;
    }
    
  }
}