var React = require('react');
var Reflux = require('reflux');

var AccountActions = require('../../models/AccountActions');
var AccountsStore = require('../../models/AccountsStore');
var FolderActions = require('../../models/FolderActions');
var FolderStore = require('../../models/FolderStore');
var ProjectActions = require('../../models/ProjectActions');
var ProjectStore = require('../../models/ProjectStore');

var FolderAdd = require('./children/FolderAdd');
var FolderItem = require('./children/FolderItem');

var Projects = React.createClass({
	displayName: 'Projects',

	mixins: [Reflux.listenTo(AccountsStore, 'changeAccount'), Reflux.listenTo(FolderStore, 'changeFolders'), Reflux.listenTo(ProjectStore, 'changeProjects')],
	getInitialState: function () {
		return {
			account: {},
			folders: [],
			projects: [],
			current: undefined
		};
	},
	changeAccount: function (e, data) {
		if (data.newdata) {
			this.setState({
				account: data.current
			});

			FolderActions.getFolders(this.state.account.id);
		}
	},
	changeFolders: function (e, data) {
		this.setState({
			folders: data.folders
		});

		ProjectActions.getProjects(this.state.account.id);
	},
	changeProjects: function (e, data) {
		this.setState({
			projects: data.projects,
			current: data.current
		});
	},
	editAccount: function () {
		AccountActions.showAccountDetails('UPDATE');
	},
	addFolder: function (data) {
		data.account = this.state.account.id;
		FolderActions.addFolder(data, this.state.account.id);
	},
	updateFolder: function (data) {
		FolderActions.updateFolder(data);
	},
	render: function () {
		var name = this.state.account['doc'] ? this.state.account.doc.name : "";

		var createFolders = this.state.folders.map(function (item, key) {
			return React.createElement(FolderItem, { data: item, key: item.id, id: key, folders: this.state.folders, projects: this.state.projects, current: this.state.current, onUpdate: this.updateFolder, changePage: this.props.changePage });
		}.bind(this));

		return React.createElement(
			'div',
			{ className: 'col-sm-10 section col-xs-10', id: 'projects' },
			React.createElement(
				'div',
				{ className: 'account-title' },
				React.createElement(
					'h3',
					null,
					' ',
					name,
					React.createElement('a', { onClick: this.editAccount, className: 'glyphicon glyphicon-cog' })
				)
			),
			React.createElement(
				'div',
				{ className: 'folders' },
				createFolders,
				React.createElement(FolderAdd, { addFolder: this.addFolder })
			)
		);
	}
});

module.exports = Projects;