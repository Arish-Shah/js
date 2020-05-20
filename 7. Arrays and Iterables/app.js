const numbers = [1, 2, 3, 4];

const sum = numbers.reduce((prevValue, currentValue) => {
  return prevValue + currentValue;
}, 0);

console.log(sum);

const str = 'New York;1000;20.4';
console.log(str.split(';'));
