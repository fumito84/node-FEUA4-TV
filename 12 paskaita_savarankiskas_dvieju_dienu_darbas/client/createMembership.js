/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
document.querySelector('.member').addEventListener('click', () => {
  window.open('./membershipManagement.html');
});
document.querySelector('user').addEventListener('click', () => {
  window.open('./userManagement.html');
});

const cancel = document.querySelector('#cancel');
const newMembership = document.querySelector('#newMembership');

newMembership.addEventListener('click', () => {
  const nameField = document.querySelector('#name').value;
  const memPrice = document.querySelector('#price').value;
  const textArea = document.querySelector('#textBox').value;

  fetch('http://localhost:3000/memberships', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: nameField,
      price: memPrice,
      description: textArea,
    }),
  })
    .then(() => window.close('./createMembership.html'))
    .catch((err) => console.error(err));
});

cancelBtn.addEventListener('click', () => {
  window.location.reload();
  window.close('./createMembership.html');
});
