var Reflux = require('reflux');

var ProjectActions = Reflux.createActions([
	'getProjects',
	'addProject',
	'updateProject',
	'changeCurrent'
]);

module.exports = ProjectActions;