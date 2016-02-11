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

	render: function () {
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
						{ className: 'col-sm-3 section' },
						React.createElement(
							'div',
							{ className: 'row section' },
							React.createElement(Accounts, null),
							React.createElement(Projects, null)
						)
					),
					React.createElement(Tasks, null),
					React.createElement(Notes, null)
				)
			),
			React.createElement(AccountDetails, null)
		);
	}
});

ReactDOM.render(React.createElement(App, null), document.getElementById('app'));