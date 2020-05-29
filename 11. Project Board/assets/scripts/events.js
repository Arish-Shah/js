let buttons = document.querySelectorAll('button');

const buttonClickHandler = event => {
  event.target.disabled = true;
};

buttons.forEach(button => button.addEventListener('click', buttonClickHandler));

// setTimeout(() => {
//   button.removeEventListener('click', buttonClickHandler);
// }, 2000);
