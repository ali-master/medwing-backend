const express = require("express");
const Markers = require("../models").model("Markers");

const router = express.Router();

router.get("/markers", (req, res) => {
	Markers.get().then(Result => {
		res.json({ Success: true, Result });
	});
});

router.get("/marker/:id", (req, res) => {
	const { id } = req.params;
	Markers.find(id).then(({ Result }) => {
		res.json({ Success: true, Result });
	});
});

router.post("/marker", (req, res) => {
	const { id, title, description, lat, lng } = req.body;
	Markers.add({ id, title, description, lat, lng })
		.then(Result => {
			res.json({ Success: true, Result });
		})
		.catch(error => {
			res.status(400).json(error);
		});
});

router.put("/marker/:id", (req, res) => {
	const { id: markerId } = req.params;

	Markers.update(markerId, req.body)
		.then(Result => {
			res.json({ Success: true, Result });
		})
		.catch(error => {
			res.status(400).json(error);
		});
});

module.exports = router;
