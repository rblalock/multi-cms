var React = require('react');

/**
 * Used as an alias to the exports.* fields
 * @type {Object}
 */
var fieldAlias = {
	String: exports.Input
};

/**
 * @class UI.FormField
 */
exports.Field = class FormField extends React.Component {
	constructor (props) {
		super(props);
	}

	render () {
		var configField = this.props.config.model[this.props.label];
		var fieldType = (configField) ? configField.type : 'String';

		var field = React.createElement(
			exports[fieldType] || fieldAlias[fieldType] || exports.Input,
			{
				onChange: this.props.onChange,
				value: this.props.value,
				label: this.props.label
			}
		);

		return (
			<div className="form-group">
				<label htmlFor={ this.props.label }>{ this.props.label }</label>
				{ field }
			</div>
		)
	}
};

/**
 * @class UI.Input
 */
exports.Input = class Input extends React.Component {
	constructor (props) {
		super(props);
	}

	render () {
		return (
			<input
				onChange={ this.props.onChange }
				value={ this.props.value }
				className="form-control"
				type="text"
				name={ this.props.label }
				placeholder={ 'enter ' + this.props.label + ' here' } />
		)
	}
};

/**
 * @class UI.File
 */
exports.File = class File extends React.Component {
	constructor (props) {
		super(props);
	}

	render () {
		var link = (this.props.value) ? <a target="_blank" href={ this.props.value }>Existing File</a> : '';

		return (
			<div>
				{ link }
				<input
					onChange={ this.props.onChange }
					className="form-control"
					type="file"
					name={ this.props.label } />
			</div>
		)
	}
};

/**
 * @class UI.Boolean
 * // TODO need to finish this
 */
exports.Boolean = class Boolean extends React.Component {
	constructor (props) {
		super(props);
	}

	render () {
		return (
			<input type="checkbox" onChange={ this.props.onChange } />
		)
	}
};

/**
 * @class UI.Date
 * // TODO need to finish this
 */
exports.Date = class Date extends React.Component {
	constructor (props) {
		super(props);
	}

	render () {
		return (
			<input
				onChange={ this.props.onChange }
				className="js-datepicker form-control"
				type="text"
				name={ this.props.label }
				defaultValue={ this.props.value }
				data-provide="datepicker"
				data-date-format="MM dd, yyyy"
				placeholder="mm/dd/yy" />
		)
	}
};
