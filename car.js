function makeCar(upRate, downRate) {
  return {
    speed: 0,
    upRate,
    downRate,
    brake() {
      this.speed -= this.downRate;
      this.speed = this.speed < 0 ? 0 : this.speed;
    },
    accelerate() {
      this.speed += this.upRate;
    },
  };
}

let sedan = makeCar(8, 6);
