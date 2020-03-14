class Product {
  constructor(title, image, desc, price) {
    this.title = title || 'Default';
    this.imageUrl = image;
    this.description = desc;
    this.price = price;
  }
}

const productList = {
  products: [
    new Product(
      'A Pillow',
      'https://cdn.pixabay.com/photo/2016/03/07/10/31/pillow-1241878_960_720.jpg',
      'A soft pillow!',
      19.99
    ),
    new Product(
      'A Carpet',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Ardabil_Carpet.jpg/800px-Ardabil_Carpet.jpg',
      'A carpet which you might like - or not.',
      89.99
    )
  ],

  render() {
    const renderHook = document.getElementById('app');
    const prodList = document.createElement('ul');
    prodList.className = 'product-list';

    for (const prod of this.products) {
      const prodEl = document.createElement('li');
      prodEl.className = 'product-item';
      prodEl.innerHTML = `
        <div>
          <img src="${prod.imageUrl}" alt="${prod.title}" />
          <div class="product-item__content">
            <h2>${prod.title}</h2>
            <h3>\$${prod.price}</h3>
            <p>${prod.description}</p>
            <button>Add to Cart</button>
          </div>
        </div>
      `;
      prodList.appendChild(prodEl);
    }

    renderHook.appendChild(prodList);
  }
};

productList.render();
