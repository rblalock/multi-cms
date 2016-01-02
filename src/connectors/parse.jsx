var Parse = require('parse');

/**
 * Field transforms this connector must handle
 * @type {Object}
 */
var fieldTypeTransforms = {
	'Date': function (val, transform) {
		var value = val.iso;

		if (transform) {
			value = transform(value);
		}

		return value;
	},
	File: function (val) {
		var value = val.url;
		return value;
	},
	Boolean: function (val) {
		return (val) ? 'checked' : '';
	}
};

/**
 * @class Connector.ParseConnector
 */
class ParseConnector {
	constructor (config) {
		this.config = config;

		Parse.initialize(
			this.config.appId,
			this.config.javascriptKey
		);
	}

	/**
	 * Connector handling of field transforms
	 * @param {String} val
	 * @param {Function} transform
	 * @returns {*}
	 */
	fieldTypeTransform (val, transform) {
		if (val && typeof val === 'object' && val.__type && fieldTypeTransforms[val.__type]) {
			return fieldTypeTransforms[val.__type](val, transform);
		} else {
			return val;
		}
	}

	/**
	 * Create record
	 * @param {String} dataObject
	 * @param {Object} options
	 * @param {Function} callback
	 */
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

	/**
	 * Delete record
	 * @param {String} dataObject
	 * @param {String} id
	 * @param {Function} callback
	 */
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

	/**
	 * Query records
	 * @param {String} dataObject
	 * @param {Object} options
	 * @param {Function} callback
	 */
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

	/**
	 * Find record
	 * @param {String} dataObject
	 * @param {String} id
	 * @param {Function} callback
	 */
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
