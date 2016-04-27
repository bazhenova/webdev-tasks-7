'use strict';

const path = require('path');
const html = path.join(__dirname, 'public/index.html');

exports.index = (req, res) => {
	res.sendFile(html);
};

exports.error404 = (req, res) => {
    res.status(404).send("Not found.");
};
