import calculatePixelDistances from './calculatePixelDistances.js';
import Complex from './Complex.js';

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext("2d");

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function drawPoint({x,y,distance}){
  var color = Math.floor(expScale(distance));
  ctx.fillStyle = rgbToHex(color, color, 160);
  ctx.strokeStyle = rgbToHex(color, color, 160);
  ctx.fillRect(x,y,2,2);
}
var points = [];
function addPoint(point){
  points.push(point);
  drawPoint(point);
}
function redrawAllPoints(){
  for (var i = 0; i < points.length; i++) {
    drawPoint(points[i]);
  }
}
class Scale {

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
    var domainDist = d2-d1;
    var alpha = (d-d1)/dist;
    var rangeDist = r2-r1;
    return rangeDist*a+r1;
  }
}

const maxIterations = 10;
function expScale(dist){
  return 255-255*Math.exp(-dist/maxIterations);
}

calculatePixelDistances({
  width: 1000, height: 800, initialValue: new Complex(0, 0), threshold: 1000,
  maxIterations, onPixelResult: addPoint,
});
