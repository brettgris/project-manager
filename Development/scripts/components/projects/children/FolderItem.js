var React = require('react');
var ProjectItem = require('./ProjectItem');
var ProjectAdd = require('./ProjectAdd');

var FolderItem = React.createClass({
	displayName: 'FolderItem',

	getInitialState: function () {
		return {
			visible: false
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
	render: function () {
		var visibleclass = this.state.visible ? "glyphicon-chevron-down" : "glyphicon-chevron-right";
		var projectvisible = this.state.visible ? "" : "hide";
		var foldervisible = this.state.visible ? "visible" : "";

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
				{ className: "folder-title " + foldervisible },
				this.props.data.doc.name,
				React.createElement('a', { className: 'glyphicon glyphicon-cog' }),
				React.createElement('a', { className: "visible glyphicon " + visibleclass, onClick: this.switchVisible })
			),
			React.createElement(
				'div',
				{ className: "project-items " + projectvisible },
				createProjects,
				React.createElement(ProjectAdd, { folder: this.props.data })
			)
		);
	}
});

module.exports = FolderItem;