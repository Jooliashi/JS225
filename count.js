const { findSourceMap } = require("module")

function makeCounterLogger(firstNum) {
  return function(secondNum) {
    if (firstNum > secondNum) {
      for (let i = firstNum; i >= secondNum; i -= 1) {
        console.log(i);
      }
    } else {
      for (let i = firstNum; i <= secondNum; i += 1) {
        console.log(i);
      }
    }
  }
}

let countlog = makeCounterLogger(5)
countlog(8);
countlog(2);