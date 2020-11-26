// // const uid = Symbol('uid');
// // console.log(uid);

// // const user = {
// //   [uid]: 'p1',
// //   name: 'Arish',
// //   age: 22,
// //   [Symbol.toStringTag]: 'User'
// // };

// // user[uid] = 'p3';

// // user.id = 'p2';

// // console.log(user[Symbol('uid')]);
// // console.log(Symbol('uid') === Symbol('uid'));
// // console.log(user.toString());

// const company = {
//   currEmployee: 0,
//   employees: ['Arish', 'Rahil', 'Shah'],
//   next() {
//     if (this.currEmployee >= this.employees.length) {
//       return { value: this.currEmployee, done: true };
//     }

//     const returnValue = {
//       value: this.employees[this.currEmployee],
//       done: false
//     };
//     this.currEmployee++;
//     return returnValue;
//   },
//   [Symbol.iterator]: function* employeeGenerator() {
//     let currEmployee = 0;
//     while (currEmployee < this.employees.length) {
//       yield this.employees[currEmployee];
//       currEmployee++;
//     }
//   }
// };

// // console.log(company.next());
// // console.log(company.next());
// // console.log(company.next());
// // console.log(company.next());
// // console.log(company.next());

// for (let employee of company) {
//   console.log(employee);
// }

const course = {
  title: 'Arish Rahil Shah'
};

Reflect.setPrototypeOf(course, {
  toString() {
    return this.title;
  }
});

// -- Proxy --

const courseHandler = {
  get(obj, propertyName) {
    console.log(propertyName);
    return obj[propertyName] || 'Not Found';
  }
};

const pCourse = new Proxy(course, courseHandler);

console.log(pCourse.title);
console.log(course, pCourse);
console.log(pCourse.foo);
