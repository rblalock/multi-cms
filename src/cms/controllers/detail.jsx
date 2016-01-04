var React = require('react');
var Theme = require('../theme');
var config = require('../../config');
var transformHelper = require('../helpers/transforms');
var FormField = require('../ui/formField').Field;

/**
 * @class Controller.Detail
 */
class Detail extends React.Component {
	constructor (props) {
		super(props);

		var c = this.getConfig();

		this.state = {
			data: transformHelper.fieldTransform(
				[],
				this.connector,
				c.model
			)[0],
			config: c
		};

		if (this.props.params.objectId !== 'create') {
			this.loadData();
		}
	}

	/**
	 * This is called when the route changes for the list
	 * @param {Object} props React properties
	 */
	componentWillReceiveProps (props) {}

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

	/**
	 * Load data
	 * @param {Function} callback
	 */
	loadData (callback) {
		this.connector.findOne(
			this.state.config.dataObject,
			this.props.params.objectId,
			(err, results) => {
				if (!err) {
					this.setState({
						data: transformHelper.fieldTransform(
							[results],
							this.connector,
							this.state.config.model
						)[0],
						config: this.state.config
					});

					if (callback) { callback(null, results); }
				} else {
					if (callback) { callback(err, null); }
					console.error(err);
				}
			}
		);
	}

	render () {
		return (
			<Theme.Container>
				<Theme.Content>
					<Theme.Heading title={ this.state.config.name } />

					<form>
						{
							Object.keys(
								transformHelper.filterIgnoredFields(this.state.data, this.connector)
							).map((key, index) => (
								<FormField
									key={ index }
									label={ key }
									value={ this.state.data[key] }
									config={ this.state.config } />
							))
						}
					</form>

					<div className="box-footer">
						<button type="submit" className="btn btn-primary">Submit</button>
					</div>
				</Theme.Content>
			</Theme.Container>
		);
	}
}

module.exports = Detail;
