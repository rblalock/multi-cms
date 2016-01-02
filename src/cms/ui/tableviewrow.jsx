var React = require('react');
var config = require('../../config');
var Link = require('react-router').Link;

/**
 * @class UI.TableviewRow
 */
class TableviewRow extends React.Component {
	constructor (props) {
		super(props);
	}

	render () {
		var rows = [];

		for (var prop in this.props.data) {
			rows.push(this.props.data[prop]);
		}

		return (
			<tr onClick={ this.props.rowSelect }>
				{
					rows.map((row, index)=> (
						<td key={ index }>
							<Link to={ `/object/${ this.props.config.path }/${ this.props.data.id }` }>
								{ row }
							</Link>
						</td>
					))
				}

				{ this.props.children }
			</tr>
		);
	}
}

module.exports = TableviewRow;