var React = require('react');
var Theme = require('../theme');

/**
 * @class Controllers.App
 */
class App extends React.Component {
	render() {
		return(
			<div id="page-container" className="wrapper">
				<Theme.Header />
				<Theme.Sidebar />

				{ this.props.children }
			</div>
		);
	}
}

module.exports = App;
