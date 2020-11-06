const express = require("express");//requires 
const cors = require("cors");
const mongoose = require("mongoose");

// require('dotenv').config(); // config file -> sensitive information, hash or salt password, 

const app = express(); // opens the connection
const port = 5000 //|| process.env.PORT; //typical backend port number, constant that we use in ENV file. In case our one port fails

app.use(cors()); // web policy so you restrict the amount of resources from different ports (frontend/backend)
app.use(express.json()); // calls a function that imports the express library of json so that we can read json objects through express

//const MONGO_URI = process.env.MONGO_URI; //connection string to mongo on the backend

mongoose.connect('mongodb+srv://grhymer:ghostr@cluster0.rr0ll.mongodb.net/ghostrhymer?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=> {console.log("MONGO DB SUCCESSFULLY CONNECTED")})
    .catch((err) => console.log(err)); //flags for how connection should work

app.get('/', (req,res) => {
    res.send("hello world"); //test server connection has been set up
});

app.listen(port, () =>
{
    console.log(`Example app listening at http://localhost:${port}`
    ); //checks port is being used
});

