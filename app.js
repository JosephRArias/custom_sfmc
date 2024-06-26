var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
const querystring = require("querystring");
let axios = require("axios");

var indexRouter = require("./routes/index");
var tokenURL = process.env.authenticationURL;
var user = process.env.username;
var pass = process.env.password;
var appointmentURL = process.env.confirmAppointmentURL;
var token;
var IdOT;
var confirmacion;
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
  IdOT = getInArgument("IdOT");
  confirmAppointment(IdOT);
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

async function retrieveToken() {
  const response = await axios.post(
    tokenURL,
    // Retrieving of token
    querystring.stringify({ grant_type: "client_credentials" }),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Basic xxxx",
      },
      auth: {
        username: user,
        password: pass,
      },
    }
  );
  token = response.data["access_token"];
}
function getInArgument(k) {
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

async function confirmAppointment(IdOt) {
  const response = await axios
    .put(
      appointmentURL,
      {
        IdOt: IdOt,
        Confirmacion: "1",
        IdDespacho: "2213858",
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    console.log("Appointment confirmed!");
    console.log(response.data["result"]);
    confirmacion = response.data["result"];
    return response.data["access_token"];
}
module.exports = app;
