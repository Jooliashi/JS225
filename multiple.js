function makeMultipleLister(num) {
  return function() {
    let count = 1;
    while (num * count < 100) {
      console.log(num * count);
      count += 1;
    }
  }
}

let lister = makeMultipleLister(13);
lister();