var React = require('react');
var ReactDOM = require('react-dom');
var Parse = require('parse');
var ParseReact = require('parse-react');

var App = require('./controllers/index');
var List = require('./controllers/list');
var Detail = require('./controllers/detail');
var Login = require('./controllers/login');

var Router = require('react-router').Router;
var Route = require('react-router').Route;
var Link = require('react-router').Link;

ReactDOM.render(
	(
		<Router>
			<Route path="/" component={App}>
				<Route path="login" component={Login} />
				<Route path="list/:object" component={List} />
				<Route path="object/:objectPathName/:objectId" component={Detail} />
				<Route path="object/:objectPathName/create" component={Detail} />
			</Route>
		</Router>
	),
	document.getElementById('app')
);
