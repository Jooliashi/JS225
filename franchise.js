const franchise = {
  name: 'How to Train Your Dragon',
  allMovies() {
    let name = function (number) {
      return `${this.name} ${number}`;
    }.bind(this);
    
    return [1, 2, 3].map(name);
  },
};

console.log(franchise.allMovies())