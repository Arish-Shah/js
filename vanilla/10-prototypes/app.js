class AgedPerson {
  printAge() {
    console.log(this.age);
  }
}

class Person extends AgedPerson {
  name = 'Arish';

  constructor() {
    super();
    this.age = 21;
  }

  greet() {
    console.log(`Hi ${this.name}. I am ${this.age} years old`);
  }
}

// function Person() {
//   this.age = 21;
//   this.name = 'Arish';
// }

// Person.prototype.printAge = function () {
//   console.log(this.age);
// };

// const p = new Person();
// p.printAge();

// const p2 = new p.__proto__.constructor();
// console.log(p2);

// const p = new Person();
// const p2 = new Person();
// console.log(Person.prototype);

const course = {
  title: 'JavaScript',
  rating: 5
};

Object.setPrototypeOf(course, {
  printRating: function () {
    console.log(`${this.rating}/5`);
  }
});

course.printRating();

const student = Object.create(
  {
    printProgress: function () {
      console.log('foo');
    }
  },
  {
    name: {
      configurable: true,
      enumerable: true,
      value: 'Arish'
    }
  }
);

console.log(student);
