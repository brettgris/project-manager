var React = require('react');

var Reflux = require('reflux');
var Actions = require('../../models/Actions');
var AccountsStore = require('../../models/AccountsStore');

var AccountButton = require('./children/AccountButton');
var AccountItem = require('./children/AccountItem');

var Accounts = React.createClass({
	displayName: 'Accounts',

	mixins: [Reflux.listenTo(AccountsStore, 'onChange')],
	getInitialState: function () {
		return {
			accounts: [],
			current: {}
		};
	},
	onChange: function (e, data) {
		this.setState({
			accounts: data.accounts,
			current: data.current
		});
	},
	componentWillMount: function () {
		Actions.getAccounts();
	},
	switchAccount: function (id) {
		Actions.switchAccount(id);
	},
	handleNewAccount: function () {
		Actions.showAccountDetails('ADD');
	},
	render: function () {
		var accountItems = this.state.accounts.map(function (item, key) {
			return React.createElement(AccountItem, { data: item, current: this.state.current.id, key: item.id, handleClick: this.switchAccount });
		}, this);

		return React.createElement(
			'div',
			{ className: 'col-sm-2 section', id: 'accounts' },
			accountItems,
			React.createElement(AccountButton, { handleClick: this.handleNewAccount })
		);
	}
});

module.exports = Accounts;