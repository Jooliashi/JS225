
(["Boolean", "String", "Number"]).forEach(function(method) {
  Object.prototype["is" + method] = function(obj) {
    return toString.call(obj) === '[object ' + method + ']';
  };
});

console.log(isBoolean(false), isBoolean(new Boolean(false)) , !isBoolean(1))

