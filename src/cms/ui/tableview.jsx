var React = require('react');
var config = require('../../config');
var TableviewRow = require('./tableviewrow');

/**
 * @class UI.Tableview
 */
class Tableview extends React.Component {
	constructor (props) {
		super(props);
	}

	render () {
		var columns = (this.props.rowData && this.props.rowData[0]) ? Object.keys(this.props.rowData[0]) : [];

		return (
			<div>
				<form className="form-horizontal">
					<div className="form-material form-material-primary input-group remove-margin-t remove-margin-b">
						<input className="form-control" type="text" name="base-material-text" placeholder="Search.." />
						<span className="input-group-addon"><i className="fa fa-search"></i></span>
					</div>
				</form>

				<table className="table table-hover">
					<thead>
						<tr>
							{
								columns.map(column => (
									<th key={ column } className="hidden-xs">
										<a href="#">{ column }</a>
									</th>
								))
							}
							<th>&nbsp;</th>
						</tr>
					</thead>
					<tbody>
					{
						this.props.rowData.map((row, index) => (
							<TableviewRow key={ index } data={ row }  />
						))
					}
					</tbody>
				</table>

				<ul className="pagination pull-right">
					<li className="paginate_button previous disabled">
						<a href="#">
							previous
						</a>
					</li>
					<li className="paginate_button next disabled">
						<a href="#">
							next
						</a>
					</li>
				</ul>
			</div>
		);
	}
}

module.exports = Tableview;
