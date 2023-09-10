let selectButtons = document.querySelectorAll("div.selection-item > button.select-button");
for(let button of selectButtons){
  button.isSelectionListCreated = false;
  button.onclick = hookDroplist;
  button.checkedElements = new Set();
}

document.addEventListener("click", function(event) {
  let droplists = document.querySelectorAll(".droplist");
  for(let list of droplists) {
    if(list.parentNode != event.target)
      list.hidden = true;
  }
}, {capture:true});


function hookDroplist(event) {
  event.preventDefault();
  if(!this.isSelectionListCreated)
    this.droplist = createDroplist(this);

  this.droplist.hidden ^= true;
}

function createDroplist(element) {
  element.isSelectionListCreated = true;

  let container = document.createElement("div");
  container.classList.add("droplist");

  let checkboxListOptions = element.dataset.selectOptions;
  if(checkboxListOptions) {
    checkboxListOptions = checkboxListOptions.split(", ");
    for(let option of checkboxListOptions) {
      container.append(createCheckbox(capitalize(option)));
    }
  }

  container.hidden = true;
  element.append(container);
  return container;
}


function createCheckbox(checkboxText) {
  let checkboxLabel = document.createElement("label");
  checkboxLabel.innerHTML = `${checkboxText}<input type="checkbox" name="checkbox" value="checked"><span class="checkmark">`;
  checkboxLabel.classList.add("main-checkbox-container");
  checkboxLabel.classList.add("selection-checkbox");
  checkboxLabel.onclick = clickLabel;
  return checkboxLabel;
}

function clickLabel() {
  if(this.tagName != "LABEL") return;
  
  let checkbox = this.querySelector("input[type=checkbox]");
  checkbox.checked ^= true;
  updateButtonValue(this.closest("button"), this.textContent, checkbox.checked);
}

function updateButtonValue(buttonElement, valuePart, pushFlag) {
  if(buttonElement.tagName != "BUTTON" || !buttonElement.checkedElements) return;

  updateCollectionParams(buttonElement, valuePart, pushFlag);

  const defaultText = buttonElement.dataset.defaultText;
  let newTextContent = "";
  for(let checked of buttonElement.checkedElements) {
    newTextContent += ', ' + checked;
  }
  newTextContent = newTextContent.slice(2);
  
  buttonElement.firstChild.textContent = newTextContent ? newTextContent: defaultText;
}

function updateCollectionParams(button, value, isPushing) {
  if(!button.checkedElements) return;

  if(isPushing) {
    button.checkedElements.add(value);
    button.classList.add("select-button-with-params");
  } else {
    button.checkedElements.delete(value);
    button.classList.remove("select-button-with-params");
  }
}
function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}


