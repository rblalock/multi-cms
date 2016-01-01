var Parse = require('parse');

/**
 * @class ParseConnector
 */
class ParseConnector {
	constructor (config) {
		this.config = config;

		Parse.initialize(
			this.config.appId,
			this.config.javascriptKey
		);
	}

	create (dataObject, options, callback) {
		var PObject = Parse.Object.extend(dataObject);
		var model = new PObject();

		for (var prop in options) {
			model.set(prop, options[prop]);
		}

		model.save(null, {
			success: function (results) {
				callback(null, results);
			},
			error: function (obj, error) {
				callback(error, null);
			}
		});
	}

	deleteObject (dataObject, id, callback) {
		var PObject = Parse.Object.extend(dataObject);
		var PQuery = new Parse.Query(PObject);

		PQuery.get(id, {
			success: function (results) {
				results.destroy({
					success: function (obj) {
						callback(null, obj);
					},
					error: function (obj, error) {
						callback(error, null);
					}
				});
			},
			error: function (obj, error) {
				callback(error, null);
			}
		});
	}

	query (dataObject, options, callback) {
		var PObject = Parse.Object.extend(dataObject);
		var PQuery = new Parse.Query(PObject);

		PQuery.descending('createdAt');

		PQuery.find({
			success: results => {
				callback(null, results.map(function (row) { return row.toJSON() }));
			},
			error: (obj, error) => {
				callback(error, null);
			}
		});
	}

	findOne (dataObject, id, callback) {
		var PObject = Parse.Object.extend(dataObject);
		var PQuery = new Parse.Query(PObject);

		PQuery.get(id, {
			success: function (results) {
				callback(null, results.toJSON());
			},
			error: function (obj, error) {
				callback(error, null);
			}
		});
	}
}

module.exports = ParseConnector;
