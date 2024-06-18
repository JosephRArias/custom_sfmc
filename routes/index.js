'use strict';

// Deps
var activity = require("../js/customActivity");

/*
 * GET home page.
 */
exports.index = function(req, res) {

		res.render("index", {
			title: "Journey Builder Activity"
		});
};

exports.login = function(req, res) {
	console.log("req.body: ", req.body);
	res.redirect("/");
};

exports.logout = function(req, res) {
	req.session.token = "";
};