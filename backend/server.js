const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyparser = require("body-parser");
const cookieParser = require("cookie-parser");

require("dotenv").config(); // config file -> sensitive information for DB connection & user auth
const MONGO_URI = process.env.MONGO_URI; //connection string to mongo on the backend

//Requiring our different routes/endpoints
const rhymes = require("./routes/api/rhymes");
const users = require("./routes/api/users");  

const app = express(); // opens the connection

//App use
app.use(cors()); // Web policy so you restrict/allow the amount of resources from different ports (frontend/backend)
app.use(express.json());
app.use(bodyparser.urlencoded({ extended: false, strict: false }));
app.use(bodyparser.json());
app.use(cookieParser());
//Using our main routes
app.use("/api/rhymes", rhymes);
app.use("/api/users", users);

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }) //Connecting to MongoDB
  .then(() => {
    console.log("MongoDB Successfully Connected");
  })
  .catch((err) => console.log(err)); //flags for how connection should work

app.get("/", (req, res) => {
  res.status(200).send("BACKEND#SERVER: Server works"); //test server connection has been set up
});

const port = process.env.PORT || 5000; //typical backend port number, constant that we use in ENV file. In case our one port fails
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`); //checks port is being used
});
