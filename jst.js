// Setting up and drawing the dimensions of the canvas.
function createCanvas(){
  canvas.style.height = `${canvasDimension}px`;
  canvas.style.width = `${canvasDimension}px`;
}
//Creating the boxes that will compose the grid structure of the canvas.
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

// All of the boxes already have a set backgroundColor. The only thing that changes on mouseover is the opacity amount which is determined by the opacity multiplier.
// Does changing opacity to 1 turn it completely black? Answer is no. Which is weird because Simon's worked differently in color mode.


//While the first element in the boxes constant exists, remove it from the array.
// You need this for size changes which is a culmination of clear, delete, and createBoxes with new prompted dimensions.
function deleteBoxes(){
  const boxes = document.getElementsByClassName("box");
  while(boxes[0]){
    boxes[0].parentNode.removeChild(boxes[0]);
  }
}

function getRandomNumber(){
  var randNumber = Math.floor(256*Math.random());
  return randNumber;
}

function getRandomRGBA(){
  var red = getRandomNumber();
  var green = getRandomNumber();
  var blue = getRandomNumber();
  return `rgba(${red}, ${green}, ${blue}, ${opacityInterval})`;
}

function boxEventListener() {
  const boxes = document.querySelectorAll(".box");
  boxes.forEach(box => {
    box.addEventListener("mouseover", (e) => {
      changeColor(box.id);
  })});
}

function changeColor(boxId) {
  var box = document.getElementById(boxId);
  if (box.style.backgroundColor === "white"){
    box.style.backgroundColor = getRandomRGBA();
  }else{
    var rgbaString = box.style.backgroundColor.toString();
    var internalString = rgbaString.slice(rgbaString.indexOf("(") + 1, rgbaString.indexOf(")"));
    console.log(internalString);
    var [red, green, blue, opacity] = internalString.split(", ");
    red = Number(red);
    green = Number(green);
    blue = Number(blue);
    opacity = Number(opacity);
    // Slight problem where opacity has an effect on the outline thickness. It looks uneven because of this. Might even consider getting rid of outline all together or making it a very small value.
    box.style.backgroundColor = `rgba(${red}, ${green}, ${blue}, ${opacity + opacityInterval}`;
  }

}
function sizeEventListener(){
  const sizeButton = document.getElementById("sizeButton");
  sizeButton.addEventListener("click", (e) => {
    var oldBoxDimension = boxDimension;
    var valid = false;
    while(valid === false){
      boxDimension = prompt("Enter a new size. 1-64");
      if(boxDimension > 0 && boxDimension <= 64){
        valid = true;
      }else if(boxDimension === null){
        valid = true;
        boxDimension = oldBoxDimension;
      }else{
        alert("That was not a valid choice. Try again.");
      }
    }
    console.log(boxDimension);
    deleteBoxes();
    createBoxes(Number(boxDimension));
    boxEventListener();
  });
}





// Initializing Relevant Constants and Variables
const canvas = document.querySelector(".canvas");

var canvasDimension = 480;
var boxDimension = 16;

// Should be changed after slider is implemented.
var opacityInterval = .25;


// Calling functions
createCanvas();
createBoxes(boxDimension);
// deleteBoxes();
//This proves that action event listeners can work inside of functions. The problem was that one of the parameters has be to the event, not just the function. Meaning on the event of mousedown the function occurs.
boxEventListener();
sizeEventListener();
