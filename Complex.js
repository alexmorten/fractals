export default class Complex{
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
}
