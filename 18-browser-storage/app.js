const storeButton = document.getElementById('store-btn');
const retrButton = document.getElementById('retrieve-btn');

const dbRequest = indexedDB.open('StorageDummy', 1);

dbRequest.onupgradeneeded = function (event) {
  const db = event.target.result;

  const objStore = db.createObjectStore('products', { keyPath: 'id' });

  objStore.transaction.oncomplete = function () {
    const productsStore = db
      .transaction('products', 'readwrite')
      .objectStore('products');
    productsStore.add({
      id: 'p1',
      title: 'A first product',
      price: 19.99,
      tags: ['Expensive', 'Luxury']
    });
  };
};

dbRequest.onerror = function (event) {
  console.log('Error!');
};

storeButton.addEventListener('click', () => {});

retrButton.addEventListener('click', () => {});
