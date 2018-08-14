// So what needs to be done is the color toggle, opacity slider, and eraser. Though I think eraser will have to be a toggle as well.

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
  })});
}
// Takes box id and uses it to identify and isolate the mouseovered box. I decided to make the background color consistent and ingrained instead of changing with every mouseover. So if it has not been mouseovered the background is white and we change it using getRandomRGBA function. Otherwise we take the current RGBA value and parse it to get the attribute values. We get an array from the string and typecast into a number. The only real change is increasing the opacity amount by the give opacity interval; so we're making it darker each time.
function changeColor(boxId) {
  var box = document.getElementById(boxId);
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
}
// Size Event Listener which occurs when the size button is clicked. It calls resizeCanvas on this event.
function sizeEventListener(){
  const sizeButton = document.getElementById("sizeButton");
  sizeButton.addEventListener("click", (e) => {
    resizeCanvas();
  });
}
// resizeCanvas prompts the user for a new size and checks if it's valid. If so we continue and create a new canvas given the new dimensions. We have to delete the original boxes and recall boxEventListener to make it work properly.
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


// Initializing Relevant Constants and Variables
const canvas = document.querySelector(".canvas");
var canvasDimension = 480;
var boxDimension = 16;

var opacityInterval = .25;

// Starting the program by calling the startup functions.
createCanvas();
createBoxes(boxDimension);

boxEventListener();
sizeEventListener();
clearEventListener();
