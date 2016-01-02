var React = require('react');
var config = require('../../config');

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
			<tr>
				{
					rows.map((row, index)=> (
						<td key={ index }>{ row }</td>
					))
				}
			</tr>
		);
	}
}

module.exports = TableviewRow;