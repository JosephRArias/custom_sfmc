var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
let axios = require('axios');

var indexRouter = require("./routes/index");

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

app.post("/execute", (req, res) => {

    retrieveToken();
});

function retrieveToken() {
  axios
    .post(tokenURL, {
      // Retrieving of token

      username: "emilys",
      password: "emilyspass",
    })
    .then(function (response) {
      console.log("Auth");
      console.log(response);
      return response.data["access_token"];
    })
    .catch(function (error) {
      return error;
    });
}

module.exports = app;
