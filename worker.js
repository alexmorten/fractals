class Complex{
  constructor(r=0,i=0){
    this.r=r;
    this.i=i;
  }
  add(c){
    var _c = new Complex(this.r+c.r,this.i+c.i);
    return _c;
  }
  mul(c){
    var _c = new Complex(this.r*c.r-this.i*c.i,this.r*c.i+this.i*c.r);
    return _c;
  }
  equals(c){
    return (this.r === c.r && this.i === c.i);
  }
  length() {
    return Math.sqrt(this.r * this.r + this.i + this.i);
  }
  toString() {
    return `(${this.r} + ${this.i}i)`;
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
    var domainDist = this.d2-this.d1;
    var alpha = (d-this.d1)/domainDist;
    var rangeDist = this.r2-this.r1;
    return rangeDist*alpha+this.r1;
  }
}

const global = this;

global.onmessage = function onMessageReceived(message) {
  const { data: { x, y, initialValue, threshold, maxIterations } } = message;
  const distance = distanceFromMandelbrotSet(x, y, new Complex(initialValue.r, initialValue.i), threshold, maxIterations);
  global.postMessage({ x, y, distance });
}

function distanceFromMandelbrotSet(x, y, initialValue, threshold, maxIterations) {
  let zPrevious = initialValue;
  let scale = new Scale()
    .domain(1000,0)
    .range(0,4);
  const c = new Complex(scale.exec(x), scale.exec(y));
  let i;
  for (i = 0; i < maxIterations; i++) {
    const zCurrent = zPrevious.mul(zPrevious).add(c);
    // console.log(`(${x}, ${y}) iteration ${i}: zCurrent = ${zCurrent.toString()}`);
    zPrevious = zCurrent;
    if (zCurrent.length() > threshold) break;
  }
  return i;
}
