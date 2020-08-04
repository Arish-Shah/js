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
  console.log(strings);
  console.log(productName);
  console.log(productPrice);
  let priceCategory = 'pretty cheap regarding its price';
  if (productPrice > 20) {
    priceCategory = 'fairly priced';
  }
  // return `${strings[0]}${productName}${strings[1]}${priceCategory}${strings[2]}`;
  return {
    name: productName,
    price: productPrice
  };
}

const prodName = 'Sneakers';
const prodPrice = 19.99;
const prodOutput = productDescription`The product (${prodName}) is ${prodPrice}.`;

console.log(prodOutput);
