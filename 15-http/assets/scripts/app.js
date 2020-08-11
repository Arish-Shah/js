const listElement = document.querySelector('.posts');
const postTemplate = document.getElementById('single-post');
const xhr = new XMLHttpRequest();

xhr.open('GET', 'https://jsonplaceholder.typicode.com/posts');
xhr.responseType = 'json';

xhr.onload = function () {
  const posts = xhr.response;
  for (const post of posts) {
    const postEl = document.importNode(postTemplate.content, true);
    postEl.querySelector('h2').textContent = post.title;
    postEl.querySelector('p').textContent = post.body;
    listElement.append(postEl);
  }
};

xhr.send();
