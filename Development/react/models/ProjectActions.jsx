var Reflux = require('reflux');

var ProjectActions = Reflux.createActions([
	'getProjects',
	'addProject',
	'updateProject'
]);

module.exports = ProjectActions;