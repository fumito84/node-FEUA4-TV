console.log("Hi, it's my second  - front + back");
const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());
const port = 3000;
// const casual = require('casual');
const names = ['Tomas'];


app.get('/', (req, res) => {
    // res.send('It works')});
    res.send(names);
});

app.post('/', (req, res) => {
    const name = req.body.name;
    //{name: 'Tomas'}
    console.log(body);
    //'test'

    names.push(name);
    res.send(req.body);    
});

app.listen(port, () => {
    console.log(`server is listening and running on port ${port}`);
});