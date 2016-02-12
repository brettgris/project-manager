var Reflux = require('reflux');

var AccountActions = Reflux.createActions([
	'getAccounts',
	'switchAccount',
	'updateAccount',
	'showAccountDetails',
	'deleteAccount'
]);

module.exports = AccountActions;