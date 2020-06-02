let button = document.querySelector('button');

// const buttonClickHandler = event => {
//   console.log(event);
//   event.target.disabled = true;
// };

// const anotherButtonClickHandler = () => {
//   console.log('This was clicked');
// };

// const boundFn = buttonClickHandler.bind(this);

// buttons.forEach(button => {
//   button.addEventListener('click', buttonClickHandler);
// });

// setTimeout(() => {
//   button.removeEventListener('click', buttonClickHandler);
// }, 2000);

const form = document.querySelector('form');
form.addEventListener('submit', event => {
  event.preventDefault();
});

const div = document.querySelector('div');
div.addEventListener('click', event => {
  console.log('CLICKED DIV');
  console.log(event);
});

button.addEventListener('click', event => {
  event.stopPropagation();
  console.log('CLICKED BUTTON');
  console.log(event);
});

const list = document.querySelector('ul');
list.addEventListener('click', event => {
  event.target.classList.toggle('highlight');
});
