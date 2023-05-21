console.log("Hi, it's my first self task");
const express = require('express');
const app = express();
const port = 3000;
const casual = require('casual');

app.get('/', (req, res) => {
    res.send('Labas tai mano pirma savarankiska uzduotis su NODE.JS')
});

app.get('/user', (req, res) => {
    const user = `First name: ${casual.first_name}, Last name: ${casual.last_name}, Country: ${casual.country}, City: ${casual.city}, Street: ${casual.street}, ZIP code: ${casual.zip(digits = (5, 9))}`;
    res.send(user);
});

app.get('/color', (req, res) => {
    const randomColor = `Color name: ${casual.color_name}`;
    res.send(randomColor);
});

// app.get('/colors', (req, res) => {
//     const randomColors = `Color name:['${casual.color_name}', '${casual.color_name}', '${casual.color_name}', '${casual.color_name}', '${casual.color_name}']`;
//     res.send(randomColors);
// });  
//// primityvas

app.get('/colors', (req, res) => {
    const randomColors = [];
    for (let i = 0; i < 5; i++){
        randomColors[i] = casual.color_name;
    }
    res.send(randomColors);
}); //profesionalus variantas 


app.get('/randomPlaces', (req, res) => {
    const places = [];
    const numPlaces = Math.floor(Math.random() *5) + 1;
    for (let i = 0; i < numPlaces; i++){
        const place = {
            country: casual.country,
            city: casual.city,
            address: `${casual.street}, ${casual.address2}`,
        };
        places.push(place);
    }
    res.send(places);
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});