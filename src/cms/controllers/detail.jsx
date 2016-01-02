var React = require('react');
var Theme = require('../theme');
var config = require('../../config');

/**
 * @class Controller.Detail
 */
class Detail extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			data: [],
			config: this.getConfig()
		};
	}

	/**
	 * This is called when the route changes for the list
	 * @param {Object} props React properties
	 */
	componentWillReceiveProps (props) {

	}

	/**
	 * Get the configuration for this list.  Also sets the connector for the list.
	 * @returns {Object}
	 */
	getConfig () {
		var c = config.objects.filter(row => {
			if (row.path === this.props.params.objectPathName) {
				return row;
			}
		})[0];

		this.connector = config.connectors[c.connector];

		return c;
	}

	render () {
		return (
			<Theme.Container>
				<Theme.Content>
					<Theme.Heading title={ this.state.config.name }>

					</Theme.Heading>
				</Theme.Content>
			</Theme.Container>
		);
	}
}

module.exports = Detail;
