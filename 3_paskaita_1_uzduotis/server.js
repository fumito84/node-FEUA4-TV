const express = require ("express"); //express importas
const cors = require("cors"); // cors importas
const app = express(); //express aplikacijos inicijavimas

app.use(express.json()); // aplikacija priima duomanis JSON formatu
app.use(cors());// aplikacija naudoja CORS apsauga

const users = [];

app.get("/", (req, res) => {
    res.send("3 paskaita: uzduotis regisrtuoti vartotoja");
});

app.get("/users", (req, res) => {
    //res (response)  - duomenys kuriuos mes graziname
    res.send(users);
    //res.send() - metodas kuris grazina klientui atsakyma
});

app.post("/users", (req, res) => {
    // req (request) - duomenys kuriuos mes gauname is isores
    // req.body - pagrindiniai duomenys is isores
    const user = {
        password: req.body.password,
        email: req.body.email,
        firstname: req.body.firstname,
        surname: req.body.surname,
        address: req.body.address,
        postcode: req.body.postcode,
        city: req.body.city,
        phone: req.body.phone,
        isAgreement: req.body.isAgreement,
    };
    users.push(user);
    res.send(users);
    //POST dalyje siunciam atgal klientui tai ka jis pats atsiunte mums
});

app.post("/login", (req, res) => {
    // req.body = {email: "rokas@gmail.com", password: "rokas123"}
    //
    let foundedUser = users.find((user) => user.email === req.body.email);
    // jeigu randa foundedUser = {email: "rokas@gmail.com", password: "rokas123", ...}
    // jeigu neranda foundedUser = undefined
    if (foundedUser !== undefined) {
      // rado
      let submittedPassword = req.body.password; // test
      let storedPassword = foundedUser.password; // test
      // test === test
      // rokas123 === rokas123!
      if (submittedPassword === storedPassword) {
        res.send({ message: "Sekmingai prisijungete", approved: true });
      } else {
        res.send({ message: "Neteisingas slaptažodis", approved: false });
      }
    } else {
      // nerado
      res.send({
        message: "Neteisingas el. paštas",
        approved: false,
      });
    }
  });

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on the ${port}`);
});