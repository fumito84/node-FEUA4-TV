console.log("hello from V2");
const express = require('express'); //expres modulio inportavimas
const app = express(); // aplikacijos sukurimas
const port = 3000; // porto (kanalo) skaicius

//rout/path (kelias)
//get - grazink duomenis
app.get('/', (req, res) => {
    //rec - request - tai kas ateina is isores, res - response - kas ateina is vidaus
    res.send('Mano vardas yra Rokas'); // send - metodas issiuncia duomenis
});

app.get('/today', (req, res) => {
    res.send(new Date().toDateString());
});

app.get('/user', (req, res) => {
    const user = {
        name: 'Tomas',
        surname: 'Vasiljevas',
        age: 24,
    };
    res.send(user);
})

//serverio paleidimas
app.listen(port, () =>{
    console.log(`Server is listening on port ${port}`);
});
