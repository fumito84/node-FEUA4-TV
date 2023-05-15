/* eslint-disable no-use-before-define */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-undef */
const randomNum = Math.floor(Math.random() * 100) + 10;
const randomNum2 = Math.floor(Math.random() * 100) + 10;
const randomNum3 = Math.floor(Math.random() * 100) + 10;
const randomNum4 = Math.floor(Math.random() * 100) + 10;
const randomIP = `${randomNum}.${randomNum2}.${randomNum3}.${randomNum4}`;

document.querySelector('.member').addEventListener('click', () => {
  window.open('./membershipManagement.html');
});

document.querySelector('.user').addEventListener('click', () => {
  window.open('./usersmanagement.html');
});

const cancel = document.querySelector('#cancel');
const newUser = document.querySelector('#newUser');

newUser.addEventListener('click', () => {
  const nameField = document.querySelector('#firstName').value;
  const surnameField = document.querySelector('#lastName').value;
  const email = document.querySelector('#email').value;

  const membership = document.querySelector('select').value;

  fetch('http://localhost:3000/usersm', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: nameField,
      surname: surnameField,
      // eslint-disable-next-line object-shorthand
      email: email,
      ip: randomIP,
      service_id: membership,
    }),
  })
    .then(() => window.close('./createMembership.html'))
    .catch((err) => console.error(err));
});

const select = document.querySelector('#membershipManagment');
fetch('http://localhost:3000/memberships')
  .then((res) => res.json())
  .then((data) => showInfo(data))
  .catch((err) => console.error(err));

const showInfo = (info) => {
  info.forEach((data) => {
    const option = document.createElement('option');
    option.text = data.name;
    option.value = data.name;
    select.append(option);
  });
};

cancel.addEventListener('click', () => {
  window.location.reload();
  window.close('./createMembership.html');
});
