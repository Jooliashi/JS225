// name property added to make objects easier to identify
// Object.prototype.ancestors = function () {
//   let family = [];
//   let obj = this;
//   while (obj.__proto__) {
//     if (obj.__proto__.name) {
//       family.push(obj.__proto__.name)
//     } else if (obj.__proto__ === Object.prototype) {
//       family.push("Object.prototype")
//     }
//     obj = obj.__proto__
//   }
//   return family;
// }

Object.prototype.ancestors = function() {
  let ancestor = Object.getPrototypeOf(this);

  if (Object.prototype.hasOwnProperty.call(ancestor, 'name')) {
    return [ancestor.name].concat(ancestor.ancestors())
  }

  return ['Object.prototype']
};

const foo = {name: 'foo'};
const bar = Object.create(foo);
bar.name = 'bar';
const baz = Object.create(bar);
baz.name = 'baz';
const qux = Object.create(baz);
qux.name = 'qux';

console.log(qux.ancestors());  // returns ['baz', 'bar', 'foo', 'Object.prototype']
console.log(baz.ancestors());  // returns ['bar', 'foo', 'Object.prototype']
console.log(bar.ancestors());  // returns ['foo', 'Object.prototype']
console.log(foo.ancestors());  // returns ['Object.prototype']