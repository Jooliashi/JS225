const Todo = require('./todoApp').Todo
const TodoList = require('./todoApp').TodoList
const TodoManager = require('./todoApp').TodoManager

test('create todo object with full todo data', () => {
  let newObj = new Todo({
    title: 'Buy Milk',
    month: '1',
    year: '2017',
    description: 'Milk for baby',
  });
  expect(newObj instanceof Todo).toBeTruthy();
  expect(newObj.constructor).toBe(Todo);
  expect(newObj.title).toBe('Buy Milk');
  expect(newObj.month).toBe(1);
  expect(newObj.year).toBe(2017);
  expect(newObj.completed).toBe(false);
  expect(newObj.description).toBe('Milk for baby');
})

test('create todo object with empty string for month', () => {
  let today = new Date();
  let thisMonth = today.getMonth();
  let newObj = new Todo({
    title: 'Buy Apples',
    month: '',
    year: '2017',
    description: 'An apple a day keeps the doctor away',
  });
  expect(newObj instanceof Todo).toBeTruthy();
  expect(newObj.constructor).toBe(Todo);
  expect(newObj.title).toBe('Buy Apples');
  expect(newObj.month).toBe(thisMonth);
  expect(newObj.year).toBe(2017);
  expect(newObj.completed).toBe(false);
  expect(newObj.description).toBe('An apple a day keeps the doctor away');
})


test('create todo object with empty string for year', () => {
  let today = new Date();
  let thisYear = today.getFullYear();
  let newObj = new Todo({
    title: 'Buy chocolate',
    month: '1',
    year: '',
    description: 'For the cheat day',
  });
  expect(newObj instanceof Todo).toBeTruthy();
  expect(newObj.constructor).toBe(Todo);
  expect(newObj.title).toBe('Buy chocolate');
  expect(newObj.month).toBe(1);
  expect(newObj.year).toBe(thisYear);
  expect(newObj.completed).toBe(false);
  expect(newObj.description).toBe('For the cheat day');
})

test('todo object is within specific month and year', () => {
  let newObj = new Todo({
    title: 'Buy Milk',
    month: '1',
    year: '2017',
    description: 'Milk for baby',
  });

  expect(newObj.isWithinMonthYear(1, 2017)).toBeTruthy;
  expect(newObj.isWithinMonthYear(2, 2017)).toBeFalsy;
})

describe('testing todoList object and todoManager object', () => {
  let todoData1;
  let todoData2;
  let todoData3;
  let todoData4;
  let todoSet;

  beforeEach(() => {
    todoData1 = new Todo({
      title: 'Buy Milk',
      month: '1',
      year: '2017',
      description: 'Milk for baby',
    });
    
    todoData2 = new Todo({
      title: 'Buy Apples',
      month: '',
      year: '2017',
      description: 'An apple a day keeps the doctor away',
    });
    
    todoData3 = new Todo({
      title: 'Buy chocolate',
      month: '1',
      year: '',
      description: 'For the cheat day',
    });
    
    todoData4 = new Todo({
      title: 'Buy Veggies',
      month: '',
      year: '',
      description: 'For the daily fiber needs',
    });

    todoData5 = new Todo({
      title: 'Buy Notebook',
      month: '1',
      year: '2017',
      description: 'for Math and English',
    });

    todoSet = [todoData1, todoData2, todoData3, todoData4, todoData5];
  });
  test('create todoList object with empty list', () => {
    let list = new TodoList();
    expect(list instanceof TodoList).toBeTruthy();
    expect(list.list()).toStrictEqual([])
  })

  test('create todoList object with invalid objs', () => {
    let list = new TodoList(1, {});
    expect(list).toStrictEqual({invalidTodos: true})
  })

  test('initialize the collection with todo objects', () => {
    let list = new TodoList(todoData1, todoData2);
    let todos = list.list();
    expect(todos.length).toBe(2);
    expect(todos).toStrictEqual([todoData1, todoData2])
  })

  test('add invalid object to list', () => {
    let list = new TodoList();
    expect(list.add({})).toBeFalsy();
  });

  test('add valid todo object to list', () => {
    let list = new TodoList();
    list.add(todoData1);
    let todos = list.list();
    expect(todos.length).toBe(1);
    expect(todos).toStrictEqual([todoData1])
  });

  test('list() method return copies of objects only', () => {
    let list = new TodoList(todoData1, todoData2);
    let todos = list.list();
    expect(todos[0]).not.toBe(todoData1)
    expect(todos[1]).not.toBe(todoData2)
    expect(todos).toStrictEqual([todoData1, todoData2])
  })

  test('get a copy of the todo object with id', () => {
    let list = new TodoList(todoData1, todoData2, todoData3, todoData4);
    let todo = list.getTodo(todoData3.id);
    expect(todo).toStrictEqual(todoData3);
    expect(todo).not.toBe(todoData3);
  })
  
  test('delete non-exist todo from list with id', () => {
    let list = new TodoList(todoData1, todoData2);
    expect(list.delete(todoData3.id)).toBeFalsy;
    expect(list.list().length).toBe(2);
    
  })

  test('delete existing todo from list with id', () => {
    let list = new TodoList(todoData1, todoData2);
    list.delete(todoData1.id);
    expect(list.list().length).toBe(1);
  })

  test('update todo title', () => {
    let list = new TodoList(todoData1, todoData2);
    list.update(todoData1.id, {title: 'Buy Whole Milk'});
    expect(list.getTodo(todoData1.id).title).toEqual('Buy Whole Milk');
  })

  test('update todo completion and year', () => {
    let list = new TodoList(todoData1, todoData2);
    list.update(todoData1.id, {completed: true, year: 2020})
    expect(list.getTodo(todoData1.id).completed).toBeFalsy;
    expect(list.getTodo(todoData1.id).year).toEqual(2020)
  })

  test('update todo with invalid todo id', () => {
    let list = new TodoList(todoData1, todoData2);
    expect(list.update(todoData3.id, {title: 'Buy Whole Milk'})).toBeFalsy;
  })

  test('update todo with invalid updates', () => {
    let list = new TodoList(todoData1, todoData2);
    expect(list.update(todoData1.id, {id: '111'})).toBeFalsy;
  })

  test('get todo with id, copy only', () => {
    let list = new TodoList(...todoSet);
    let todo = list.getTodo(todoData1.id);
    expect(todo).toStrictEqual(todoData1);
    expect(todo).not.toBe(todoData1);
  })

  test('create todoManager object', () => {
    let todoList = new TodoList(...todoSet);
    let todoManager = new TodoManager(todoList)
    expect(todoManager instanceof TodoManager).toBeTruthy;
  })

  test('create todoManager object with invalid input', () => {
    let todoManager = new TodoManager({})
    expect(todoManager).toStrictEqual({invalidTodoList: true});
  })

  test('get all todos', () => {
    let todoList = new TodoList(...todoSet);
    let todoManager = new TodoManager(todoList)
    let todos = todoManager.allTodos();
    expect(todos.length).toEqual(5);
    expect(todos).toStrictEqual(todoSet);
  })

  test('get all completed todos', () => {
    let todoList = new TodoList(...todoSet);
    todoList.update(todoData1.id, {completed: true})
    todoList.update(todoData2.id, {completed: true})
    let todoManager = new TodoManager(todoList)
    let todos = todoManager.completedTodos();
    expect(todos.length).toEqual(2);
    expect(todos).toStrictEqual([todoData1, todoData2]);
  })

  test('get todos within specific year and month', () => {
    let todoList = new TodoList(...todoSet);
    let todoManager = new TodoManager(todoList)
    let todos = todoManager.todosWithinMonthYear(1, 2017);
    expect(todos.length).toEqual(2);
    expect(todos).toStrictEqual([todoData1, todoData5]);
  })

  test('get completed todos with year or month', () => {
    let todoList = new TodoList(...todoSet);
    let todoManager = new TodoManager(todoList)
    todoList.update(todoData1.id, {completed: true})
    let todos = todoManager.completedTodosWithinMonthYear(1, 2017);
    expect(todos.length).toEqual(1);
    expect(todos).toStrictEqual([todoData1]);
  })
});