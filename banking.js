function makeBank() {
  function makeAccount(number) {
    let balance = 0;
    let transactions = [];
    return {
      deposit(value) {
        balance += value;
        transactions.push({type: "deposit", amount: value,})
        return value;
      },
      withdraw(value) {
        if (balance < value) {
          value = balance;
        } 
        
        balance -= value;
        transactions.push({type: "withdraw", amount: value,})
        return value;
      },
      balance() {
        return balance;
      },
      number() {
        return number;
      },
      transactions() {
        return transactions;
      },
    };
  }

  let accounts = [];
  return {
    openAccount() {
      let number = accounts.length + 101
      let account = makeAccount(number);
      accounts.push(account);
      return account;
    },
    transfer(source, destination, amount) {
      source.withdraw(amount);
      destination.deposit(amount);
      return amount;
    },
  }
}
