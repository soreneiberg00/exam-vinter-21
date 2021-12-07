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


