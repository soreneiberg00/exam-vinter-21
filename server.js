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



