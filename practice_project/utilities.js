/*
findWhere, return the first object with properties that match the supplied object. If no objects match all the supplied properties, undefined is returned.
where, return an array of all objects with properties that match the supplied object.
pluck, return an array of the values that match the supplied key from a collection of objects.
keys, return an array of the keys from an object.
values, return an array of the values from an object.
extend, takes two or more objects, taking the properties and values from the last argument and adding them to the argument
 before it. Object extensions occur recursively from last argument to first. The first argument ends up being modified 
 to include all properties and values from the other objects passed in.
pick, return a new object with the passed in properties taken from the old object. Accepts one or more arguments.
omit, return a new object with any passed in properties omitted.
has, return true when the property passed in exists, false if it doesn't.
*/
(function() {
  let _ = function(element) {
    u = {
      last: function() {
        return element[element.length - 1];
      },
      first: function() {
        return element[0];
      },
      without: function() {
        let new_arr = [];
        let args = Array.prototype.slice.call(arguments);

        element.forEach(function(el) {
          if (args.indexOf(el) === -1) {
            new_arr.push(el);
          }
        });
        return new_arr;
      },
      lastIndexOf: function(search) {
        let idx = -1;
        for (let i = element.length - 1; i >= 0; i -= 1) {
          if (element[i] === search) {
            idx = i;
            break;
          }
        }
        return idx;
      },
      sample: function(qty) {
        let sampled = [];
        let copy = element.slice();
        get = function() {
          let idx = Math.floor(Math.random(0, 1) * copy.length);
          let el = copy[idx];
          copy.splice(idx, 1);
          return el;
        };
        if (!qty) { return get(); }
        while (qty) {
          sampled.push(get());
          qty -= 1;
        }
        return sampled;
      },
      findWhere: function(obj) {
        for (let i = 0; i < element.length; i += 1) {
          if (Object.keys(obj).every(key => obj[key] === element[i][key])) {
            return element[i];
          }
        }
        return undefined;
      },
      where: function(obj) {
        let all = [];
        for (let i = 0; i < element.length; i += 1) {
          if (Object.keys(obj).every(key => obj[key] === element[i][key])) {
            all.push(element[i]);
          }
        }
        return all;
      },
      pluck: function(key) {
        let values = [];
        element.forEach(el => {
          if (el.hasOwnProperty(key)) {
            values.push(el[key])
          }
        })
        return values;
      },
      keys: function() {
        return Object.keys(element);
      },
      values: function() {
        return Object.values(element);
      },
      pick: function(...search) {
        let newObj = {};
        search.forEach(key => {
          newObj[key] = element[key];
        })
        return newObj;
      },
      omit: function(...search) {
        let newObj = {};
        Object.keys(element).forEach(key => {
          if (!search.includes(key)) {
            newObj[key] = element[key];
          }
        })
        return newObj;
      },
      has: function(search) {
        return Object.prototype.hasOwnProperty.call(element, search)
      }
    };
    (["isElement", "isArray", "isObject", "isFunction", "isBoolean", "isString", "isNumber"]).forEach(function(method) {
      u[method] = function(){ _[method].call(u, element);}
    });
    return u;
  };
  _.range =  function(start, stop) {
    let range = [];
    if (stop === undefined) {
      stop = start;
      start = 0;
    };

    for (let i = start; i < stop; i += 1) {
      range.push(i);
    }
    return range;
  };

  _.extend = function(...extensions) {
    if (extensions.length === 1) {
      return extensions[0];
    } else {
      let last = extensions[extensions.length - 1];
      let secondToLast = extensions[extensions.length - 2];
      Object.keys(last).forEach(key => {
        secondToLast[key] = last[key]
      })
      return _.extend(...extensions.slice(0, -1))
    }
  }
  
  _.isElement = function(obj) {
    return obj && obj.nodeType === 1
  };
  _.isArray = Array.isArray || function(obj) {
    return toString.call(obj) === '[object Array]';
  };
  _.isObject = function(obj) {
    let type = typeof obj;

    return type === "function" || type === "object" && !!obj;
  };
  _.isFunction = function(obj) {
    let type = typeof obj;

    return type === "function";
  };
  // _.isBoolean = function(obj) {
  //   return toString.call(obj) === '[object Boolean]';
  // }
  // _.isString = function(obj) {
  //   return toString.call(obj) === "[object String]";
  // }

  // _.isNumber = function(obj) {
  //   return toString.call(obj) === "[object Number]";
  // }

  (["Boolean", "String", "Number"]).forEach(function(method) {
    _["is" + method] = function(obj) {
      return toString.call(obj) === "[object " + method + "]";
    };
  });

  window._ = _;
})();

console.log(_.isNumber(323));       // prints true
console.log(_.isNumber("abc"));     // prints false
console.log(_.isNumber(false));     // prints false
console.log(_.isString(323));       // prints false
console.log(_.isString("abc"));     // prints true
console.log(_.isString(false));     // prints false
console.log(_.isBoolean(323));      // prints false
console.log(_.isBoolean("abc"));    // prints false
console.log(_.isBoolean(false));    // prints true
