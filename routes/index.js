'use strict';

// Deps
var activity = require("../js/customActivity");
var express = require('express');
var router = express.Router();

/*
 * GET home page.
 */
exports.index = function(req, res) {
		res.render("index", {
			title: "Journey Builder Activity Render"
		});
};

module.exports = router;