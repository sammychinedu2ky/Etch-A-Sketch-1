// Setting up and drawing the dimensions of the canvas.
function createCanvas(){
  canvas.style.height = `${canvasDimension}px`;
  canvas.style.width = `${canvasDimension}px`;
}

// Creating the boxes that will compose the grid structure of the canvas.
function createBoxes(boxDimension){
  var totalBoxes = Math.pow(boxDimension, 2);
  for(var index = 0; index < totalBoxes; index++){
    const box = document.createElement("div");
    box.classList.add("box");
    box.id = index.toString();
    box.style.height = `${canvasDimension/boxDimension}px`;
    box.style.width = `${canvasDimension/boxDimension}px`;
    box.style.backgroundColor = "white";
    canvas.appendChild(box);
  }
}

// Deletes the boxes that currently make up the canvas. Function will be used in tandem with resizing function.
function deleteBoxes(){
  const boxes = document.getElementsByClassName("box");
  while(boxes[0]){
    boxes[0].parentNode.removeChild(boxes[0]);
  }
}

// Function used to get number between 0 and 255 inclusive for rgba attributes.
function getRandomNumber(){
  var randNumber = Math.floor(256*Math.random());
  return randNumber;
}

// Returns the expression of rgba with integer values for attributes which is generated with getRandomNumber function and current opacity interval.
function getRandomRGBA(){
  var red = getRandomNumber();
  var green = getRandomNumber();
  var blue = getRandomNumber();
  return `rgba(${red}, ${green}, ${blue}, ${opacityInterval})`;
}

// Event Listener for boxes in canvas which occur when there is a mouseover. This calls changeColor function with parameter of box.id.
function boxEventListener() {
  const boxes = document.querySelectorAll(".box");
  boxes.forEach(box => {
    box.addEventListener("mouseover", (e) => {
      changeColor(box.id);
    })
  });
}

// Takes box id and uses it to identify and isolate the mouseovered box. Which the boolean value for the toggle switches of mono and erase, creating
// conditions accordingly. Erase takes priority and if true will reduce background color opacity until white.
// If erase not checked then mono comes into effect. If mono is true, background colors on mouse over will not be a random color but black
// with whatever opacityinterval is current. I used string manipulation to set these values.

function changeColor(boxId) {
  var box = document.getElementById(boxId);
  updateCurrentToggles();
  if(eraseCheck === true){
    if(box.style.backgroundColor === "white"){
      return;
    }else{
      var colorString = box.style.backgroundColor.toString();
      if(colorString.includes("a")){
        var internalString = colorString.slice(colorString.indexOf("(") + 1, colorString.indexOf(")"));
        var [red, green, blue, opacity] = internalString.split(", ");
        red = Number(red);
        green = Number(green);
        blue = Number(blue);
        opacity = Number(opacity);
        box.style.backgroundColor = `rgba(${red}, ${green}, ${blue}, ${opacity - opacityInterval}`;
        var finalString = box.style.backgroundColor.toString();
        var internalString = finalString.slice(finalString.indexOf("(") + 1, finalString.indexOf(")"));
        var [red, green, blue, opacity] = internalString.split(", ");
        if(opacity === "0"){
          box.style.backgroundColor = "white";
        }
      }else{
        var internalString = colorString.slice(colorString.indexOf("(") + 1, colorString.indexOf(")"));
        var [red, green, blue] = internalString.split(", ");
        red = Number(red);
        green = Number(green);
        blue = Number(blue);
        box.style.backgroundColor = `rgba(${red}, ${green}, ${blue}, ${1 - opacityInterval}`;
      }
    }
  }else if(eraseCheck === false){
    if(monoCheck === false){
      if (box.style.backgroundColor === "white"){
        box.style.backgroundColor = getRandomRGBA();
      }else{
        var rgbaString = box.style.backgroundColor.toString();
        var internalString = rgbaString.slice(rgbaString.indexOf("(") + 1, rgbaString.indexOf(")"));
        var [red, green, blue, opacity] = internalString.split(", ");
        red = Number(red);
        green = Number(green);
        blue = Number(blue);
        opacity = Number(opacity);
        box.style.backgroundColor = `rgba(${red}, ${green}, ${blue}, ${opacity + opacityInterval}`;
      }
    }else if(monoCheck === true){
      if (box.style.backgroundColor === "white"){
        box.style.backgroundColor = `rgba(${0}, ${0}, ${0}, ${opacityInterval}`;
      }else{
        var rgbaString = box.style.backgroundColor.toString();
        var internalString = rgbaString.slice(rgbaString.indexOf("(") + 1, rgbaString.indexOf(")"));
        var [red, green, blue, opacity] = internalString.split(", ");
        red = Number(red);
        green = Number(green);
        blue = Number(blue);
        opacity = Number(opacity);
        box.style.backgroundColor = `rgba(${red}, ${green}, ${blue}, ${opacity + opacityInterval}`;
      }
    }
  }

}

// Size Event Listener which occurs when the size button is clicked. It calls resizeCanvas on this event.
function sizeEventListener(){
  const sizeButton = document.getElementById("sizeButton");
  sizeButton.addEventListener("click", (e) => {
    resizeCanvas();
  });
}
// resizeCanvas prompts the user for a new size and checks if it's valid. If so we continue and create a new canvas given the new dimensions.
// We have to delete the original boxes and recall boxEventListener to make it work properly.
function resizeCanvas(){
  var oldBoxDimension = boxDimension;
  var valid = false;
  var changedSize = false;
  while(valid === false){
    boxDimension = prompt("Enter a new size. 1-64");
    if(boxDimension > 0 && boxDimension <= 64){
      valid = true;
      changedSize = true;
    }else if(boxDimension === null){
      valid = true;
      boxDimension = oldBoxDimension;
    }else{
      alert("That was not a valid choice. Try again.");
    }
  }
  if(changedSize === true){
    deleteBoxes();
    createBoxes(Number(boxDimension));
    boxEventListener();
  }
}

// Clear Event Listener occurs on click of the clear button which calls clearCanvas function.
function clearEventListener(){
  const clearButton = document.getElementById("clearButton");
  clearButton.addEventListener("click", (e) => {
    clearCanvas();
  })
}
// clearCanvas does not change any of the sizing. It only styles the background color to the original white color and effectively "clearing" it.
function clearCanvas(){
  const boxes = document.querySelectorAll(".box");
  boxes.forEach(box => {
    box.style.backgroundColor = "white";
  });
}

// Toggle switches on click will update the global variables of eraseCheck and monoCheck according to the checkbox value.
function eraseEventListener(){
  const eraseToggle = document.getElementById("eraseCheck");
  eraseToggle.addEventListener("click", (e) => {
    eraseCheck = eraseToggle.checked;
  });
}
function monoEventListener(){
  const monoToggle = document.getElementById("monoCheck");
  monoToggle.addEventListener("click", (e) => {
    monoCheck = monoToggle.checked;
  });
}

// Function needed mainly because on soft refresh of page, toggles don't update. So we have to forceful call it in the changeColor function.
function updateCurrentToggles(){
  const eraseToggle = document.getElementById("eraseCheck");
  const monoToggle = document.getElementById("monoCheck");
  eraseCheck = eraseToggle.checked;
  monoCheck = monoToggle.checked;
}

// Opacity Event Listener checks the value of the slider and updates the global variable opacityInterval and the label for opacity percentage.
// The event type is "input" because we want to show the progression of percentage.
function opacityEventListener(){
  const opacity = document.querySelector(".opacityTrack");
  const opacityLabel = document.getElementById("opacityPercentage");
  opacity.addEventListener("input", (e) => {
    opacityLabel.innerHTML = `${opacity.value}%`;
    opacityInterval = (opacity.value)/100;
  })
}

// Similar to updateCurrentToggles function, on soft refresh the label values don't update so we have to forcefully update it with this function.
function updateOpacityPercentage(){
  const opacity = document.querySelector(".opacityTrack");
  const opacityLabel = document.getElementById("opacityPercentage");
  opacityLabel.innerHTML = `${opacity.value}%`;
  opacityInterval = (opacity.value)/100;
}

// Initializing Relevant Constants and Variables
const canvas = document.querySelector(".canvas");
var canvasDimension = 480;
var boxDimension = 16;
var opacityInterval;
var eraseCheck;
var monoCheck;

// Starting the program by calling the startup functions.
createCanvas();
createBoxes(boxDimension);
// Calling all the event listeners.
boxEventListener();
sizeEventListener();
clearEventListener();
eraseEventListener();
monoEventListener();
opacityEventListener();
// Update functions to prevent errors on soft refresh.
updateCurrentToggles();
updateOpacityPercentage();
