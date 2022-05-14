const express = require("express");

const app = express();

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const cors = require('cors');
app.use(cors())

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Geology Ontario Portal." });
});

const routes = require("./app/route/geo.routes.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
