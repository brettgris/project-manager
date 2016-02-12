var Reflux = require('reflux');

var FolderActions = Reflux.createActions([
	'getFolders',
	'addFolder'
]);

module.exports = FolderActions;