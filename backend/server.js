const express = require("express"); //requires
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config(); // config file -> sensitive information, hash or salt password,

const rhymes = require("./routes/api/rhymes");

const app = express(); // opens the connection
const port = process.env.PORT || 5000; //typical backend port number, constant that we use in ENV file. In case our one port fails

app.use(cors()); // Web policy so you restrict the amount of resources from different ports (frontend/backend)
app.use(express.json()); // calls a function that imports the express library of json so that we can read json objects through express

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`); //checks port is being used
});

const MONGO_URI = process.env.MONGO_URI; //connection string to mongo on the backend

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })

  .then(() => {
    console.log("MongoDB Successfully Connected");
  })

  .catch((err) => console.log(err)); //flags for how connection should work

app.get("/", (req, res) => {
  res.send("BACKEND#SERVER: Server works"); //test server connection has been set up
});

app.use("/api/rhymes", rhymes);
