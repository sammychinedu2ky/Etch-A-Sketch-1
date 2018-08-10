var frameDimension = 480;
var numBoxPerLine = 16;

const container = document.querySelector(".container");
container.style.height = frameDimension + "px";
container.style.width = frameDimension + "px";

function setupPlot(numBoxPerLine){
  var i = 0;
  for (i; i < Math.pow(numBoxPerLine, 2); i++){
    const box = document.createElement("div");
    box.classList.add("plot");
    box.style.height = (frameDimension/numBoxPerLine) + "px";
    box.style.width = (frameDimension/numBoxPerLine) + "px";
    box.addEventListener("mouseover", (e) => {
      box.style.backgroundColor = getRandomRGB();
    })
    container.appendChild(box);
  }

}

function getRandomRGB(){
  var redColor = Math.floor(256*Math.random());
  var greenColor = Math.floor(256*Math.random());
  var blueColor = Math.floor(256*Math.random());
  return "rgb(" + redColor + ", " + greenColor + ", " + blueColor + ")";
}

setupPlot(numBoxPerLine);

const reset = document.getElementById("reset");
const color = document.getElementById("color");
const size = document.getElementById("size");

function cleanSlate(){
  const boxes = document.querySelectorAll(".plot");
  boxes.forEach(box => box.style.backgroundColor = "white");
}
function resizePlot(){
  var validSize = false;
  while(validSize === false){
    var number = prompt("How many boxes per line? Enter a number between 1-100.")
    if (number > 0 && number < 101){
      validSize = true;
    }else{
      alert("You did not enter a valid number. Try again.");
    }
  }
  deletePlot();
  setupPlot(number);
}
function deletePlot(){
  while(container.firstChild){
    container.removeChild(container.firstChild);
  }
}
reset.addEventListener("click", cleanSlate);
size.addEventListener("click", resizePlot);
