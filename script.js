import calculatePixelDistances from './calculatePixelDistances.js';
import Complex from './Complex.js';
var width = 1000,height=1000;
const zoom = 0.3;
const xTranslate=0.2648000000000001;
const yTranslate=0.2469999999999999;
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext("2d");
// canvas.onmousemove = (e)=>{
//   let x = e.clientX;
//   let y = e.clientY;
//
//   var dist = points[x][y];
//   console.log(`dist: ${dist}`);
// }
canvas.onmouseup=(e)=>{
    let x = xScale.exec(e.clientX);
    let y = yScale.exec(height-e.clientY);
    console.log(`pos:{${x},${y}}`);
    console.log(x);
    console.log(y);
}
function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function drawPoint({x,y,distance}){
  var color = expScale(distance);
  if(color === 1){
    const r=0;
    const g=0;
    const b=0;
    ctx.fillStyle = ctx.strokeStyle = `rgb(${r}, ${g}, ${b})`;

  }else{
    const r = Math.floor(color * 60);
    const g = Math.floor(color * 120);
    const b = Math.floor(color * 255);
    ctx.fillStyle = ctx.strokeStyle = `rgb(${r}, ${g}, ${b})`;

  }

  ctx.fillRect(x,y,1,1);
}
var points = new Array(width);
for (var i = 0; i < points.length; i++) {
  points[i]=new Array(height);
}
function addPoint(point){
  points[point.x][point.y]=point.distance;
  drawPoint(point);
}
function redrawAllPoints(){
  for (var x = 0; x < points.length; x++) {
    for (var y = 0; y < points.length; y++) {
      drawPoint({x:x,y:y,distance:points[x][y]});
    }
  }
}
class Scale {
  constructor(scale){
    if(scale){
      this.r1=scale.r1;
      this.r2=scale.r2;
      this.d1=scale.d1;
      this.d2=scale.d2;
    }
  }
  range(r1,r2){
    this.r1=r1;
    this.r2=r2;
    return this;
  }
  domain(d1,d2){
    this.d1=d1;
    this.d2=d2;
    return this;
  }
  exec(d){
    var domainDist = this.d2-this.d1;
    var alpha = (d-this.d1)/domainDist;
    var rangeDist = this.r2-this.r1;
    return rangeDist*alpha+this.r1;
  }
}

const maxIterations = 255;
const factor=3.25;
function expScale(dist){
  return Math.pow(1 - 1*Math.exp(-dist/factor),8);
}

let xScale = new Scale()
.domain(0,width)
.range(-zoom+xTranslate,zoom+xTranslate);
let yScale = new Scale()
.domain(height,0)
.range(-zoom+yTranslate,zoom+yTranslate);
console.log(yScale);
calculatePixelDistances({
  width: width, height: height, initialValue: new Complex(0, 0), threshold: 1000,
  maxIterations, onPixelResult: addPoint,yScale:yScale,xScale:xScale
});
