var React = require('react');
var ProjectActions = require('../../../models/ProjectActions');
var ProjectStore = require('../../../models/ProjectStore');
var NotesActions = require('../../../models/NotesActions');
var NotesStore = require('../../../models/NotesStore');

var ProjectItem = React.createClass({
	displayName: 'ProjectItem',

	getInitialState: function () {
		return {
			name: this.props.data.doc.name,
			move: false,
			edit: false
		};
	},
	showEdit: function () {
		this.setState({
			edit: !this.state.edit
		});
	},
	showMoveFolder: function () {
		this.setState({
			move: !this.state.move
		});
	},
	moveFolder: function (item) {
		var data = {
			project: this.props.data.id,
			type: "status",
			copy: "<div>Moved to: " + item.doc.name + "</div>"
		};

		NotesActions.addNote(data);

		var data = this.props.data.doc;
		data.rev = this.props.data["_rev"];
		data.folder = item.id;

		ProjectActions.updateProject(data);
	},
	onNameChange: function (e) {
		this.setState({
			name: e.target.value
		});
	},
	changeName: function () {
		this.setState({
			edit: false
		});

		if (this.state.name.length > 0) {
			var data = this.props.data.doc;
			data.rev = this.props.data["_rev"];
			data.name = this.state.name;

			ProjectActions.updateProject(data);
		}
	},
	selectProject: function () {
		ProjectActions.changeCurrent(this.props.data);
	},
	render: function () {
		var titlevisible = this.state.edit ? " hide" : "";
		var movevisible = this.state.move ? "" : " hide";
		var editvisible = this.state.edit ? "" : " hide";

		var titleselected = this.props.current != undefined && this.props.data != undefined && this.props.current["id"] == this.props.data["id"] ? " selected" : "";

		var createMoveFolders = this.props.folders.map(function (item, key) {
			if (this.props.folder.id != item.id) {
				var self = this;
				var moveFolderClick = function () {
					self.moveFolder(item);
				};

				return React.createElement(
					'a',
					{ onClick: moveFolderClick, key: "move" + item.id + key },
					item.doc.name
				);
			}
		}.bind(this));

		return React.createElement(
			'div',
			{ className: 'project-item' },
			React.createElement(
				'h6',
				{ className: "project-title" + titleselected + titlevisible },
				React.createElement(
					'a',
					{ onClick: this.selectProject },
					this.props.data.doc.name
				),
				React.createElement('a', { className: 'glyphicon glyphicon-cog', onClick: this.showEdit }),
				React.createElement('a', { className: 'edit glyphicon glyphicon-option-horizontal', onClick: this.showMoveFolder })
			),
			React.createElement(
				'h6',
				{ className: "move-folder " + movevisible },
				'Move to: ',
				createMoveFolders,
				React.createElement(
					'a',
					{ onClick: this.showMoveFolder },
					'Cancel'
				)
			),
			React.createElement(
				'form',
				{ className: "edit-project " + editvisible },
				React.createElement(
					'div',
					{ className: 'form-group' },
					React.createElement('input', { type: 'text', className: 'form-control', id: 'foldername', placeholder: 'Project Name', value: this.state.name, onChange: this.onNameChange }),
					React.createElement(
						'button',
						{ type: 'button', className: 'btn btn-default', onClick: this.changeName },
						React.createElement('span', { className: 'glyphicon glyphicon-plus' })
					)
				),
				React.createElement(
					'a',
					{ onClick: this.showEdit },
					'Cancel'
				)
			)
		);
	}
});

module.exports = ProjectItem;