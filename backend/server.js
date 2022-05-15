const express = require("express");
const cors = require("cors");
const path = require('path');
const fs = require('fs');

const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

writeENV();

app.use(express.static(__dirname.replace(/\\/g, "/") + '/view/dist/frontend'));

app.use(cors())

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Geology Ontario Portal NodeJS API" });
});

const routes = require("./app/route/geo.routes.js")(app);

function writeENV() {
if (process.env.NODE_ENV) {
      let content = "(function (window) {" +
          "window.__env = window.__env || {};" +
          "window.__env.SERVER_URL = '" + process.env.SERVER_URL + "';" +
          "}(this));"
      fs.writeFile(path.join(__dirname.replace(/\\/g, "/"), '/view/dist/frontend/assets/environments/env.js'), content, (err) => {
          if (err) throw err;
          console.log('SERVER_URL :', process.env.SERVER_URL)
          console.log('Successfully saved env.js file.');
      });
  }
}

app.use(sendSpaFileIfUnmatched);

function sendSpaFileIfUnmatched(req, res) {
    res.sendFile("/view/dist/frontend/index.html", { root: '.' });
}

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
