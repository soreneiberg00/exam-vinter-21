const express = require('express');
const app = express();
const fs = require("fs");




app.use(express.static("./front"));
app.use(express.static("./products"));
app.use(express.static("./users"));


app.use(express.json())

//Starter serveren
app.listen(3000, () => {
    console.log('Server is listning on port 3000')
})


//Opret ny bruger
app.post("/newuser", (req, res) => {

    let userArray = JSON.parse(fs.readFileSync('databases/users.json'))

    userArray.push(req.body)

    fs.writeFile('databases/users.json', JSON.stringify(userArray, null, 4), err => {
        if(err) res.send(err)

        res.send({
            msg: "Success"
        })
    
    })
    
});

//Log-in side
app.post("/login", (req, res) => {

    existingUser = JSON.parse(fs.readFileSync('databases/users.json'));

    for(let i = 0; i < existingUser.length; i++) {

        if(existingUser[i].username == req.body.username) {
            if(existingUser[i].password == req.body.password) {

                res.status(200).send(true);
            } else {
                res.status(400).send(false);
            }
        }
    }
});


//Delete User
app.delete("/deleteuser/:username", (req, res) => {

    let userArray = JSON.parse(fs.readFileSync('databases/users.json'))

    for(let i = 0; i < userArray.length; i++) {
        
        if(userArray[i].username == req.params.username) {

            userArray.splice(i, 1)

            fs.writeFile('databases/users.json', JSON.stringify(userArray, null, 4), err => {
                if(err) res.send(err)

                res.status(200).json({
                    msg: "Success"
                })
            })
        }
    
    }
})


app.post('/createproduct', (req, res) => {

    let title = req.body.title
    let category = req.body.category
    let price = req.body.price

    let picturePath = req.files.picture.path.replace('\\', '/');

    //Det nye produkt tilføjes til det array, der er hentet fra databasen
    productArray.push({title, category, price, picturePath})
    
    //Proudukterne overskriver filen i databasen, med den nye vare tilføjet
    fs.writeFile('databases/products.json', JSON.stringify(productArray, null, 4), err => {
        if(err) res.send(err)

        //Brugeren dirigeres tilabge til forsiden
        res.redirect("http://localhost:3000/home.html");

    })
})


app.delete("/deleteproduct/:title", (req, res) => {

    let productArray = JSON.parse(fs.readFileSync('databases/products.json'))

    for(let i = 0; i < productArray.length; i++) {
        
        if(productArray[i].title == req.params.title) {

            productArray.splice(i, 1)

            fs.writeFile('databases/products.json', JSON.stringify(productArray, null, 4), err => {
                if(err) res.send(err)

                res.status(200).json({
                    msg: "Success"
                })
            })
        }
    }
})


