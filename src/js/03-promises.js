// Імпортуємо бібліотеку Notiflix
import Notiflix from 'notiflix';
// Знаходимо форму за класом
const form = document.querySelector('.form');
// Вішаєм слухача на кнопку submit форми
form.addEventListener('submit', event => {
  // Відміняємо дію браузера за замовчуванням
  event.preventDefault();

  // Отримуємо значення полів з форми, на всякий випадок приводимо до числа
  const delay = Number(form.delay.value);
  const step = Number(form.step.value);
  const amount = Number(form.amount.value);

  // Створюємо масив промісів з кроком збільшення затримки
  const promises = [];
  for (let i = 0; i < amount; i++) {
    const position = i + 1;
    const promiseDelay = delay + step * i;
    promises.push(createPromise(position, promiseDelay));
  }

  // Виконуємо всі проміси та обробляємо результати
  Promise.all(
    promises.map(promise => {
      return promise
        .then(result => {
          const { position, delay } = result;
          Notiflix.Notify.success(
            `✅ Fulfilled promise ${position} in ${delay}ms`
          );
        })
        .catch(result => {
          const { position, delay } = result;
          Notiflix.Notify.failure(
            `❌ Rejected promise ${position} in ${delay}ms`
          );
        });
    })
  )
    .then(() => {
      console.log('All promises have been settled');
    })
    .catch(error => {
      console.error('Something went wrong:', error);
    });
});

// Функція для створення промісів з умови задачі
function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
