var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
const querystring = require("querystring");
let axios = require("axios");

var indexRouter = require("./routes/index");
var tokenURL = "https://dummyjson.com/auth/login";

var request;
var eventDefinitionKey;

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

app.post("/execute", (req, res) => {
  request = req.body;
  retrieveToken();
  getInArgument('FirstName');
});
app.post("/save", function (req, res) {

  return res.status(200).json({});
});

app.post("/validate", function (req, res) {
  return res.status(200).json({});
});

app.post("/publish", function (req, res) {
  return res.status(200).json({});
});


function retrieveToken() {
  axios
    .post(tokenURL, {
      // Retrieving of token

      username: "emilys",
      password: "emilyspass",
    })
    .then(function (response) {
      return response.data["access_token"];
    })
    .catch(function (error) {
      return error;
    });
}
function getInArgument(k) {
  console.log(request.inArguments);
  if (request && request.inArguments) {
      for (let i = 0; i < request.inArguments.length; i++) {
          let e = request.inArguments[i];
          if (k in e) {
              return e[k];
          }
      }
  }
  console.log("Unable To Find In Argument: ", k);
  return;
}
module.exports = app;
