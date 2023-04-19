console.log("Hi, it's my second  - front + back");
const express = require('express');
const app = express();
const port = 3000;
// const casual = require('casual');
const names = ['Tomas'];


app.get('/', (req, res) => {
    // res.send('It works')});
    res.send(names)});

app.listen(port, () => {
        console.log(`server is listening and running on port ${port}`)
    });