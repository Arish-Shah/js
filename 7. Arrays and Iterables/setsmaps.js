const ids = new Set([1, 2, 3]);

console.log(ids.values());

let person1 = { name: 'Arish' };
let person2 = { name: 'Rahil' };

const personData = new Map([[person1, [{ date: 'Yesterday', price: 10 }]]]);

console.log(personData.get(person1));

let person = { name: 'Arish' };
const persons = new WeakSet();
persons.add(person);

person = null;

console.log(persons);
