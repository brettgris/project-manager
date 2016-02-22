var React = require('react');
var ReactQuill = require('react-quill');

var NoteAdder = React.createClass({
	displayName: 'NoteAdder',

	getInitialState: function () {
		return {
			value: "",
			type: "general"
		};
	},
	updateAdd: function (e) {
		this.setState({
			value: e
		});
	},
	selectChange: function (e) {
		this.setState({
			type: e.target.value
		});
	},
	onSubmit: function () {
		if (this.state.value.length > 0) {
			var data = {
				copy: this.state.value,
				type: this.state.type,
				project: this.props.project.id
			};
			this.props.addNote(data);

			this.setState({
				value: ""
			});
		}
	},
	render: function () {
		var visible = this.props.project != undefined ? "" : " hide";

		return React.createElement(
			'div',
			{ className: "add" + visible },
			React.createElement(ReactQuill, { value: this.state.value, theme: 'snow', onChange: this.updateAdd }),
			React.createElement(
				'form',
				{ className: 'add-form form-inline', onChange: this.selectChange },
				React.createElement(
					'select',
					{ className: 'form-control type' },
					React.createElement(
						'option',
						{ value: 'general' },
						'General'
					),
					React.createElement(
						'option',
						{ value: 'to' },
						'Received'
					),
					React.createElement(
						'option',
						{ value: 'from' },
						'Sent'
					),
					React.createElement(
						'option',
						{ value: 'status' },
						'Status'
					)
				),
				React.createElement(
					'button',
					{ type: 'button', className: 'btn btn-primary submitbtn', onClick: this.onSubmit },
					'Submit'
				)
			)
		);
	}
});

module.exports = NoteAdder;