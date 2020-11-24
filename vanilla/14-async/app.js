const button = document.querySelector('button');
const output = document.querySelector('p');

const getPosition = opts => {
  const promise = new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      success => {
        resolve(success);
      },
      error => {
        reject(error);
      },
      opts
    );
  });
  return promise;
};

const setTimer = duration => {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Done!');
    }, duration);
  });
  return promise;
};

async function trackUserHandler() {
  const posData = await getPosition();
  const timerData = await setTimer(2000);
  console.log(posData, timerData);
}

button.addEventListener('click', trackUserHandler);

Promise.race([getPosition(), setTimer(2000)]).then(data => console.log(data));

Promise.all([getPosition(), setTimer(1000)]).then(data => console.log(data));

Promise.allSettled([getPosition(), setTimer()]).then(data => console.log(data));

// let result = 0;
// for (let i = 0; i < 10000; i++) {
//   result = result + i;
// }

// console.log(result);
