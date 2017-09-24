
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext("2D");


function drawPoint({x,y,dist}){
  var color = expScale(dist);
  ctx.fillStyle=`rgb(${color},${color},160)`;
  ctx.fillRect(x,y,1,1);
}
var points = [];
function addPoint(x,y,dist){
  var point = {x:x,y:y,dist:dist};
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

const scaleFactorThingy = 100; //naming is hard
function expScale(dist){
  return 255-255*Math.exp(-dist/scaleFactorThingy);
}
