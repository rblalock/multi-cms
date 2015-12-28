var Theme = require('../theme');

/**
 * @class App
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
