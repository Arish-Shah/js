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

function createTaxCalculator(tax) {
	function calculateTax(amount) {
		return amount * tax;
	}
	return calculateTax;
}

const calculateVatAmount = createTaxCalculator(0.19);
const incomeTax = createTaxCalculator(0.25);