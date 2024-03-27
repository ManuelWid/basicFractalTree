// visualization of a basic fractal tree

// setup
const angle_slider = document.querySelector("#angle");

// canvas setup
const canvas = document.querySelector("#canvas");
canvas.width = 1000;
canvas.height = 600;
const ctx = canvas.getContext("2d");

// vars for drawing
let drawing = true;
let angle = 45;
const lengthBy = 0.75;

angle_slider.addEventListener("input", ()=>{
    angle_slider.nextElementSibling.innerHTML = angle_slider.value;
    angle = angle_slider.value;
});

function draw(){
    ctx.reset();
    ctx.strokeStyle = "#ccc";
    ctx.translate(canvas.width/2, canvas.height);

    branch(150);

    if(drawing){
        requestAnimationFrame(draw);
    }
}

requestAnimationFrame(draw);

function branch(len){
    line(0,0,0,-len);
    if(len >= 10){
        ctx.save();
        ctx.translate(0,-len);
        ctx.rotate(angle * Math.PI / 180);
        branch(len * lengthBy);
        ctx.restore();

        ctx.save();
        ctx.translate(0,-len);
        ctx.rotate(-angle * Math.PI / 180);
        branch(len * lengthBy);
        ctx.restore();
    }
}

function line(fromX, fromY, toX, toY){
    ctx.beginPath();
    ctx.moveTo(fromX, fromY);
    ctx.lineTo(toX, toY);
    ctx.stroke();
}