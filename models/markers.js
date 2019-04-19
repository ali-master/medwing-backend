const R = require("ramda");
const uuidv4 = require("uuid/v4");

module.exports = function(db) {
	const vm = {
		/**
		 * Yields all saved markers list
		 */
		get() {
			return new Promise(resolve => {
				const cursor = db.get("markers").value();

				resolve({
					Total: cursor.length,
					Result: cursor,
				});
			});
		},
		/**
		 * Find marker by id
		 * @param {Number} id
		 * @returns {Promise}
		 */
		find(id) {
			return new Promise(resolve => {
				const cursor = db
					.get("markers")
					.find({ id })
					.value();

				resolve({
					Result: cursor,
				});
			});
		},
		/**
		 * Create a new marker
		 * @param {Object} marker marker object
		 * @returns {Promise}
		 */
		add(marker) {
			return new Promise((resolve, reject) => {
				marker = R.merge(marker)({ id: uuidv4() });
				const cursor = db
					.get("markers")
					.push(marker)
					.write();

				return cursor
					.then(() => {
						resolve(marker);
					})
					.catch(error => {
						reject({
							code: "EXEPTION",
							inner_exeption: error,
						});
					});
			});
		},
		/**
		 * Update marker by id
		 * @param {Number} id marker id
		 * @param {Object} restFields object of marker fields with new values
		 * @returns {Promise}
		 */
		update(id, restFields) {
			return new Promise((resolve, reject) => {
				vm.find(id).then(({ Result }) => {
					if (!Result) {
						return reject({
							code: "NOT_FOUND",
							msg:
								"A similar marker with the requested ID does not exist.",
						});
					}

					const cursor = db
						.get("markers")
						.find({ id })
						.assign(R.omit(["id"])(restFields))
						.write();

					cursor
						.then(Result => {
							resolve({
								Result,
							});
						})
						.catch(error => {
							reject({
								code: "EXCEPTION",
								msg: "Can't update the requested marker",
								inner_exeption: error,
							});
						});
				});
			});
		},
		/**
		 * Delete a marker by id
		 * @param {Number} id
		 * @returns {Promise}
		 */
		delete(id) {
			return new Promise(resolve => {
				const cursor = db
					.get("markers")
					.remove({ id })
					.write();

				cursor
					.then(Result => {
						resolve({
							Result,
						});
					})
					.catch(error => {
						reject({
							code: "EXCEPTION",
							msg: "Can't delete the requested marker",
							inner_exeption: error,
						});
					});
			});
		},
	};

	return vm;
};
