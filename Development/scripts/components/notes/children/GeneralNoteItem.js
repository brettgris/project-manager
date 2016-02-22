var React = require('react');
var moment = require('moment');
var ReactQuill = require('react-quill');

var GeneralNoteItem = React.createClass({
	displayName: 'GeneralNoteItem',

	getInitialState: function () {
		return {
			value: this.props.data.doc.copy,
			type: this.props.data.doc.type,
			edit: false
		};
	},
	editNote: function () {
		this.setState({
			edit: true
		});
	},
	cancelEdit: function () {
		this.setState({
			edit: false
		});
	},
	deleteNote: function () {
		var data = {
			id: this.props.data.id,
			rev: this.props.data.doc._rev,
			project: this.props.data.doc.project
		};
		this.props.onDelete(data);
	},
	updateValue: function (e) {
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
			data = this.props.data.doc;
			data.copy = this.state.value;
			data.type = this.state.type;
			this.props.onUpdate(data);

			this.setState({
				edit: false
			});
		}
	},
	render: function () {
		var setView = function (self) {
			if (!self.state.edit) {
				return React.createElement(
					'div',
					{ className: 'note' },
					React.createElement('div', { className: self.props.data.doc.type, dangerouslySetInnerHTML: { __html: self.props.data.doc.copy } }),
					React.createElement(
						'div',
						{ className: 'details' },
						React.createElement(
							'div',
							{ className: 'icons' },
							React.createElement('span', { className: 'edit glyphicon glyphicon-pencil', onClick: self.editNote }),
							React.createElement('span', { className: 'remove glyphicon glyphicon-remove', onClick: self.deleteNote })
						)
					)
				);
			} else {
				return React.createElement(
					'div',
					{ className: 'note' },
					React.createElement(ReactQuill, { value: self.state.value, theme: 'snow', onChange: self.updateValue }),
					React.createElement(
						'form',
						{ className: 'add-form form-inline' },
						React.createElement(
							'select',
							{ className: 'form-control type', onChange: self.selectChange, value: self.state.type },
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
							{ type: 'button', className: 'btn btn-primary submitbtn', onClick: self.onSubmit },
							'Submit'
						),
						React.createElement(
							'button',
							{ type: 'button', className: 'btn btn-default cancelbtn', onClick: self.cancelEdit },
							'Cancel'
						)
					)
				);
			}
		};

		return React.createElement(
			'div',
			null,
			setView(this)
		);
	}
});

module.exports = GeneralNoteItem;