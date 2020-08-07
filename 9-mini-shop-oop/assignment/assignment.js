class Course {
  constructor(title, length, price) {
    this.title = title;
    this.length = length;
    this.#price = price;
  }

  calculate() {
    return this.length / this.price;
  }

  summary() {
    console.log(`Title: ${this.title}`);
    console.log(`Length: ${this.length}`);
    console.log(`Price: ${this.price}`);
  }

  get price() {
    return `\$${this.#price}`;
  }

  set price(value) {
    if (value >= 0) {
      this.#price = value;
    } else {
      throw new Error('Invalid Amount');
    }
  }
}

class PracticalCourse extends Course {
  constructor(title, length, price, numOfExercise) {
    super(title, length, price);
    this.numOfExercise = numOfExercise;
  }
}

class TheoreticalCourse extends Course {
  constructor(title, length, price) {
    super(title, length, price);
  }

  publish() {
    console.log('Publishing course');
  }
}
