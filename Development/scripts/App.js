var React = require('react');
var ReactDOM = require('react-dom');
global.jQuery = require('jquery');
var bootstrap = require('bootstrap');

var Accounts = require('./components/accounts/Accounts');
var AccountDetails = require('./components/details/AccountDetails');
var Projects = require('./components/projects/Projects');
var Tasks = require('./components/tasks/Tasks');
var Notes = require('./components/notes/Notes');

var App = React.createClass({
	displayName: 'App',

	getInitialState: function () {
		return {
			page: "home"
		};
	},
	changePage: function (page) {
		this.setState({
			page: page
		});
	},
	render: function () {
		var accountmobilevisible = this.state.page == "home" ? "" : " hidden-xs";

		return React.createElement(
			'div',
			{ className: 'wrapper' },
			React.createElement(
				'div',
				{ className: 'container-fluid fill' },
				React.createElement(
					'div',
					{ className: 'row fill' },
					React.createElement(
						'div',
						{ className: "col-sm-3 section col-xs-12" + accountmobilevisible },
						React.createElement(
							'div',
							{ className: 'row section' },
							React.createElement(Accounts, { changePage: this.changePage }),
							React.createElement(Projects, { changePage: this.changePage })
						)
					),
					React.createElement(Notes, { page: this.state.page, changePage: this.changePage }),
					React.createElement(Tasks, { page: this.state.page, changePage: this.changePage })
				)
			),
			React.createElement(AccountDetails, { page: this.state.page, changePage: this.changePage })
		);
	}
});

ReactDOM.render(React.createElement(App, null), document.getElementById('app'));