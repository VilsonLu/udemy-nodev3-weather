/* eslint-disable no-undef */
const weatherForm = document.querySelector('form');
const searchInput = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

messageOne.textContent = '';
messageTwo.textContent = '';

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault(); // prevents the default behavior, which is refresh the page
  const searchValue = searchInput.value;

  messageOne.textContent = 'Loading...';
  messageTwo.textContent = '';

  const url = `http://localhost:3000/weather?address='${decodeURI(searchValue)}'`;
  fetch(url).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        messageOne.textContent = data.error;
      } else {
        messageOne.textContent = data.forecast;
        messageTwo.textContent = data.location;
      }
    });
  });
});
