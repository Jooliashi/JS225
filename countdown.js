function countdown(num) {
  (function count(n) {
    if (n >= 0) {
      console.log(n);
      count(n - 1);
    } else {
      console.log('Done!');
    }
  })(num);
}

countdown(7)