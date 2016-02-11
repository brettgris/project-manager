var React = require('react');

var Reflux = require('reflux');
var Actions = require('../../models/Actions');
var AccountsStore = require('../../models/AccountsStore');

var Projects = React.createClass({
	displayName: 'Projects',

	mixins: [Reflux.listenTo(AccountsStore, 'changeAccount')],
	getInitialState: function () {
		return {
			account: {}
		};
	},
	changeAccount: function (e, data) {
		if (data.newdata) {
			this.setState({
				account: data.current
			});

			console.log("load folders");
			console.log("load projects");
		}
	},
	editAccount: function () {
		Actions.showAccountDetails('UPDATE');
	},
	render: function () {
		var name = this.state.account['doc'] ? this.state.account.doc.name : "";

		return React.createElement(
			'div',
			{ className: 'col-sm-10 section', id: 'projects' },
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
			)
		);
	}
});

module.exports = Projects;