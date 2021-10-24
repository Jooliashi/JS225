function newStack() {
  let stack = [];
  return {
    pop() {
      return stack.pop();
    },
    push(val) {
      stack.push(val);
    },
    printStack() {
      stack.forEach(item => {
        console.log(item);
      })
    }
  }
}