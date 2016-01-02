var React = require('react');
var Theme = require('../theme');
var config = require('../../config');
var Tableview = require('../ui/tableview');
var transformHelper = require('../helpers/transforms');

/**
 * @class Controller.List
 */
class ListComponent extends React.Component {
	constructor (props) {
		super(props);

		this.connector = {};

		this.state = {
			rowData: [],
			config: this.getConfig()
		};

		this.loadData();
	}

	/**
	 * Get the configuration for this list.  Also sets the connector for the list.
	 * @param {Object} props React params passed to this instance
	 * @returns {Object}
	 */
	getConfig (props) {
		var c = config.objects.filter(row => {
			var p = (props && props.params.object) ? props.params.object : this.props.params.object;
			if (row.path === p) {
				return row;
			}
		})[0];

		this.connector = config.connectors[c.connector];

		return c;
	}

	/**
	 * This is called when the route changes for the list
	 * @param {Object} props React properties
	 */
	componentWillReceiveProps (props) {
		this.state = {
			rowData: [],
			config: this.getConfig(props)
		};

		this.loadData();
	}

	createNewRecord () {
		//this.$route.router.go({ path: '/object/' + this.config.path + '/create' });
	}

	/**
	 * Transform data for this list (checks to ensure only visible columns from the config are set)
	 * @param {Array} results
	 * @returns {Array}
	 */
	transformData (results) {
		return results.map(row => {
			var obj = {
				id: row.objectId // TODO unique ID should be set in the connector or config
			};

			Object.keys(this.state.config.model).forEach(key => {
				if (this.state.config.model[key].listColumn) {
					obj[key] = row[key];
				}
			});

			return obj;
		});
	}

	/**
	 * Handles loading the remote data
	 * @param {Function} callback
	 */
	loadData (callback) {
		this.connector.query(
			this.state.config.dataObject,
			{},
			(err, results) => {
				if (!err) {
					var data = this.transformData(results);

					this.setState({
						rowData: transformHelper.fieldTransform(
							data,
							this.connector,
							this.state.config.model
						),
						config: this.state.config
					});

					if (callback) { callback(null, this.state.rowData); }
				} else {
					// TODO handle no data state / error
					if (callback) { callback(error, null); }
					console.error(error);
				}
			}
		);
	}

	render () {
		return (
			<Theme.Container>
				<div className="box">
					<div className="box-header">
						<h3 className="box-title">{ this.state.config.name }</h3>
						<button className="btn btn-primary pull-right">
							New Record &nbsp;&nbsp;
							<span className="fa fa-plus"></span>
						</button>
					</div>

					<div className="box-body">
						<Tableview rowData={ this.state.rowData } />
					</div>
				</div>
			</Theme.Container>
		);
	}
}

module.exports = ListComponent;
