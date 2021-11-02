### Assumptions

- I used three "classes" to each create todo object, todoList object, todoManager object; It was not exactly clear the later two should be object literals or created as a type but I chose making them into classes because of the possibility of creating multiple todoList objects in the future and the benefits of provided private data functionality from classes syntax.

#### Todo
1. Input validation  
Because it was stated at the bottom that it will not ask for user input and all todo data are in the same format, I did not add any input validation in the constructor.
2. Empty strings for month and year  
I assume that for users, if they are inputting todos, most likely the todo task will be for today; so if there is missing month or year, it will be defaulted to current date and saved as number instead of string in the object.
3. UUID for unique id generation  
I used uuid npm package for generating an unique id; since it's a library function, i don't think it needs to be tested.
4. `isWithinMonthYear` method  
I assumed that this should be used to return a boolean indicating if the object is within a specific month and year. I assume here year and month should be valid input.

#### todoList
1. data integrity  
	- privated `list` property and `getRealtodo()` method  
the object has a `list` property which is an array that contains list of todo objects. I made the property private to protect the data and prevent any direct manipulation. I made a seperate private method that returns the original `todo` object as a helper method for `delete` and `update`
	- `list()` and `getTodo()` returns deep copies  
I made a `list()` method which returns a deep clone copy of the `list` property. I used lodash to facilitate this so that the nested objects are copied, each into a new Todo object with same values. In addition, `getTodo()` method which returns a todo object matching supplied `id` also returns a deep clone of the original `todo` object.

2.  `delete` and `update` method take id as input. They return `false` if input `id` is not found. `update` also returns `false` if the user is attempting to modify invalid properties(for example, id).  
3. Initializes the collection with todo objects  
The method allows an initialiation with a list of todo objects but it also allows initializing with an empty list; the prompt says it supports `initializes the collection with todo objects`, I take it as it does not ONLY support that. Because it has the `add` function, I don't see why the empty collection should not be allowed.  
However, initializing with objects or values other than those from Todo type will return a `{invalidTodos: true}` object.

#### todoManager
- todoManager object is initialized with a todoList object as argument. The list is saved as its property. The object access the todo collection by `list()` method which returns deep copies. If invalid input entered or no input entered, it will return {invalidTodoList: true}.  
- for any methods require month and year input, I again assume they will all be valid input.   

#### Jest
I used jest for testing. I would like to point out the use of `toStrictEqual` and `toBe` methods to test objects. `toStrictEqual` tests for same type, same properties and values. It will return `true` for original object and cloned object. `toBe` is testing if the two objects are the same object, so it will return `false` for original object and cloned object.  
use `npm run test` for test suites.  
