let Item = (function() {
  function generateSku(name, category) {
    let sku = ''
    let firstPart = name.split(' ');
    if (firstPart[0].length < 3) {
      sku = firstPart[0] + firstPart[1].slice(0, (3 - firstPart.length));
    } else {
      sku = firstPart[0].slice(0, 3);
    }
    sku += category.slice(0, 2)
    return sku;
  }

  function validateName(name) {
    return name.replace(/ /g, '').length >= 5;
  }

  function validateCategory(category) {
    return !category.match(/ /) && category.length >= 5;
  }

  function validateQuantity(quantity) {
    return typeof quantity === 'number' && quantity >= 0 && Number.isInteger(quantity);
  }

  return {
    init(name, category, quantity) {
      if (!(validateQuantity(quantity) && validateName(name) &&
          validateCategory(category))) {
            return {notValid: true}
          } else {
            this.sku = generateSku(name, category);
            this.name = name;
            this.category = category;
            this.quantity = quantity;
            return this;
          }
    }
  }
})();

class ItemManager {
  static items = [];

  static create(name, category, quantity) {
    let item = Object.create(Item).init(name, category, quantity)
    if (item.notValid) {
      return false;
    } else {
      ItemManager.items.push(item);
    }
  }

  static update() {}
}

console.log(ItemManager.create('basket ball', 'sports', 0));           // valid item
console.log(ItemManager.create('asd', 'sports', 0));
console.log(ItemManager.create('soccer ball', 'sports', 5));           // valid item
console.log(ItemManager.create('football', 'sports'));
console.log(ItemManager.create('football', 'sports', 3));              // valid item
console.log(ItemManager.create('kitchen pot', 'cooking items', 0));
console.log(ItemManager.create('kitchen pot', 'cooking', 3));          // valid item

console.log(ItemManager.items);