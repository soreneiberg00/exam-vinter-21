const express = require('express');
const app = express();
const fs = require("fs");
//Jeg henter form-data, som benyttes til at lave en ny bruger
const formData = require('express-form-data');

//Jeg definerer de stier hvor app'en skal køre
app.use(express.static("./front"));
app.use(express.static("./products"));
app.use(express.static("./users"));
app.use('/', express.static('products'));

app.use(express.json())


//Starter serveren
app.listen(3000, () => {
    console.log('Server is listning on port 3000')
})


//Opret ny bruger
app.post("/newuser", (req, res) => {

    //Jeg henter de eksisterende brugere som et array
    let userArray = JSON.parse(fs.readFileSync('databases/users.json'))

    //Jeg tilføjer dataene fra requesten til arrayet
    userArray.push(req.body)

    //Jeg sender det opdaterede array retur til databasen som json
    fs.writeFile('databases/users.json', JSON.stringify(userArray, null, 4), err => {
        if(err) res.send(err)

        //Sender succes tilbage til klienten
        res.send({
            msg: "Success"
        })
    
    })
    
});

//Log-in side
app.post("/login", (req, res) => {
    //Jeg henter de eksisterende brugere som et array
    existingUser = JSON.parse(fs.readFileSync('databases/users.json'));

    //Der oprettes et for-loop
    for(let i = 0; i < existingUser.length; i++) {

        //Hvis et brugernavn i databasen, er det samme som det i requesten, tjekkes der bagefter for om det også er den samme adgangskode
        if(existingUser[i].username == req.body.username) {
            if(existingUser[i].password == req.body.password) {
                
                //Hvis både brugernavn og adgangskode matcher en bruger fra databasen, sendes en succes retur
                res.status(200).send(true);
            } else {
                //Ellers sendes der en fejl retur
                res.status(400).send(false);
            }
        } else {
            res.status(404).send(false)
        }
    }
});

// Opdatere en eksisterende bruger

app.put("/updateuser", (req, res) => {
    //Jeg henter de eksisterende brugere som et array
    let userArray = JSON.parse(fs.readFileSync('databases/users.json'))

    //Der oprettes et for-loop
    for(let i = 0; i < userArray.length; i++) {
        
        //Hvis brugernavnet i requesten, matcher et brugernavn i databasen, opdateres adgangskoden med dataen fra requesten 
        if(userArray[i].username == req.body.username) {

           userArray[i].password = req.body.password,

           //Det opdaterede array, sendes tilbage til databasen i json-format
            fs.writeFile('databases/users.json', JSON.stringify(userArray, null, 4), err => {
                if(err) res.send(err)

                //Der sendes en succes til klienten
                res.status(200).json({
                    msg: "Success"
                })
            })
        }
    
    }
    
});

//Slet bruger
app.delete("/deleteuser/:username", (req, res) => {
    //Jeg henter de eksisterende brugere som et array
    let userArray = JSON.parse(fs.readFileSync('databases/users.json'))

    //Der oprettes et for-loop
    for(let i = 0; i < userArray.length; i++) {
        
        //Hvis brugernavnet i parametret, matcher et brugernavn i databasen, slettes brugeren fra arrayet, ved hjælp af splice
        if(userArray[i].username == req.params.username) {

            userArray.splice(i, 1)

            //Det opdaterede array, sendes tilbage til databasen i json-format
            fs.writeFile('databases/users.json', JSON.stringify(userArray, null, 4), err => {
                if(err) res.send(err)

                //Der sendes en succes til klienten
                res.status(200).json({
                    msg: "Success"
                })
            })
        }
    
    }
})


//Laver opsætning til at kunne oprette produkter
//Mappe som billederne skal kunne gemmes i og hentes fra
app.use('/databasePictures',  express.static('databasePictures'));

//Jeg definerer den mappe billederne skal gemmes i
const options = {
    uploadDir: './databasePictures'
};

// Benytter formData og express til at gemme billederne i "databasePictures"-mappen
app.use(formData.parse(options));

//Jeg henter de eksisterende produkter som et array
let productArray = JSON.parse(fs.readFileSync('databases/products.json'))

app.post('/createproduct', (req, res) => {

    //Værdierne i requesten defineres
    let title = req.body.title
    let category = req.body.category
    let price = req.body.price
    let username = req.body.username

    //Stien for hvor billedet kan findes defineres ligeledes, men kun stien og ikke selve billedet
    let picturePath = req.files.picture.path.replace('\\', '/');

    //Det nye produkt tilføjes til det array, der er hentet fra databasen
    productArray.push({title, category, price, picturePath, username})
    
    //Proudukterne i arrayet overskriver filen i databasen, med den nye vare tilføjet
    fs.writeFile('databases/products.json', JSON.stringify(productArray, null, 4), err => {
        if(err) res.send(err)

        //Brugeren dirigeres tilabge til forsiden
        res.redirect("http://localhost:3000/home.html");

    })
})

//Opdater eksisterende produkt
app.put("/updateproduct", (req, res) => {

    //Jeg henter de eksisterende produkter som et array
    let productArray = JSON.parse(fs.readFileSync('databases/products.json'))

    //Der oprettes et for-loop
    for(let i = 0; i < productArray.length; i++) {
        
        //Hvis der er et produkt med den titel, der er modtaget i requesten fortsætter funktionen
        if(productArray[i].title == req.body.title) {

            //Kategori og pris opdateres for det givne produkt
            productArray[i].category = req.body.category,
            productArray[i].price = req.body.price

            // Arrayet med det opdaterede produkt overskriver filen i databasen
            fs.writeFile('databases/products.json', JSON.stringify(productArray, null, 4), err => {
                if(err) res.send(err)

                //Klienten modtager et succes-response 
                res.status(200).json({
                    msg: "Success"
                })
            })
        }
    
    }
    
});

app.delete("/deleteproduct/:title", (req, res) => {

    //Jeg henter de eksisterende produkter som et array
    let productArray = JSON.parse(fs.readFileSync('databases/products.json'))

    //Der oprettes et for-loop
    for(let i = 0; i < productArray.length; i++) {
        
        // Funktionen fortsætter hvis parametret i requesten matcher en produkt i arrayet
        if(productArray[i].title == req.params.title) {

            //Hvis der er et match slettes produktet fra arrayet
            productArray.splice(i, 1)

            // Et array uden det slettede produkt overskriver filen i databasen
            fs.writeFile('databases/products.json', JSON.stringify(productArray, null, 4), err => {
                if(err) res.send(err)

                //Klienten modtager et succes-response 
                res.status(200).json({
                    msg: "Success"
                })
            })
        }
    }
})


// Se alle produkter til salg
app.get("/products", (req, res) => {

    //Jeg henter de eksisterende produkter som et array
    let productArray = JSON.parse(fs.readFileSync('databases/products.json'))

    //Arrayet sendes til klienten
    res.json(productArray)
})


//GET-request for en specifik kategori

app.get("/products/:category", (req, res) => {

    //Jeg henter de eksisterende produkter som et array
    let productArray = JSON.parse(fs.readFileSync('databases/products.json'));

    //Jeg opretter et tomt array, til de produkter, der skal sendes til klienter
    let productCategory = [];
    
    //Der oprettes et for-loop
    for(let i = 0; i < productArray.length; i++) {

        //Hvis kategorien på et produkt, matcher kategorien i parametret skal funktionen fortsætte
        if(productArray[i].category == req.params.category) {

            // Produkter med den relevante kategori skal tilføjes til det tomme array
            productCategory.push(i)

            //Produkterne med den relevante kategori sendes tilbage til klienten
            res.json(productCategory)
        } else {
            res.send("Could not provide categories at the moment")
        }
    }
})

// Get-request for et bestemt username
app.get("/products/:username", (req, res) => {

    //Jeg henter de eksisterende produkter som et array
    let productArray = JSON.parse(fs.readFileSync('databases/products.json'));

    //Jeg opretter et tomt array, til de produkter, der skal sendes til klienter
    let productPerUser = [];
    
    //Der oprettes et for-loop
    for(let i = 0; i < productArray.length; i++) {

        //Hvis brugernavnet tilhørende et produkt, matcher brugernavnet i parametret skal funktionen fortsætte
        if(productArray[i].username == req.params.username) {

            // Produkter med det relevante brugernavn, skal tilføjes til det tomme array
            productPerUser.push(i)

            //Produkterne med det relevante brugernavn sendes tilbage til klienten
            res.json(productPerUser)
        } else {
            res.send("Could not provide categories at the moment")
        }
    }
})



//Jeg exporterer "app" så den kan bruges til testing
module.exports = app;