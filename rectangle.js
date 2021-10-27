let RECTANGLE = {
  area() {
    return this.width * this.height;
  },
  perimeter() {
    return 2 * (this.width + this.height);
  },
};

function Rectangle(width, height) {
  this.width = width;
  this.height = height;
  Object.setPrototypeOf(this, RECTANGLE);
}

let rect1 = new Rectangle(2, 3);
console.log(rect1.area());
console.log(rect1.perimeter());