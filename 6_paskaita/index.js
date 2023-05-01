// dazniausiai naudojamos aplinkos
// development (pas mus), testing, preprod
// (versija pries galutine), production (galutine versija kuria mato visi klientai);

const express = require('express'); // express importas;
const cors = require('cors'); // cors importas
require('dotenv').config();

// process.env tai yra objektas sukurtas is musu .env failo;

const port = process.env.PORT || 8080;
// || 8080 - griztamasis rysys jei nebus rastas tipinis portas;
const app = express();
// express aplikacijos inicijavimas;

app.use(express.json()); // aplikacija priima duomanis JSON formatu
app.use(cors()); // aplikacija naudoja CORS apsauga

app.get('/', (req, res) => {
  res.send([]);
});

app.listen(port, () => {
  console.log(`Server is running on the ${port}`);
});

// Extensions kairėje pusėje navigacijoje
// Rašome "prettier" ir instaliuojame Prettier - Code formatter
//
