module.exports = {
	/**
	 * Filter out ignored fields
	 * @param {Object} data
	 * @param {Object} connector
	 * @return {Object}
	 */
	filterIgnoredFields: function (data, connector) {
		connector.ignoreFields.forEach(function (item) {
			if (data && data[item]) {
				delete data[item];
			}
		});

		// Always remove ID
		if (data.id) {
			delete data.id;
		}

		return data;
	},
	/**
	 * General field transform provided by connector
	 * @param {Array} data
	 * @param {Connector} connector
	 * @param {Object} fieldModels
	 * @returns {Array}
	 */
	fieldTransform: function (data, connector, fieldModels) {
		var transformedData = [];

		// When there is no data, we still return the structure of the fields
		if (data.length == 0) {
			var obj = {};

			for (var prop in fieldModels) {
				obj[prop] = connector.fieldTypeTransform(null, null);
			}

			transformedData = [obj];
		} else {
			transformedData = data.map(row => {
				var obj = {};

				for (var prop in row) {
					obj[prop] = connector.fieldTypeTransform(
						row[prop],
						(fieldModels[prop]) ? fieldModels[prop].transform : null
					);
				}

				return obj;
			});
		}

		return transformedData;
	}
};
