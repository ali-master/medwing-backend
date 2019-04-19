const express = require("express");
const Markers = require("../models").model("Markers");

const router = express.Router();

/**
 * Yields all markers list
 */
router.get("/markers", (req, res) => {
	Markers.get().then(({ Result }) => {
		res.json({ Success: true, Result });
	});
});

/**
 * Find a specific marker by id
 */
router.get("/marker/:id", (req, res) => {
	const { id } = req.params;
	Markers.find(id).then(({ Result }) => {
		res.json({ Success: true, Result });
	});
});

/**
 * Add a new marker
 */
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

/**
 * Update a marker by id
 */
router.put("/marker/:id", (req, res) => {
	const { id: markerId } = req.params;

	Markers.update(markerId, req.body)
		.then(({ Result }) => {
			res.json({ Success: true, Result });
		})
		.catch(error => {
			res.status(400).json(error);
		});
});

/**
 * Delete a marker by id
 */
router.delete("/marker/:id", (req, res) => {
	const { id: markerId } = req.params;

	Markers.delete(markerId)
		.then(({ Result }) => {
			res.json({ Success: true, Result });
		})
		.catch(error => {
			res.status(400).json(error);
		});
});

module.exports = router;
