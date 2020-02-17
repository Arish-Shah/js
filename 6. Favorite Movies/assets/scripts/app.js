// const addMovieModal = document.querySelector('#add-modal');
const backdrop = document.getElementById('backdrop');
const addMovieModal = document.getElementById('add-modal');
const startAddMovieButton = document.querySelector('header button');

const toggleBackdrop = () => {
  backdrop.classList.toggle('visible');
};

const toggleMovieModal = () => {
  addMovieModal.classList.toggle('visible');
  toggleBackdrop();
};

startAddMovieButton.addEventListener('click', toggleMovieModal);
backdrop.addEventListener('click', toggleMovieModal);
