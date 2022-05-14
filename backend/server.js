const express = require("express");
const app = express();
const bodyParser = require("body-parser");
// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname.replace(/\\/g, "/") + '/view/dist/frontend'))

const cors = require('cors');
app.use(cors())

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Geology Ontario Portal NodeJS API" });
});

const routes = require("./app/route/geo.routes.js")(app);

app.use(sendSpaFileIfUnmatched);

function sendSpaFileIfUnmatched(req, res) {
    res.sendFile("/view/dist/frontend/index.html", { root: '.' });
}

// set port, listen for requests
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
