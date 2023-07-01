const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');

const app = express();
// eslint-disable-next-line spaced-comment
app.use(express.json()); //aplikacija moka apdoroti ateinacius requestus
app.use(cors());

require('dotenv').config();

const port = process.env.PORT || 8080;
const URI = process.env.DB_CONNECTION_STRING;
const dbName = process.env.DB_NAME;
console.log(port, URI, dbName);

const client = new MongoClient(URI);
// const names = ['Tomas'];

// app.get('/', (req, res) => {
//   res.send(names);
// });

app.get('/', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con.db(dbName).collection('Movies').find().toArray();
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post('/', async (req, res) => {
  try {
    const { title, rating, genre } = req.body;
    const con = await client.connect();
    const data = await con
      .db(dbName)
      .collection('Movies')
      .insertOne({ title, rating, genre });
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(port, () => {
  console.log(`Server is running on the ${port} port`);
});
