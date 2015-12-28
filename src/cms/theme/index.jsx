var config = require('../../config');
var Link = require('react-router').Link;

/**
 * @class Theme.Header
 */
class Header extends React.Component {
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
}

/**
 * @class Theme.Sidebar
 */
class Sidebar extends React.Component {
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
						<li key="testlist">
							<Link to="/list">
								<span>Test List</span>
							</Link>
						</li>

						{
							this.state.menuItems.map(item => (
								<li key={item.name}>
									<Link to={ `/object/${item.path}` }>
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
}

/**
 * @class Theme.Container
 */
class Container extends React.Component {
	render() {
		return (
			<div className="content-wrapper">
				<section className="content-header">
					<h1>{ this.props.title }</h1>
				</section>

				<div className="content">
					{ this.props.children }
				</div>
			</div>
		);
	}
}

module.exports = {
	Header: Header,
	Container: Container,
	Sidebar: Sidebar
};