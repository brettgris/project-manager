var React = require('react');
var Reflux = require('Reflux');

var ProjectActions = require('../../models/ProjectActions');
var ProjectStore = require('../../models/ProjectStore');
var TasksActions = require('../../models/TasksActions');
var TasksStore = require('../../models/TasksStore');

var TaskList = require('./children/TaskList');

var Tasks = React.createClass({
	displayName: 'Tasks',

	mixins: [Reflux.listenTo(ProjectStore, 'changeProject'), Reflux.listenTo(TasksStore, 'changeTasks')],
	getInitialState: function () {
		return {
			project: undefined,
			tasks: []
		};
	},
	changeProject: function (e, data) {
		if (data.current != undefined) {
			TasksActions.getTasks(data.current['id']);
		}
		this.setState({
			project: data.current,
			tasks: []
		});
	},
	changeTasks: function (e, data) {
		this.setState({
			tasks: data.tasks
		});
	},
	addTask: function (data) {
		TasksActions.addTask(data);
	},
	updateTask: function (data) {
		TasksActions.updateTask(data);
	},
	removeTask: function (data) {
		TasksActions.deleteTask(data);
	},
	render: function () {
		var visible = this.state.project != undefined ? "" : " hide";
		return React.createElement(
			'div',
			{ className: 'col-sm-3 section', id: 'tasks' },
			React.createElement(
				'div',
				{ className: "tasks" + visible },
				React.createElement(TaskList, { active: true, tasks: this.state.tasks, project: this.state.project, name: 'Tasks', onAdd: this.addTask, onUpdate: this.updateTask, onRemove: this.removeTask })
			),
			React.createElement(
				'div',
				{ className: "tasks" + visible },
				React.createElement(TaskList, { active: false, tasks: this.state.tasks, project: this.state.project, name: 'Complete', onUpdate: this.updateTask, onRemove: this.removeTask })
			)
		);
	}
});

module.exports = Tasks;