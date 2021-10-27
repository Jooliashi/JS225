function Animal() {
  this.type = "mammal";
}

Animal.prototype.breathe = function() {
  console.log("I'm breathing");
}

function Dog() {}
function Terrier() {}

var mammal = new Animal();

Dog.prototype = new Animal();

var dog = new Dog();

console.log(Object.prototype); // f Object() { [native code] }