var Reflux = require('reflux');

var FolderActions = Reflux.createActions([
	'getFolders',
	'addFolder',
	'updateFolder'
]);

module.exports = FolderActions;