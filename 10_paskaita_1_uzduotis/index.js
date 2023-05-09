const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');

require('dotenv').config();

const port = process.env.PORT || 8080;
const URI = process.env.DB_CONNECTION_STRING;

const app = express();
app.use(express.json());
app.use(cors());

const client = new MongoClient(URI);

app.get('/users', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db('MongoDuomenuBaze')
      .collection('Users')
      .find()
      .toArray();
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/users/usersCount', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db('MongoDuomenuBaze')
      .collection('Users')
      .countDocuments();
    // countDocuments = count, bet count yra deprecated (pasenęs ir nenaudojamas)
    // countDocuments() - grąžina skaičių, kiek yra dokumentų iš viso
    // countDocuments({ product: 'toothbrush' }) - grąžina pagal kriterijų pvz. kiek yra toothbrush
    await con.close();
    // data = 10
    res.send({ count: data }); // grąžinam JSON, todėl reikia objekto ir rakto, nes data yra pvz. 10
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/users/Tomas', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db('MongoDuomenuBaze')
      .collection('Users')
      .countDocuments({ name: 'Tomas Vasiljevas' });
    // countDocuments = count, bet count yra deprecated (pasenęs ir nenaudojamas)
    // countDocuments() - grąžina skaičių, kiek yra dokumentų iš viso
    // countDocuments({ product: 'toothbrush'})- grąžina pagal kriterijų pvz. kiek yra toothbrush
    await con.close();
    // data = 10
    res.send({ count: data }); // grąžinam JSON, todėl reikia objekto ir rakto, nes data yra pvz.10
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/dinamicUsersCount/:name', async (req, res) => {
  try {
    const { name } = req.params;
    const con = await client.connect();
    const data = await con
      .db('MongoDuomenuBaze')
      .collection('Users')
      .countDocuments({ name });
    // countDocuments = count, bet count yra deprecated (pasenęs ir nenaudojamas)
    // countDocuments() - grąžina skaičių, kiek yra dokumentų iš viso
    // countDocuments({ product: 'toothbrush'})- grąžina pagal kriterijų pvz. kiek yra toothbrush
    await con.close();
    // data = 10
    res.send({ count: data }); // grąžinam JSON, todėl reikia objekto ir rakto, nes data yra pvz.10
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/users/cities', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db('MongoDuomenuBaze')
      .collection('Users')
      .distinct('city'); // grąžina unikalias reikšmes, būtinai reikia nurodyti kriterijų t.y. raktą

    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/users/lowestIncome', async (req, res) => {
  // total amount of money spent by each customer - kiek kiekvienas asmuo išleido pinigų
  try {
    const con = await client.connect();
    const data = await con
      .db('MongoDuomenuBaze')
      .collection('Users')
      .aggregate([
        { $group: { _id: '$name', totalAmount: { $sum: '$income' } } },
        { $sort: { totalAmount: 1 } },
      ])
      .toArray();
    // $group - sugrupuoja, _id: $customer - naudoja unikalų customerį,
    // totalAmount: { $sum: '$total' } - totalAmount raktas su suma kurią sudeda iš $total lauko
    // $sort: { totalAmount: -1 } - sortina mažėjimo tvarka pagal tam tikrą kriterijų: totalAmount
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/users/highestIncome', async (req, res) => {
  // total amount of money spent on each product - kiek išleido pinigų and kiekvieno produkto
  try {
    const con = await client.connect();
    const data = await con
      .db('MongoDuomenuBaze')
      .collection('Users')
      .aggregate([
        { $group: { _id: '$name', totalAmount: { $sum: '$income' } } },
        { $sort: { totalAmount: -1 } },
      ])
      .toArray();
    // $group - sugrupuoja, _id: $product - naudoja unikalų produktą,
    // totalAmount: { $sum: '$total' } - totalAmount raktas su suma kurią sudeda iš $total lauko
    // $sort: { totalAmount: 1 } - sortina didėjimo tvarka pagal tam tikrą kriterijų: totalAmount
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

// app.get('/orders/liquids', async (req, res) => {
//   // total amount of money spent on each liquid product
//   try {
//     const con = await client.connect();
//     const data = await con
//       .db('MongoDuomenuBaze')
//       .collection('purchase_orders')
//       .aggregate([
//         {
//           $match: { product: { $in: ['shampoo', 'conditioner', 'mouthwash'] } },
//         },
//         { $group: { _id: '$product', totalAmount: { $sum: '$total' } } },
//         { $sort: { totalAmount: 1 } },
//       ])
//       .toArray();
//     // $match - atitikmenys,
//     // {product:{$in:['shampoo', 'conditioner', 'mouthwash']}} žiūrima per product; išvardintuose
//     // $group - sugrupuoja, _id: $product - naudoja unikalų produktą,
//     // totalAmount: { $sum: '$total' } - totalAmount raktas su suma kurią sudeda iš $total lauko
//     // $sort: { totalAmount: 1 } - sortina didėjimo tvarka pagal tam tikrą kriterijų: totalAmount
//     await con.close();
//     res.send(data);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

app.post('/users', async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db('MongoDuomenuBaze')
      .collection('Users')
      .insertMany([
        {
          name: 'Tadas Kurtinaitis',
          email: 'tadas.kurtinaitis@example.com',
          city: 'Vilnius',
          income: 5500,
        },
        {
          name: 'Petras Kurtinaitis',
          email: 'petras.kurtinaitis@example.com',
          city: 'Vilnius',
          income: 2500,
        },
        {
          name: 'Vilius Dunlaitis',
          email: 'vilius.dunlaitis@example.com',
          city: 'Vilnius',
          income: 1500,
        },
      ]);
    await con.close();
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(port, () => {
  console.log(`Server is running on the ${port}`);
});
