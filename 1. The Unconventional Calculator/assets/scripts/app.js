const defaultResult = 0;
let currentResult = defaultResult;

function add(a, b) {
  return a + b;
}

const additionResult = add(1, 2);
currentResult = additionResult;

let calculationDescription = `(${defaultResult} + 10)`;

outputResult(currentResult, calculationDescription);
