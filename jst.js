// Setting up and drawing the dimensions of the canvas.
function createCanvas(){
  canvas.style.height = `${canvasDimension}px`;
  canvas.style.width = `${canvasDimension}px`;
}
//Creating the boxes that will compose the grid structure of the canvas.
function createBoxes(boxDimension){
  var totalBoxes = Math.pow(boxDimension, 2);
  console.log("Hello");
  console.log(totalBoxes);
  for(var index = 0; index < totalBoxes; index++){
    const box = document.createElement("div");
    box.classList.add("box");
    box.id = index.toString();
    box.style.height = (canvasDimension/boxDimension) + "px";
    box.style.width = (canvasDimension/boxDimension) + "px";
    canvas.appendChild(box);
  }
}

//While the first element in the boxes constant exists, remove it from the array.
function deleteBoxes(){
  const boxes = document.getElementsByClassName("box");
  while(boxes[0]){
    boxes[0].parentNode.removeChild(boxes[0]);
  }
}


// const box = document.createElement("div");
// box.style.backgroundColor = "pink";
// box.style.height = canvasDimension+"px";
// box.style.height = canvasDimension+"px";
// canvas.appendChild(box);







// Initializing Relevant Constants and Variables
const canvas = document.querySelector(".canvas");

var canvasDimension = 480;
var boxDimension = 16;


// Calling functions
createCanvas();
createBoxes(boxDimension);
// deleteBoxes();
