function sum(a, b) {
  return a + b;
}

console.log(sum(1, 2));
console.log(sum(6, 7));

function random(num) {
  return num + Math.random();
}

console.log(random(5));

let previousResult = 0;

function addMoreNumbers(num1, num2) {
  const sum = num1 + num2;
  previousResult = sum;
  return sum;
}

addMoreNumbers();

let multiplier = 1.1;

function createTaxCalculator(tax) {
  return function calculateTax(amount) {
    console.log(multiplier);
    return amount * tax;
  };
}

const calculateVatAmount = createTaxCalculator(0.19);
const incomeTax = createTaxCalculator(0.25);

multiplier = 1.2;

console.log(calculateVatAmount(100));
console.log(incomeTax(100));

let userName = 'Max';

function greetUser() {
  let name = 'Anna';
  console.log('Hi ' + name);
}

let name = 'Arish';
userName = 'Manuel';

greetUser();

function powerOf(x, n) {
  return n === 1 ? x : x * powerOf(x, n - 1);
}

console.log(powerOf(2, 3));

const myself = {
  name: 'Max',
  friends: [
    {
      name: 'Manu',
      friends: [
        {
          name: 'Chris',
          friends: [
            {
              name: 'Hari'
            },
            {
              name: 'Amelia'
            }
          ]
        }
      ]
    },
    {
      name: 'Julia'
    }
  ]
};

function getFriendNames(person) {
  const collectedNames = [];

  if (!person.friends) {
    return [];
  }

  for (const friend of person.friends) {
    collectedNames.push(friend.name);
    collectedNames.push(...getFriendNames(friend));
  }

  return collectedNames;
}

console.log(getFriendNames(myself));
