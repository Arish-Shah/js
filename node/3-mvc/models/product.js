const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "..", "data", "products.json");

const getProductsFromFile = (callback) => {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      callback([]);
    } else {
      callback(JSON.parse(data));
    }
  });
};

module.exports = class Product {
  constructor(title) {
    this.title = title;
  }

  save() {
    getProductsFromFile((products) => {
      products.push(this);
      fs.writeFile(filePath, JSON.stringify(products), (err) => {
        console.log(err);
      });
    });
  }

  static findAll(callback) {
    getProductsFromFile(callback);
  }
};
