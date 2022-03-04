const canvas = document.querySelector("#jsCanvas");
const ctx = canvas.getContext("2d");
const range = document.querySelector(".control_range input");
const control_color = document.querySelectorAll(".controls_color");
const control_btns = document.querySelector(".controls_btns");
const jsMode = document.getElementById("jsMode");
const jsSave = document.getElementById("jsSave");
const jsClear = document.getElementById("jsClear");
const randomColor = document.querySelector(".controls_color:last-child");

const INITIAL_VALUE = "#2c2c2c";
const CANVAS_SIZE = 500;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE);
ctx.strokeStyle = INITIAL_VALUE;
ctx.fillStyle = INITIAL_VALUE;

ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function startPainting(){
  painting = true;
}

function onMouseMove(event){
  const x = event.offsetX;
  const y = event.offsetY;
  if(!painting){
    ctx.beginPath();
    ctx.moveTo(x,y);
  }
  else{
    ctx.lineTo(x,y);
    ctx.stroke();
  }
}

function stopPainting(event){
  painting = false;
}

function handleClick(event){
  if(filling){
    ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE);
  }
}

function handleCM(event){
    event.preventDefault();
}

if(canvas){
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleClick);
  canvas.addEventListener("contextmenu", handleCM)
}

if(range){
  range.addEventListener("mouseup", (event)=>{
    const value = event.target.value;
    ctx.lineWidth = value;
  })
}

jsMode.addEventListener("click", (event)=>{
  if(filling){
    filling = false;
    jsMode.innerText = "fill";
  }
  else{
    filling = true;
    jsMode.innerText = "paint";
  }
});

 

  Array.from(control_color).forEach(color => color.addEventListener("click", event =>{
    const control_color = event.target.style.backgroundColor;
    ctx.strokeStyle = control_color;
    ctx.fillStyle = control_color;
  }));

  if(jsSave){
    jsSave.addEventListener("click", (event) =>{
      const image = canvas.toDataURL();
      const link = document.createElement("a");
      link.href = image;
      link.download = "PaintJS";
      link.click();
    });
  }

  if(jsClear){
    jsClear.addEventListener("click", ()=>{
      ctx.fillStyle = "white";
      ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE);
    })
  }


if(randomColor){
  const colorArray = ["#2c2c2c", "white", "#FF3B30",
    "#ff9500", "#FFCC00", "#4CD963", "#5AC8FA", "#0579FF","#5856D6"];
    randomColor.addEventListener("click" , ()=>{
      const index = Math.floor(Math.random()*colorArray.length);
      const pickcolor = colorArray[index];
      ctx.strokeStyle = pickcolor;
      ctx.fillStyle = pickcolor;
    })
}