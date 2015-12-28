var React = require('react');
var Parse = require('parse');
var ParseReact = require('parse-react');

var App = require('./controllers/index');
var List = require('./controllers/list');

var Router = require('react-router').Router;
var Route = require('react-router').Route;
var Link = require('react-router').Link;

React.render(
	(
		<Router>
			<Route path="/" component={App}>
				<Route path="list" component={List} />
			</Route>
		</Router>
	),
	document.getElementById('app')
);