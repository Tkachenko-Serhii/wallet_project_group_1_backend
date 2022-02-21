function calculateBalance(type, balance, sum) {
  if (!type) {
    if (balance <= 0) {
      throw Error('Insufficient funds on your balance');
    }
    if (sum > balance) {
      throw Error('Insufficient funds on your balance');
    }
    return (balance -= sum).toFixed(2);
  }
  return (balance += sum).toFixed(2);
}

module.exports = calculateBalance;
