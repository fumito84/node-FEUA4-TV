console.log("Hi, it's my second task");
const express = require('express');
const app = express();
const port = 3000;
// const casual = require('casual');

app.get('/', (req, res) => {
    res.send('It works')});

app.listen(port, () => {
        console.log(`server is running on ${port}`)
    });