"use strict";

function fillRange(from, to, newColor, slider) {
  const mainColor = "rgb(207, 208, 209)";
  let rangeDistance = to.max - to.min;
  let fromPosition = from.value - from.min;
  let toPosition = to.value - to.min;
  slider.style.background = `linear-gradient(
    to right,
    ${mainColor} 0%,
    ${mainColor} ${fromPosition / rangeDistance * 100}%,
    ${newColor} ${fromPosition / rangeDistance * 100}%,
    ${newColor} ${toPosition / rangeDistance * 100}%,
    ${mainColor} ${toPosition / rangeDistance * 100}%,
    ${mainColor} 100%
  )`;
}

function printInput(slider, input) {
  let rangeDistance = rightThumb.max - rightThumb.min;
  input.textContent = "Год " + slider.value;
  input.style.left = ((slider.value - slider.min) * 100 / rangeDistance) * 80 / 100 + "%";
}

function updateView(twoSideSlider) {
  fillRange(leftThumb, rightThumb, "rgb(255, 92, 87)", leftThumb);
  printInput(twoSideSlider, twoSideSlider.inputField);
}

let rangeInputs = document.querySelectorAll(".range-value-input");
rangeInputs[0].style.zIndex = "105"; //neccessary to show left thumb above right thumb
let leftThumb = document.getElementById("left-slider");
leftThumb.inputField = rangeInputs[0];
let rightThumb = document.getElementById("right-slider");
rightThumb.inputField = rangeInputs[1];

updateView(rightThumb);
updateView(leftThumb);

leftThumb.oninput = function(event) {
  if(this.value >= rightThumb.value) {
    this.value = rightThumb.value;
  }
  updateView(this);
}

rightThumb.oninput = function(event) {
  if(this.value <= leftThumb.value) {
    this.value = leftThumb.value;
  }
  updateView(this);
}








