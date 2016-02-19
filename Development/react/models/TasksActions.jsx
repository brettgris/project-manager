var Reflux = require('reflux');

var TasksActions = Reflux.createActions([
	'getTasks',
	'addTask',
	'updateTask',
	'deleteTask'
]);

module.exports = TasksActions;