fetch('http://localhost:3000/products') // istraukiami suvesti duomenys ir atvaiduoti kaip lista
.then((resp) => resp.json()) // istrauktus duomenis paverciame i JSON formata
.then((response) => {
    const productList = document.querySelector('ul');// response istraukia UL produktu lista kuris bus suvestas  - [juice ,bread].forEach(product => {})

    response.forEach((product) => {
        const li = document.createElement("li"); //sukuriamas elementas kai vedamas naujas produktas
        li.textContent = `${product.name} - ${product.price}`; // sukurtam elementui priskiriamas tekstas
        productList.append(li); // sukurtas elementas apndinamas i product lista. kai yra paprastas elementas naudojame append kad pridetu nauja sukurta elementa i pati gala, kitu atveju JAVACRIPT reiketu naudoti PUCH
    });
});

const button = document.querySelector('#productButton'); // mugtukas naudojamas prideti sukurta nauja elementa
button.addEventListener('click', () => {
    const product = document.querySelector("input[name = 'product']").value; // istraukiama produkto reiksm4 is input langelio kai nuspaudziamas "click" ir padaromas fetchas i musu serveri per POST metoda
    const price = document.querySelector("input[name='price']").value;

// prideti nauja duomeni i serveri
// fetch(serverio URL, papildomi parametrai) <- struktura
// papildomi parametrai - tai parametru objektas, kuris nusako esybes apie musu kreipimasi
//esubes: method, headers, body
//method - kreipimosi metodas, gali buti pvz: post, put, delete, get - (defaultiniai) 
//headers - objektas {....}, gali buti {'Content-type':'application/json'} - nurodo kad siunciami duomenys yra JSON formatu
//body - musu siunciami duomenys reikia prideti JSON.stringify(data tam kad serveris suprastu siunciamus duomens), butinai turi buti JSON formatu, arba JAVASCRIPT object pvs: {name: "Tomas", surname: "Vasiljevas"}

    fetch("http://localhost:3000/products", { 
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        }, //POST metodas su papildoma informacija kad musu serveris suprastu jog pateikiami duomenys yra JSON formatu

        body: JSON.stringify({name: product, price: price}), // pagrindine duomenu dalis su papildoma stringify funkcija kad beckend suprastu kokie duomenys pateikiami - string 
    })
        //.then((resp) => resp.json())
        .then(() => {
            //console.log(responce); 
            //.then() kai kvietimas buna ivykdytas atlieka .then( dali)
            //.then(response) - responce dalis, tai kas grizta is serverio is res.send()

        location.reload(); // perkrauna puslapi
    });
});