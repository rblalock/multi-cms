var React = require('react');
var Theme = require('../theme');
var config = require('../../config');

/**
 * @class List
 */
class ListComponent extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			rowData: [],
			config: this.getConfig()
		};

		this.loadData();
	}

	getConfig (props) {
		return config.objects.filter(row => {
			var p = (props && props.params.object) ? props.params.object : this.props.params.object;
			if (row.path === p) {
				return row;
			}
		})[0];
	}

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

	transformData (results) {
		return results.map(row => {
			var obj = {
				id: row.objectId
			};

			Object.keys(this.state.config.model).forEach(key => {
				if (this.state.config.model[key].listColumn) {
					obj[key] = row[key];
				}
			});

			return obj;
		});
	}

	loadData (callback) {
		config.connectors[this.state.config.connector].query(
			this.state.config.dataObject,
			{},
			(err, results) => {
				if (!err) {
					var data = this.transformData(results);
					this.setState({
						rowData: data,
						config: this.state.config
					});
					// TODO set data here
					if (callback) { callback(null, data); }
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
							<span  className="fa fa-plus"></span>
						</button>
					</div>

					<div className="box-body">
						<table>
							<tbody>
							{
								this.state.rowData.map(row => (
									<tr key={row.id}>
										<td>{row.title}</td>
									</tr>
								))
							}
							</tbody>
						</table>
					</div>
				</div>
			</Theme.Container>
		);
	}
}

module.exports = ListComponent;
