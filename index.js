const express = require("express");
const cors = require("cors");
const FileAsync = require("lowdb/adapters/FileAsync");
const dotenv = require("dotenv");
const lowdb = require("lowdb");
const lodashId = require("lodash-id");

// Models
const Models = require("./models");

const adapter = new FileAsync("./db/db.json");
let dbConnection = lowdb(adapter);

dbConnection.then(db => {
	db._.mixin(lodashId);

	db.defaults({ markers: [], position: {}, count: 0 })
		.write()
		.then(() => {
			dotenv.config();
			const serverPort = process.env.SERVER_PORT || 3001;

			Models.init(db);
			console.log(">>> Connected to file database");
			const app = Server();

			app.use("/", Router());

			app.listen(serverPort, err => {
				if (err) throw err;
				console.log(">>> Express listening on port", serverPort);
			});
		});
});
const Server = () => {
	const app = express();

	app.use(require("body-parser").json({ limit: "10mb" }));
	app.use(cors());
	return app;
};

const Router = () => {
	const router = express.Router();

	router.use("/api/v1", require("./controllers/markers"));

	return router;
};
