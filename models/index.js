const R = require("ramda");

const models = {};

const init = db => {
	models.Markers = require("./markers")(db);
};

module.exports = {
	init,
	model: name => R.path([name])(models),
};
