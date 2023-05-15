const express = require('express');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');

require('dotenv').config();

const port = process.env.PORT || 8080;
const URI = process.env.DB_CONNECTION_STRING;
const dbName = process.env.DB_NAME;

const app = express();
app.use(express.json());
app.use(cors());

const client = new MongoClient(URI);

app.get('/membership', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con.db(dbName).collection('Services').find().toArray();
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post('/membership', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con.db(dbName).collection('Services').insertOne({
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
    });
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.delete('/membership/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const con = await client.connect();
    const data = await con
      .db(dbName)
      .collection('Services')
      .deleteOne({ _id: new ObjectId(id) });
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/usersm/:order', async (req, res) => {
  try {
    const { order } = req.params;
    const sort = order === 'asc' ? 1 : -1;
    const con = await client.connect();
    const data = await con
      .db(dbName)
      .collection('UsersM')
      .find()
      .sort({ name: sort })
      .toArray();
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post('/usersm', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con.db(dbName).collection('UsersM').insertOne({
      name: req.body.name,
      surname: req.body.surname,
      email: req.body.email,
      ip: req.body.ip,
      service_id: req.body.service_Id,
    });
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/usersm', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con.db(dbName).collection('UsersM').find().toArray();
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/services', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con.db(dbName).collection('Services').find().toArray();
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(port, () => {
  console.log(`Server is running on the ${port}`);
});
