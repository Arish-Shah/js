const storeButton = document.getElementById('store-btn');
const retrButton = document.getElementById('retrieve-btn');

storeButton.addEventListener('click', () => {
  const userId = 'u123';
  const user = { name: 'arish', age: 22 };
  document.cookie = `uid=${userId}; max-age=2`;
  document.cookie = `user=${JSON.stringify(user)}`;
});

retrButton.addEventListener('click', () => {
  const cookieData = document.cookie.split(';');
  const data = cookieData.map((i) => i.trim());
  console.log(data[1].split('=')[1]);
});
