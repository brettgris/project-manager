var React = require('react');
var ProjectActions = require('../../../models/ProjectActions');
var ProjectStore = require('../../../models/ProjectStore');

var ProjectAdd = React.createClass({
	displayName: 'ProjectAdd',

	getInitialState: function () {
		return {
			edit: false,
			name: ""
		};
	},
	showAdd: function () {
		this.setState({
			edit: !this.state.edit
		});
	},
	onChange: function (e) {
		this.setState({
			name: e.target.value
		});
	},
	addProject: function () {
		this.setState({
			edit: false
		});

		if (this.state.name.length > 1) {
			var data = {
				name: this.state.name,
				folder: this.props.folder.id,
				account: this.props.folder.doc.account
			};

			ProjectActions.addProject(data);
		}
	},
	render: function () {
		var editbtnvisible = this.state.edit ? "hide" : "";
		var formvisible = this.state.edit ? "" : "hide";

		return React.createElement(
			'h6',
			{ className: 'project-add' },
			React.createElement('a', { onClick: this.showAdd, className: "projectaddbtn glyphicon glyphicon-plus " + editbtnvisible }),
			React.createElement(
				'form',
				{ className: "project-input " + formvisible },
				React.createElement(
					'div',
					{ className: 'form-group' },
					React.createElement('input', { type: 'text', className: 'form-control', id: 'foldername', placeholder: 'Project Name', value: this.state.name, onChange: this.onChange }),
					React.createElement(
						'button',
						{ type: 'button', className: 'btn btn-default', onClick: this.addProject },
						React.createElement('span', { className: 'glyphicon glyphicon-plus' })
					)
				),
				React.createElement(
					'a',
					{ onClick: this.showAdd },
					'Cancel'
				)
			)
		);
	}
});

module.exports = ProjectAdd;