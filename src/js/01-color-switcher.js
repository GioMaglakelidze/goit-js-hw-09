
// Знаходим кнопки за атрибутами
const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
let intervalId;
// Для генерування випадкового кольору використовуєм надану функцію
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

// Задаєм функцію для зміни кольору фону
function changeBackgroundColor() {
  document.body.style.backgroundColor = getRandomHexColor();
}

// Додаємо слухач на клік кнопки Start
startBtn.addEventListener('click', () => {
  // Заблокуєм кнопку Start, щоб не запустити декілька таймерів одночасно
  startBtn.disabled = true;
  // Розблокуєм кнопку Stop
  stopBtn.disabled = false;
  // Запускаєм інтервал і записуємо його ідентифікатор. Інтервал викликатиме функцію changeBackgroundColor кожної секунди
  intervalId = setInterval(changeBackgroundColor, 1000);
});

// Додаємо слухач на клік кнопки Stop
stopBtn.addEventListener('click', () => {
  // Розблокуєм кнопку Start
  startBtn.disabled = false;
  // Заблокуєм кнопку Stop
  stopBtn.disabled = true;
  // Відміняємо інтервал передаючи ідентифікатор
  clearInterval(intervalId);
});