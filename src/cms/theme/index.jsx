var React = require('react');
var config = require('../../config');
var Link = require('react-router').Link;

/**
 * @class Theme.Header
 */
exports.Header = class Header extends React.Component {
	render() {
		return (
			<header className="main-header">
				<a href="/" className="logo">
					Multi CMS
				</a>

				<nav className="navbar navbar-static-top" role="navigation">
				</nav>
			</header>
		);
	}
};

/**
 * @class Theme.Sidebar
 */
exports.Sidebar = class Sidebar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			menuItems: config.objects
		};
	}

	render() {
		return (
			<aside className="main-sidebar">
				<section className="sidebar">
					<ul className="sidebar-menu">
						<li className="header">Classes</li>
						{
							this.state.menuItems.map(item => (
								<li key={item.name}>
									<Link to={ `/list/${item.path}` }>
										<span>{item.name}</span>
									</Link>
								</li>
							))
						}
					</ul>
				</section>
			</aside>
		);
	}
};

/**
 * @class Theme.Container
 */
exports.Container = class Container extends React.Component {
	render() {
		return (
			<div className="content-wrapper">
				<div className="content">
					{ this.props.children }
				</div>
			</div>
		);
	}
};

/**
 * @class Theme.Heading
 */
exports.Heading = class Heading extends React.Component {
	render() {
		return (
			<div className="box-header">
				<h3 className="box-title">{ this.props.title }</h3>
				{ this.props.children }
			</div>
		);
	}
};

/**
 * @class Theme.Content
 */
exports.Content = class Content extends React.Component {
	render() {
		return (
			<div className="box">
				<div className="box-body">
					{ this.props.children }
				</div>
			</div>
		);
	}
};
