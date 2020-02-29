const person = {
  name: 'Arish',
  age: 22,
  hobbies: ['coding', 'watching'],
  greet: function() {
    console.log(this);
  }
};

person.isAdmin = true;
