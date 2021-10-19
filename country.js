function makeCountry(name, continent, visited = false) {
  return {
    name,
    continent,
    getDescription() {
      if (this.visited) {
        return `${this.name} is located in ${this.continent}. I have visited ${this.name};`;
      } else {
        return `${this.name} is located in ${this.continent}. I haven't visited ${this.name};`;
      }
    },
    visited,
    visitCountry() {
      this.visited = true;
    },
  };
}

let chile = makeCountry('The Republic of Chile', 'South America');
let canada = makeCountry('Canada', 'North America');
let southAfrica = makeCountry('The Republic of South Africa', 'Africa');

console.log(canada.getDescription()); // "Canada is located in North America. I haven't visited Canada."
canada.visitCountry();
console.log(canada)
console.log(canada.getDescription()); // "Canada is located in North America. I have visited Canada."