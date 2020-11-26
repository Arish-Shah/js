// import 'core-js';

const button = document.querySelector('button');
const textParagraph = document.querySelector('p');

button.addEventListener('click', () => {
  const text = textParagraph.textContent;

  if (navigator.clipboard) {
    navigator.clipboard
      .writeText(text)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  } else {
    alert('Feature not available, please copy manually!!');
  }
});
