const intervalId = setInterval(() => {
  console.log('Sending Analytics');
}, 2000);

document.getElementById('start-analytics-btn').addEventListener('click', () => {
  clearInterval(intervalId);
});
