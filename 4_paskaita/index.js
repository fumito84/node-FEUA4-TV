const express = require ("express"); //express importas
const cors = require("cors"); // cors importas
const app = express(); //express aplikacijos inicijavimas

app.use(express.json()); // aplikacija priima duomanis JSON formatu
app.use(cors());// aplikacija naudoja CORS apsauga

const port = 3000; //kanalas reikalingas serveriui

const cars = {
    bmw: ["i3", "i8", "i6"],
    mb: ["a class", "C class", "e class"],
    vw: ["golf", "arteon", "up"],
};





// dinaminis linkas, kuris prasideda dvitaskiu - :
app.get("/cars/:model", (req, res) => {
    // req.params - siunciamo request parametrai
    // jie norime pasiekti dinamini linka turime naudoti toki pati pavadinima. PVZ - :model butu req.params.model
    const model = req.params.model; // model = bmw
    
    res.send(cars[model]); // dinamiskai istraukti duomenys
});

app.listen(port, () => {
    console.log(`Server is running on the ${port}`);
});