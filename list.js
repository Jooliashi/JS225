function makeList() {
  let todos = [];
  return {
    add(todo) {
      if (todos.includes(todo)) {
        todos.push(todo);
        console.log(`${todo} added!`)
      }
    },

    list() {
      if (todos.length === 0) {
        console.log('The list is empty');
      } else {
        todos.forEach(todo => console.log(todo))
      }
    },

    remove(todo) {
      let index = todos.indexOf(todo);
      if (index !== -1) {
        todos.splice(index, 1);
        console.log(`${todo} removed`)
      }
    },
  };
}

let list = makeList();

