fetch('http://localhost:3000/')
    .then((resp) => resp.json())
    .then((response) => {
        const namesList = document.querySelector('#namesId');

        response.forEach((name) => {
            const li = document.createElement('li');
            li.textContent = name;
            namesList.append(li);
        });
    });

console.log('labas nuo index failo');
const nameButton = document.querySelector('#nameButton');
nameButton.addEventListener('click', () => {
    const name = document.querySelector('#inputText').value;
    console.log(name);

    // fetch("http://localhost:3000/")
    // .then((resp) => resp.json())
    // .then((response) => {
    //     console.log(response);
    // })
    // .catch ((error) => {
    //     console.log(error);
    // });

    fetch('http://localhost:3000/', {
        methot:'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name})
    }).then(() => {
        location.reload();
    });
});