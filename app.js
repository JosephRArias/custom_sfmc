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

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

app.post("/execute", async (req, res) => {
  request = req.body;
  console.log(request);
  sendTokenRequest((response) => {
    token = response;
    getInArgumentRequest((inArgument) => {
      IdOT = inArgument;
      sendAppointmentConfirmationRequest((response) => {
        confirmacion = response;
        if (confirmacion == 0) {
          return res.status(200).send({
            confirmacion: confirmacion,
            branchResult: "confirmada",
          });
        } else {
          return res.status(200).send({
            confirmacion: confirmacion,
            branchResult: "no confirmada",
          });
        }
      });
    });
  });
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

const sendTokenRequest = async (token) => {
  try {
    const response = await axios
      .post(
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
      )
      .then((res) => {
        token(res.data["access_token"]);
      });
  } catch (err) {
    // Handle Error Here
    console.log(err);
  }
};
const getInArgumentRequest = async (inArgument) => {
  if (request && request.inArguments) {
    for (let i = 0; i < request.inArguments.length; i++) {
      let e = request.inArguments[i];
      if ("OrdenTrabajo" in e && e["OrdenTrabajo"] != undefined) {
        inArgument(e["OrdenTrabajo"]);
      }
    }
  } else {
    inArgument(0);
  }
};

const sendAppointmentConfirmationRequest = async (confirmacion) => {
  axios
    .put(
      appointmentURL,
      {
        IdOT: IdOT,
        Confirmacion: "1",
        IdDespacho: "2213858",
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    )
    .then((res) => {
      console.log(res.data);
      confirmacion(res.data["result"]);
    });
};
module.exports = app;
