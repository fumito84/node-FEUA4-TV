/* eslint-disable linebreak-style */
// npm install nodemon --save-dev - įrašo į devDependencies
// --save-dev flagas
// devDependencies - tai moduliai, be kurių mūsų aplikacija veiktų,
// tačiau jie yra padedantys developinimui

// DB - database - duomenų baszė
// .find().toArray() - grąžiną visus dokumentus iš kolekcijos
// .insertOne(item) - prideda vieną dokumentą į kolekciją

const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
require('dotenv').config();

const port = process.env.PORT || 8080;
const URI = process.env.DB_CONNECTION_STRING;
// Prisijungimo prie mūsų DB linkas
// galima rasti mongodb.com ant klasterio "Connect" mygtukas ir Drivers skiltis

const app = express();
app.use(express.json());
app.use(cors());

const client = new MongoClient(URI); // MongoDB instance

// async funkcija, kad galėtume naudoti await prisijungiat prie DB
app.get('/', async (req, res) => {
  try {
    const con = await client.connect(); // prisijungiame prie duomenų bazės
    const data = await con
      .db('MongoDuomenuBaze')
      .collection('Restaurants')
      .find()
      .toArray(); // išsitraukiame duomenis iš duomenų bazęs
    await con.close(); // uždarom prisijungimą prie duomenų bazės
    res.send(data);
  } catch (error) {
    // 500 statusas - internal server error - serveris neapdorojo arba nežino kas per klaida
    res.status(500).send(error);
  }
});

app.post('/', async (req, res) => {
  try {
    const restaurant = req.body;
    const con = await client.connect();
    const data = await con
      .db('MongoDuomenuBaze')
      .collection('Restaurants')
      .insertOne(restaurant); // prideda vieną objektą
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post('/restaurants', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db('MongoDuomenuBaze')
      .collection('Restaurants')
      .insertOne({
        name: 'STIKLIAI',
        address: 'Stikliu 2',
        city: 'Vilnius',
        ciusine: 'Ivairi',
        rating: 4.5,
      }); // prideda vieną objektą
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(port, () => {
  console.log(`Server is listening on the ${port} port`);
});
