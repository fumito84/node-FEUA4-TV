console.log('labas nuo index failo');
const nameButton = document.querySelector('#nameButton');
nameButton.addEventListener('click', () => {
    const name = document.querySelector('input[name="name"]').value;
    console.log(name);
    fetch("http://localhost:3000/")
    .then((resp) => resp.json())
    .then((response))
})