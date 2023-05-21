/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-undef */
document
  .querySelector('#firstBtn')
  .addEventListener('click', () => window.open('../membershipManagement.html'));
document
  .querySelector('#secondBtn')
  .addEventListener('click', () => window.open('../usersManagement.html'));

const cancelBtn = document.querySelector('#cancelBtn');
const newMembershipBtn = document.querySelector('#newMembershipBtn');

newMembershipBtn.addEventListener('click', () => {
  const nameField = document.querySelector('#name').value;
  const memPrice = document.querySelector('#memPrice').value;
  const textArea = document.querySelector('#commBox').value;

  fetch('http://localhost:3000/memberships', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: nameField,
      price: memPrice,
      description: textArea,
    }),
  })
    .then(() => window.close('../createMembership.html'))
    .catch((err) => console.error(err));
});

cancelBtn.addEventListener('click', () => {
  window.location.reload();
  window.close('../createMembership.html');
});
