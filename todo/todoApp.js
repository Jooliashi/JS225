const { v4: uuidv4 } = require('uuid')
const _ = require('lodash')

class Todo {
  constructor(data) {
    let today = new Date();
    let thisYear = today.getFullYear();
    let thisMonth = today.getMonth();
    this.title = data.title;
    this.completed = false;
    this.month = Number(data.month) || thisMonth;
    this.year = Number(data.year) || thisYear;
    this.id = uuidv4();
    this.description = data.description;
  }

  isWithinMonthYear(month, year) {
    return this.month === month && this.year === year;
  }
}

class TodoList {
  #list;
  static properties = ['completed', 'title', 'year', 'date']

  constructor(...todos) {
    if (todos) {
      if (todos.every(todo => todo instanceof Todo)) {
        this.#list = todos;
      }
      else {
        return {invalidTodos: true}
      }
    } else {
      this.#list = [];
    }
  }

  list() {
    let copiedList = _.cloneDeep(this.#list)
    return copiedList;
  }

  getTodo(id) {
    return this.list().filter(todo => todo.id === id)[0]
  }

  #getRealTodo(id) {
    return this.#list.filter(todo => todo.id === id)[0]
  }

  add(todo) {
    if (!(todo instanceof Todo)) {
      return false;
    }
    this.#list.push(todo);
  }

  delete(id) {
    let todo = this.#getRealTodo(id);
    if (!todo) {
      return false;
    }
    let idx = this.#list.indexOf(todo);
    this.#list.splice(idx, 1)
  }

  update(id, updates) {
    let todo = this.#getRealTodo(id)
    if (!todo) {
      return false;
    } else if (Object.keys(updates).some(key => !TodoList.properties.includes(key))) {
      return false;
    }
    Object.assign(todo, updates)
  }
}

class TodoManager {
  constructor(todoList) {
    if (!todoList || !(todoList instanceof TodoList)) {
      return {invalidTodoList: true};
    }
    this.todoList = todoList;
  }

  allTodos() {
    return this.todoList.list();
  }

  completedTodos() {
    return this.todoList.list().filter(todo => todo.completed)
  }

  todosWithinMonthYear(month, year) {
    return this.todoList.list().filter(todo => {
      return todo.isWithinMonthYear(month, year)
    })
  }

  completedTodosWithinMonthYear(month, year) {
    return this.todosWithinMonthYear(month, year).filter(todo => todo.completed);
  }
}


module.exports = {
  Todo: Todo,
  TodoList: TodoList,
  TodoManager: TodoManager,
}
