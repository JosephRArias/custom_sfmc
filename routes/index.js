'use strict';

// Deps
var activity = require("../js/customActivity");
var express = require('express');
var router = express.Router();

/*
 * GET home page.
 */
exports.index = function(req, res) {
	retrieveToken();
		res.render("index", {
			title: "Journey Builder Activity Render"
		});
};
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

module.exports = router;