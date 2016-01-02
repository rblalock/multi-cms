module.exports = {
	/**
	 * General field transform provided by connector
	 * @param {Array} data
	 * @param {Connector} connector
	 * @param {Object} fieldModels
	 * @returns {Array}
	 */
	fieldTransform: function (data, connector, fieldModels) {
		return data.map(row => {
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
};