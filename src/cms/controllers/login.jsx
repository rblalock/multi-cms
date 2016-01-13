var React = require('react');
var Theme = require('../theme');
var config = require('../../config');
var transformHelper = require('../helpers/transforms');

/**
 * @class Controller.Detail
 */
class Detail extends React.Component {
	constructor (props) {
		super(props);
		this.connector = config.connectors[config.authConnector];

		this.state = {
			username: null,
			password: null
		};
	}

	/**
	 * This is called when the route changes for the list
	 * @param {Object} props React properties
	 */
	componentWillReceiveProps (props) {}

	/**
	 * Handle login
	 * @param  {Object} event
	 */
	handleLogin (event) {
		this.connector.login(
			this.state.username,
			this.state.password,
			function (err, success) {
				// TODO redirect
				console.log(err, success);
			}
		);
	}

	/**
	 * Handle a field change
	 * @param  {Object} event
	 */
	handleFieldChange (event) {
		var obj = {};
		obj[event.target.name] = event.target.value

		var newState = Object.assign(this.state, obj);

		this.setState(newState);
	}

	render () {
		return (
			<Theme.Container>
				<Theme.Content>
					<Theme.Heading title="Login" />

					<form>
						<div className="form-group">
							<label>Username</label>
							<input onChange={ this.handleFieldChange.bind(this) } name="username" type="text" className="form-control" placeholder="Username" />
						</div>
						<div className="form-group">
							<label>Password</label>
							<input onChange={ this.handleFieldChange.bind(this) } name="password" type="password" className="form-control" placeholder="Password" />
						</div>

						<button onClick={ this.handleLogin.bind(this) } type="button" className="btn btn-primary btn-block btn-flat">Sign In</button>
					</form>

				</Theme.Content>
			</Theme.Container>
		);
	}
}

module.exports = Detail;
