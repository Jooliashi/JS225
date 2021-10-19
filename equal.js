function objectsEqual(obj1, obj2) {
  if (Object.keys(obj1).length !== Object.keys(obj2).length) {
    return false;
  }

  for (let i = 0; i < Object.keys(obj1).length; i += 1) {
    let key = Object.keys(obj1)[i];
    if (!Object.keys(obj2).includes(key)) return false;
    let firstValue = obj1[key];
    let secondValue = obj2[key];
    if (typeof firstValue !== 'object' && firstValue !== secondValue) {
      return false;
    } else if ( firstValue === 'object' && !objectsEqual(firstValue, secondValue)) {
      return false;
    }
  }
  return true;
}

console.log(objectsEqual({a: {a: 'foo'}}, {a: {a: 'foo'}}));                      // true
console.log(objectsEqual({a: 'foo', b: 'bar'}, {a: 'foo'}));            // false
console.log(objectsEqual({}, {}));                                      // true
console.log(objectsEqual({a: 'foo', b: undefined}, {a: 'foo', c: 1}));  // false