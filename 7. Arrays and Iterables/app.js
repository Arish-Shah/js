const hobbies = ['Sports', 'Gaming'];

hobbies.push('Swimming');
hobbies.pop();
hobbies.unshift('Boating');
hobbies.shift();
hobbies.splice(1, 0, 'Running', 'Hunting');
const newHobbies = hobbies.slice();

console.log(newHobbies);
