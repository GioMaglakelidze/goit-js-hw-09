// Щоб вибрати кінцеву дату і час в одному елементі інтерфейсу
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';
// Для відображення повідомлень користувачеві
import Notiflix from 'notiflix';

// Знайдем кнопку старт
const startButton = document.querySelector('[data-start]');
// Деактивуємо її до тих пір, поки не буде вибрана дійсна дата (в майбутньому)
startButton.disabled = true;
// Визначаємо параметри для Flatpickr
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    // Перевіряємо на дійсність вибраної дати
    if (selectedDates[0] < new Date()) {
      // Використовуємо Notiflix для відображення повідомлення користувачеві
      Notiflix.Notify.warning('Please choose a date in the future');
      document.querySelector('#datetime-picker').value = '';
      startButton.disabled = true;
    } else {
      startButton.disabled = false;
    }
  },
};
// Ініціалізуємо Flatpickr з параметрами вище
flatpickr('#datetime-picker', options);
// Додаєм слухач подій для кнопки старту
startButton.addEventListener('click', () => {
  const endDate = new Date(document.querySelector('#datetime-picker').value);
  const timerInterval = setInterval(() => {
    const timeLeft = endDate - new Date();
    const { days, hours, minutes, seconds } = convertMs(timeLeft);
    document.querySelector('[data-days]').textContent = addLeadingZero(days);
    document.querySelector('[data-hours]').textContent = addLeadingZero(hours);
    document.querySelector('[data-minutes]').textContent =
      addLeadingZero(minutes);
    document.querySelector('[data-seconds]').textContent =
      addLeadingZero(seconds);
  }, 1000);
});
// Задаєм функцію яка додає 0, якщо в числі менше двох символів
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
// Для підрахунку значень таймеру використовуєм надану функцію:
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
// Додаєм мінімальне оформлення елементів інтерфейсу під прев'ю задачі
const timerDiv = document.querySelector('.timer');
timerDiv.style.marginTop = '20px';
timerDiv.style.color = 'black';
timerDiv.style.display = 'flex';
const fieldDivs = timerDiv.querySelectorAll('.field');
fieldDivs.forEach(fieldDiv => {
  fieldDiv.style.marginRight = '20px';
  fieldDiv.style.fontSize = '1em';
  fieldDiv.style.textTransform = 'uppercase';
  fieldDiv.style.display = 'flex';
  fieldDiv.style.flexDirection = 'column';
  fieldDiv.style.alignItems = 'center';
});
const values = document.querySelectorAll('.value');
values.forEach(value => {
  value.style.fontSize = '2.5em';
});
