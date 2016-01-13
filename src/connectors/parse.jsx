var Parse = require('parse');

/**
 * Field transforms this connector must handle
 * TODO this should be moved to the ParseConnector instance probably
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

		/**
		 * Ignored fields for this connector, in the forms
		 */
		this.ignoreFields = ['createdAt', 'updatedAt', 'objectId'];

		Parse.initialize(
			this.config.appId,
			this.config.javascriptKey
		);
	}

	/**
	 * Set the primary key on the data
	 * @param {Object} data
	 * @return {Object}
	 */
	setPrimaryKey (data) {
		data.id = data.objectId;
		delete data.objectId;
		return data;
	}

	/**
	 * Connector handling of field transforms
	 * @param {String/Object} val
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
			success: results => {
				callback(null, results);
			},
			error: (obj, error) => {
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
			success: results => {
				results.destroy({
					success: obj => {
						callback(null, obj);
					},
					error: (obj, error) => {
						callback(error, null);
					}
				});
			},
			error: (obj, error) => {
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
				callback(null, results.map(row => {
					return this.setPrimaryKey(row.toJSON())
				}));
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
			success: results => {
				callback(
					null,
					this.setPrimaryKey(results.toJSON())
				);
			},
			error: (obj, error) => {
				callback(error, null);
			}
		});
	}

	/**
	 * Login
	 * @param  {String}   username
	 * @param  {String}   password
	 * @param  {Function} callback
	 */
	login (username, password, callback) {
		Parse.User.logIn(username, password, {
			success: function(user) {
				if (callback) {
					callback(null, { success: true });
				}
			},
			error: function(user, error) {
				if (callback) {
					callback(error, null);
				}
			}
		});
	}

	/**
	 * Log current user out
	 */
	logout () {
		Parse.User.logOut();
	}

	/**
	 * Returns the current logged in user object
	 * @return {Object}
	 */
	currentUser () {
		return Parse.User.current();
	}
}

module.exports = ParseConnector;
