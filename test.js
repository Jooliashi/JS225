
function greeting(person, greet) {
  console.log(`${greet}, ${person}`)
}

function generateGreeting(greet) {
  return function(person) {
    return greeting(person, greet)
  }
}

let sayHello = generateGreeting('Hello')

sayHello('Julia')