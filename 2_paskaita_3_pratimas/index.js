const express = require ("express"); //express importas
const cors = require("cors"); // cors importas
const app = express(); //express aplikacijos inicijavimas

app.use(express.json()); // aplikacija priima duomanis JSON formatu
app.use(cors());// aplikacija naudoja CORS apsauga

const port = 3000; //kanalas reikalingas serveriui

const products = [];

//GET kelias kuris grazina duomenis
app.get("/products", (req, res) => {
    //res (response)  - duomenys kuriuos mes graziname
    res.send(products);
    //res.send() - metodas kuris grazina klientui atsakyma
});

app.post("/products", (req, res) => {
    // req (request) - duomenys kuriuos mes gauname is isores
    // req.body - pagrindiniai duomenys is isores
    const product = {name: req.body.name, price: req.body.price}; //sukuria objekta is siunciamo body
    products.push(product);
    res.send(product); //POST dalyje siunciam atgal klientui tai ka jis pats atsiunte mums
});

// app.listen() - metodas kuris paleidzia klausytis musu serverio nurodytu kanalu
// port - kanals
// () => {} - funkcija kuri pasileidzia kai serveris startuoja
// console.log naudojama kad zinoti kokiu kanalu paleiso serveri
app.listen(port, () => {
    console.log(`Server is running on the ${port}`);
});