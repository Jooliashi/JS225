/* eslint-disable max-lines-per-function */
function createProduct(id, name, stock, price) {
  return {
    id,
    name,
    stock,
    price,
    describe() {
      console.log("Name: " + this.name);
      console.log("ID: " + this.id);
      console.log("Price: " + this.price);
      console.log("Stock: " + this.stock);
    },
    setPrice(newPrice) {
      if (newPrice < 0) {
        console.log("the price is invalid");
      } else {
        this.price = newPrice;
      }
    },
  };
}

let scissors = createProduct(0, 'Scissors', 10, 8);
let drill = createProduct(1, 'Cordless Drill', 15, 45);
let saw = createProduct(2, 'Circular Saw', 12, 95);
let hammer = createProduct(3, 'Sledge Hammer', 78, 45);
let boxCutter = createProduct(4, 'Box Cutter', 41, 15);

scissors.describe()