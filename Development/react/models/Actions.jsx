var Reflux = require('reflux');

var Actions = Reflux.createActions([
	'getAccounts',
	'switchAccount',
	'updateAccount',
	'showAccountDetails',
	'deleteAccount'
]);

module.exports = Actions;