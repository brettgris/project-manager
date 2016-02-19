var React = require('react');
var ProjectItem = require('./ProjectItem');
var ProjectAdd = require('./ProjectAdd');

var FolderItem = React.createClass({
	displayName: 'FolderItem',

	getInitialState: function () {
		return {
			visible: false,
			edit: false,
			name: this.props.data.doc.name
		};
	},
	componentDidMount: function () {
		if (this.props.id == 0) {
			this.setState({
				visible: true
			});
		}
	},
	switchVisible: function () {
		var b = !this.state.visible;
		this.setState({
			visible: b
		});
	},
	showEdit: function () {
		this.setState({
			edit: !this.state.edit
		});
	},
	onNameChange: function (e) {
		this.setState({
			name: e.target.value
		});
	},
	changeName: function (e) {
		e.preventDefault();

		if (this.state.name.length > 0) {
			var data = this.props.data.doc;
			data.name = this.state.name;

			this.props.onUpdate(data);
		}

		this.setState({
			edit: false
		});
	},
	render: function () {
		var visibleclass = this.state.visible ? " glyphicon-chevron-down" : " glyphicon-chevron-right";
		var projectvisible = this.state.visible ? "" : " hide";
		var foldervisible = this.state.visible ? " visible" : "";
		var titlevisible = this.state.edit ? " hide" : "";
		var editvisible = this.state.edit ? "" : " hide";

		var createProjects = this.props.projects.map(function (item, key) {
			if (item.doc.folder == this.props.data.id) {
				return React.createElement(ProjectItem, { data: item, key: "folder" + key, folder: this.props.data, folders: this.props.folders, current: this.props.current });
			}
		}.bind(this));

		return React.createElement(
			'div',
			{ className: 'folder' },
			React.createElement(
				'h4',
				{ className: "folder-title" + foldervisible + titlevisible },
				this.props.data.doc.name,
				React.createElement('a', { className: 'glyphicon glyphicon-cog', onClick: this.showEdit }),
				React.createElement('a', { className: "visible glyphicon" + visibleclass, onClick: this.switchVisible })
			),
			React.createElement(
				'form',
				{ className: "edit" + editvisible, onSubmit: this.changeName },
				React.createElement(
					'div',
					{ className: 'form-group' },
					React.createElement('input', { type: 'text', className: 'form-control', id: 'foldername', value: this.state.name, onChange: this.onNameChange }),
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
			),
			React.createElement(
				'div',
				{ className: "project-items" + projectvisible },
				createProjects,
				React.createElement(ProjectAdd, { folder: this.props.data })
			)
		);
	}
});

module.exports = FolderItem;