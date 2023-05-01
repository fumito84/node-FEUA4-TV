// trys budai susikurti node.js aplikacijas
// 1. Ranka pasirasyti oackage.json ir index.j faila bet reikes susirasyti atskirai reikalingus modulius
// 2. persikopijuoti package.json faila ir index.js faila pasitikrinti nereikalingas eilutes. Uztenka parasyti npm install kad surasytu visus reikalingus modulius
// 3. Kamanda npm install kuri sukurs jums package.json ir index.js failus, bet reikes susirasyti rekalingus modulius

// 1. Terminale pasirašome npm install nodemon
// 2. prisidedame į package.json failą scripts skiltį naują skriptą "dev": "nodemon index.js"
// 3. leidžiama aplikaciją terminale su komanda "npm run dev", run reikalingas, nes komanda sukurta mūsų, o ne sistemiška

const express = require("express");
const cors = require("cors");
const port = 3000;

const app = express();
app.use(express.json());
app.use(cors());

const users = ["labas naujas tekstas"];

app.get("/", (req, res) => {
  res.send(users);
  // res.send([{ id: 3, name: "Tomas" }]);
});

app.post("/", (req, res) => {
  // pasirenku POST iš sąrašo
  // spaudžiam "Body" skiltį
  // renkames "raw", bei pasirenkam JSON iš Text (mėlynas textas)
  // JSON formatas:
  // {
  //     "id": 2,
  //     "name": "Tomas"
  // }
  const user = req.body;
  users.push(user);
  res.send(user);
});

app.listen(port, () => console.log(`Server started on port ${port}...`));
