var frameDimension = 480;
var numBoxPerLine = 16;

const container = document.querySelector(".container");
container.style.height = frameDimension + "px";
container.style.width = frameDimension + "px";

function setupPlot(){
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

  // const boxes = document.querySelectorAll(".plot");
  // boxes.forEach(box => box.addEventListener("mouseover", (e) => {
  //   box.style.backgroundColor = getRandomRGB();
  // })
}

function getRandomRGB(){
  var redColor = Math.floor(256*Math.random());
  var greenColor = Math.floor(256*Math.random());
  var blueColor = Math.floor(256*Math.random());
  return "rgb(" + redColor + ", " + greenColor + ", " + blueColor + ")";
}

setupPlot();

const reset = document.getElementById("reset");
const color = document.getElementById("color");
const size = document.getElementById("size");

function cleanSlate(){
  const boxes = document.querySelectorAll(".plot");
  boxes.forEach(box => box.style.backgroundColor = "white");
}
function resizePlot(){
  cleanSlate();
  var validSize = false;
  while(validSize === false){
    var number = prompt("How many boxes per line? Enter a number between 1-100.")
    if (number > 0 && number < 101){
      validSize = true;
      numBoxPerLine = number;
    }
  }
}
reset.addEventListener("click", cleanSlate);

// container.style.backgroundColor = "pink";

// var frameDimension = 600;
// var rowNum = 16;
// var boxDimension = frameLength/rowNum;
//
// const container = document.getElementById("container");
// // container.style.height = frameDimension + "px";
// // container.style.width = frameDimension + "px";
//
//
// var i = 0;
// while(i < rowNum){
//   const box = document.createElement("div");
//   box.classList.add("box");
//   box.style.height = ((frameDimension-32)/rowNum) + "px";
//   box.style.width = ((frameDimension-32)/rowNum) + "px";
//   container.appendChild(box);
//   i++;
// }
//
// console.log(container.childElementCount);
//
// box.addEventListener("mouseover", event => {
//   box.style.backgroundColor = getRandomRGB();
// })
//

//
// // var box = document.createElement("div");
// // box.setAttribute("style", "height: 50px; width: 50px; background-color: pink");
// //
// // container.appendChild(box);
//
// // const colorbox = document.body.querySelector("#colorbox");
// // colorbox.setAttribute("style", "height: 300px; width: 300px; background-color: yellow");
// // colorbox.addEventListener("mouseover", (e) => {
// //   colorbox.style.backgroundColor = getRandomRGB();
// // })
// // function getRandomRGB(){
// //   var redColor =  Math.floor(256*Math.random());
// //   var greenColor =  Math.floor(256*Math.random());
// //   var blueColor =  Math.floor(256*Math.random());
// //   return "rgb(" + redColor + ", " + greenColor + ", " + blueColor + ")";
// // }
