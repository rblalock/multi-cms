/**
 * Put this config file wherever you like.  When it's time to deploy the CMS for production run
 * `grunt --cmsConfig {path to your config file}`.  This will copy it to src/config.js, and compile it in the CMS.
 */

var Config = {
	connector: {
		name: 'parse',
		appId: '',
		javascriptKey: ''
	},
	objects: [
		{
			name: 'Articles',
			dataObject: 'articles',
			path: 'articles',
			model: {
				title: {
					type: 'String',
					listColumn: true
				},
				text: {
					type: 'String',
					listColumn: true
				},
				author: {
					type: 'String',
					listColumn: true
				}
			}
		}
	],
	ignoreFields: ['createdAt', 'updatedAt', 'objectId']
};

module.exports = Config;
