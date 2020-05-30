let buttons = document.querySelectorAll('button');

const buttonClickHandler = event => {
  console.log(event);
  event.target.disabled = true;
};

const anotherButtonClickHandler = () => {
  console.log('This was clicked');
};

const boundFn = buttonClickHandler.bind(this);

buttons.forEach(button => {
  button.addEventListener('click', buttonClickHandler);
});

// setTimeout(() => {
//   button.removeEventListener('click', buttonClickHandler);
// }, 2000);

window.addEventListener('scroll', event => {
  console.log(event);
});
