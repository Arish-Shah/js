// console.log(Number.MAX_SAFE_INTEGER);
// console.log(Number.MIN_SAFE_INTEGER);

// console.log(parseInt(1010101n));
// console.log(BigInt(12));

// console.log(Number.isFinite(1/1));

// console.log(Math.E)

function random(max, min) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

console.log(random(10, 20));

function productDescription(strings, productName, productPrice) {
  return 'foo';
}

const prodName = 'Sneakers';
const prodPrice = 19.99;
const productOutput = productDescription`The product (${prodName}) is ${prodPrice}`;
console.log(productOutput);
